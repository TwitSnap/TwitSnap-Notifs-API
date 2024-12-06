import {NextFunction, Request, Response} from "express";
import {HttpResponseSender} from "../HttpResponseSender";
import {BadRequestError} from "../errors/BadRequestError";
import {logger} from "../../utils/container";
import {VALIDATE_API_KEY_URL} from "../../utils/config";
import {InvalidApiKeyError} from "../errors/InvalidApiKeyError";

/**
 * Abstract base class for controllers that handle HTTP responses.
 *
 * This class provides methods for sending standard HTTP responses with different status codes.
 * It uses an instance of `HttpResponseSender` to format and send responses.
 */
export abstract class Controller {
    private _responseSender: HttpResponseSender;

    protected constructor(responseSender: HttpResponseSender){
        this._responseSender = responseSender;
    }

    /**
     * Sends the response with status code 204 and no response body.
     * @param res - The Response object to send.
     */
    protected okNoContentResponse = (res: Response): void => {
        this._responseSender.okNoContentResponse(res);
    }

    protected getFieldOrBadRequestError = (req: Request, field: string): any => {
        if(!req.body[field]) throw new BadRequestError(`${field} is required`);
        return req.body[field];
    }

    protected throwError = (error: any, entity: Function, next: NextFunction): void => {
        logger.logErrorFromEntity(error.constructor.name, error.message, entity);
        next(error);
    }

    protected checkApiKey = async (req: Request): Promise<void> => {
        const apiKey = this.getApiKeyHeaderOrBadRequestError(req);
        const isValid = await this.apiKeyIsValid(apiKey);
        logger.logInfoFromEntity(`api_key ${apiKey} is ${isValid ? 'valid' : 'invalid'}`, this.constructor);

        if(!isValid) throw new InvalidApiKeyError('Invalid api_key');
    }

    private getApiKeyHeaderOrBadRequestError = (req: Request): string => {
        if(!req.headers.api_key) throw new InvalidApiKeyError('api_key header is required');
        return req.headers.api_key as string;
    }

    private apiKeyIsValid = async (apiKey: string): Promise<boolean> => {
        const url = VALIDATE_API_KEY_URL + apiKey;

        try {
            const response = await fetch(url);
            logger.logInfoFromEntity(`api_key validation response: ${await response.json()}`, this.constructor);

            return await response.json();
        } catch (e: any) {
            logger.logErrorFromEntity(e.constructor.name, e.message, this.constructor);
            return false;
        }
    }
}
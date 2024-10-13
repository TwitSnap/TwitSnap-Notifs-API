import {Controller} from "./Controller";
import {EventNotificationService} from "../service/application/EventNotificationService";
import {HttpResponseSender} from "./HttpResponseSender";
import {NextFunction, Request, Response} from "express";
import {BadRequestError} from "./errors/BadRequestError";

export class EventNotificationController extends Controller {
    private eventNotificationService: EventNotificationService;

    constructor(eventNotificationService: EventNotificationService, httpResponseSender: HttpResponseSender){
        super(httpResponseSender);
        this.eventNotificationService = eventNotificationService;
    }

    public notifyEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const eventType = this.getFieldOrBadRequestError(req, 'eventType') as string;
            const params = this.getFieldOrBadRequestError(req, 'params');

            const notification = this.getFieldOrBadRequestError(req, 'notification');
            //TODO Obtener el notificationType.
            //TODO Obtener el sender. Si no vino, usar uno por default.
            //TODO Obtener el array de destinations.

            //TODO Invocar eventNotificationService.createAndNotifyEventNotification()
        } catch (e) {
            next(e);
        }
    }

    private getFieldFromObjectLiteralOrBadRequestError = <T>(obj: {[key: string]: T}, field: string): T => {
        if(!obj[field]) throw new BadRequestError(`${field} is required`);
        return obj[field];
    }
}
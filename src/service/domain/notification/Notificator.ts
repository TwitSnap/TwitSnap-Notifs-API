import { EmailNotificator } from "./EmailNotificator";
import { UnknownTypeError } from "../../application/errors/UnknownTypeError";
import { logger } from "../../../utils/container";
import {EMAIL_PASSWORD, EMAIL_SERVICE, EMAIL_USER} from "../../../utils/config";

export abstract class Notificator {
    public abstract notify(sender: string, destinations: string[], subject: string, payload: string): void;

    protected throwError = (logMessage: string, error: Error, entity: Function): never => {
        logger.logErrorFromEntity(logMessage, entity);
        throw error;
    }

    static fromString = (string: string): Notificator => {
        switch (string) {
            case "email":
                return new EmailNotificator(EMAIL_SERVICE, EMAIL_USER, EMAIL_PASSWORD);
            default:
                throw new UnknownTypeError("Unknown notificator type.");
        }
    }
}

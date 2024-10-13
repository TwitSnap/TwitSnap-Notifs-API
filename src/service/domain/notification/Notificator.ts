import { EmailNotificator } from "./EmailNotificator";
import { UnknownTypeError } from "../../application/errors/UnknownTypeError";
import { logger } from "../../../utils/container";

export abstract class Notificator {
    public abstract notify(sender: string, destinations: string[], subject: string, payload: string): void;

    protected throwError = (logMessage: string, error: Error, entity: Function): never => {
        logger.logErrorFromEntity(logMessage, entity);
        throw error;
    }

    /*static fromString = (string: string): Notificator => {
        switch (string) {
            case "email":
                return new EmailNotificator();
            default:
                throw new UnknownTypeError("Unknown notification strategy type.");
        }
    }*/
}

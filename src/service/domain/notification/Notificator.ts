import { EmailNotificator } from "./EmailNotificator";
import { UnknownTypeError } from "../errors/UnknownTypeError";
import { logger } from "../../../utils/container";

export abstract class Notificator {
    public abstract sendNotification<T, Y>(sender: T, destinations: T[], subject: Y, payload: Y): void;

    protected abstract argsAreOk<T, Y>(sender: T, destinations: T[], subject: Y, payload: Y): boolean;

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

import { logger } from "../../../utils/container";

export abstract class Notificator {
    public abstract notify(sender: string, destinations: string[], subject: string, payload: string): void;

    protected throwError = (logMessage: string, error: Error, entity: Function): never => {
        logger.logErrorFromEntity(logMessage, entity);
        throw error;
    }
}

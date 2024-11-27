import { logger } from "../../../utils/container";

export abstract class Notificator {
    public abstract notify(sender: string | null, destinations: string[], subject: string, payload: string): Promise<void>;

    protected throwError = (logMessage: string, error: Error, entity: Function): never => {
        logger.logErrorFromEntity(error.constructor.name, logMessage, entity);
        throw error;
    }
}

import {EventNotification} from "../domain/event/EventNotification";
import {Notificator} from "../domain/notification/Notificator";
import {RegistrationEventNotification} from "../domain/event/RegistrationEventNotification";
import {InvalidArgumentsError} from "../domain/errors/InvalidArgumentsError";
import {UnknownTypeError} from "./errors/UnknownTypeError";
import {logger} from "../../utils/container";
import {ResetPasswordNotification} from "../domain/event/ResetPasswordNotification";
import {PushNotification} from "../domain/event/PushNotification";

export class EventNotificationService {
    public createAndNotifyEventNotification = async (eventNotificationType: string, destinations: string[], sender: string | null, notificator: Notificator, eventParams: { [key: string]: string }): Promise<void> => {
        logger.logInfoFromEntity(`Trying to create and notify event notification of type ${eventNotificationType}`, this.constructor);
        const eventNotification = this.createEventNotification(eventNotificationType, destinations, sender, notificator, eventParams);
        await this.notifyEvent(eventNotification);
    }

    private createEventNotification = (eventNotificationType: string, destinations: string[], sender: string | null, notificator: Notificator, eventParams: {[key: string]: string }): EventNotification => {
        switch (eventNotificationType) {
            case 'registration':
                if (!sender) this.throwError('Sender is required for registration event notification.', new InvalidArgumentsError('Sender is required for registration event notification.'));
                return this.createRegistrationEventNotification(destinations, sender as string, notificator, eventParams);
            case 'reset-password':
                if (!sender) this.throwError('Sender is required for reset password event notification.', new InvalidArgumentsError('Sender is required for reset password event notification.'));
                return this.createResetPasswordNotification(destinations, sender as string, notificator, eventParams);
            case 'push':
                return this.createPushNotification(destinations, notificator, eventParams);
            default:
                return this.throwError(`Unknown event type: ${eventNotificationType}`, new UnknownTypeError(`Unknown event type: ${eventNotificationType}`));
        }
    }

    private createRegistrationEventNotification = (destinations: string[], sender: string, notificator: Notificator, eventParams: {[key: string]: string }): RegistrationEventNotification => {
        const username: string = this.getParamOrError(eventParams, 'username');
        const pin: string = this.getParamOrError(eventParams, 'pin');

        return new RegistrationEventNotification(notificator, destinations, sender, pin, username);
    }

    private createResetPasswordNotification = (destinations: string[], sender: string, notificator: Notificator, eventParams: {[key: string]: string }): ResetPasswordNotification => {
        const token: string = this.getParamOrError(eventParams, 'token');
        return new ResetPasswordNotification(notificator, destinations, sender, token);
    }

    private createPushNotification = (destinations: string[], notificator: Notificator, eventParams: {[key: string]: string }): PushNotification => {
        const title: string = this.getParamOrError(eventParams, 'title');
        const body: string = this.getParamOrError(eventParams, 'body');

        return new PushNotification(notificator, destinations, body, title);
    }

    private getParamOrError = (eventParams: {[key: string]: string}, paramName: string): any => {
        const param = eventParams[paramName];
        if (!param) this.throwError(`Missing required argument: ${paramName} is required.`, new InvalidArgumentsError(`Missing required argument: ${paramName} is required.`));

        return param;
    }

    private notifyEvent = async (eventNotification: EventNotification): Promise<void> => {
        await eventNotification.notify();
    }

    private throwError = (logMessage: string, error: Error): never => {
        logger.logErrorFromEntity(error.constructor.name, logMessage, this.constructor);
        throw error;
    }
}
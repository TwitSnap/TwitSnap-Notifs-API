import {EventNotification} from "../domain/event/EventNotification";
import {Notificator} from "../domain/notification/Notificator";
import {RegistrationEventNotification} from "../domain/event/RegistrationEventNotification";
import {InvalidArgumentsError} from "../domain/errors/InvalidArgumentsError";
import {UnknownTypeError} from "./errors/UnknownTypeError";

export class EventNotificationService {
    public createEventNotification = (eventNotificationType: string, destinations: string[], sender: string, notificator: Notificator, eventParams: { [key: string]: string }): EventNotification => {
        switch (eventNotificationType) {
            case 'registration':
                return this.createRegistrationEventNotification(destinations, sender, notificator, eventParams);
            default:
                throw new UnknownTypeError('Event type not supported.');
        }
    }

    private createRegistrationEventNotification = (destinations: string[], sender: string, notificator: Notificator, eventParams: {[key: string]: string }): RegistrationEventNotification => {
        const username = this.getParamOrError(eventParams, 'username');
        const pin = this.getParamOrError(eventParams, 'pin');

        return new RegistrationEventNotification(notificator, destinations, sender, pin, username);
    }

    private getParamOrError = (eventParams: {[key: string]: string}, paramName: string): string => {
        const param = eventParams[paramName];
        if (!param) throw new InvalidArgumentsError(`Missing required argument: ${paramName} is required.`);

        return param;
    }

    public notifyEvent = (eventNotification: EventNotification): void => {
        eventNotification.notify();
    }
}
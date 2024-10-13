import {EventNotification} from "../domain/event/EventNotification";

export class EventNotificationService {
    public createEventNotification = <T>(eventType: string, eventParams: {[key: string]: string }, ): EventNotification<T> => {
        throw new Error('Method not implemented.');
    }

    public notifyEvent = <T>(eventNotification: EventNotification<T>): void => {
        eventNotification.notify();
    }
}
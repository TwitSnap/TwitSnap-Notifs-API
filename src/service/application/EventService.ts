import {EventNotification} from "../domain/event/EventNotification";

export class EventNotificationService {
    public createEventNotification = <T>(): EventNotification<T> => {
        throw new Error('Method not implemented.');
    }
}
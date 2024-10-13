import {NotificationStrategy} from "./NotificationStrategy";

export class EmailNotificationStrategy implements NotificationStrategy {
    sendNotification<T, Y>(destinations: T, payload: Y): void {
        //TODO
        console.log(`Sending email to ${destinations} with payload: ${payload}`);
    }
}
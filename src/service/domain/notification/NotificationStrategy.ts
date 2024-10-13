import {EmailNotificationStrategy} from "./EmailNotificationStrategy";
import {UnknownTypeError} from "../errors/UnknownTypeError";

export abstract class NotificationStrategy {
    abstract sendNotification<T, Y>(destinations: T, payload: Y): void;

    static fromString(string: string): NotificationStrategy{
        switch (string) {
            case "email":
                return new EmailNotificationStrategy();
            default:
                throw new UnknownTypeError("Unknown notification strategy type."); //TODO create custom error
        }
    }
}
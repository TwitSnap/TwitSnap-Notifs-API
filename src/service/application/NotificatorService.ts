import {Notificator} from "../domain/notification/Notificator";
import {EmailNotificator} from "../domain/notification/EmailNotificator";
import {EMAIL_PASSWORD, EMAIL_SERVICE, EMAIL_USER} from "../../utils/config";
import {UnknownTypeError} from "./errors/UnknownTypeError";
import {PushNotificator} from "../domain/notification/PushNotificator";
import {Helpers} from "../../utils/helpers";

export class NotificatorService {
    public static getNotificatorFromString = (type: string): Notificator => {
        switch (type) {
            case "email":
                return new EmailNotificator(EMAIL_SERVICE, EMAIL_USER, EMAIL_PASSWORD);
            case "push":
                return new PushNotificator(Helpers.getFirebaseMessaging())
            default:
                throw new UnknownTypeError("Unknown notificator type.");
        }
    }
}
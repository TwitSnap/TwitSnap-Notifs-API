import {EventNotification} from "./EventNotification";
import {Notificator} from "../notification/Notificator";

export class PushNotification extends EventNotification {
    private readonly message: string;
    private readonly subject: string;

    constructor(notificator: Notificator, destinations: string[], message: string, subject: string) {
        super(notificator, destinations, null);
        this.message = message;
        this.subject = subject;
    }

    protected getPayload = (): string => {
        return this.message;
    }

    protected getSubject = (): string => {
        return this.subject;
    }
}
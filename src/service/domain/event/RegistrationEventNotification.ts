import { EventNotification } from "./EventNotification";
import {Notificator} from "../notification/Notificator";

export class RegistrationEventNotification extends EventNotification<string> {
    private registrationPin: string;
    private username: string;

    constructor(notificationStrategies: Notificator[], destinations: string[], sender: string, registrationPin: string, username: string) {
        super(notificationStrategies, destinations, sender);
        this.registrationPin = registrationPin;
        this.username = username;
    }

    protected asString(): string {
        //TODO
        return "";
    }

    protected getSubject(): string{
        return "TwitSnap - Confirm your registration!";
    }
}
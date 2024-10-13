import { Event } from "./Event";
import {NotificationStrategy} from "../notification/NotificationStrategy";

export class RegistrationEvent extends Event<string> {
    private registrationPin: string;
    private username: string;

    constructor(notificationStrategies: NotificationStrategy[], destinations: string[], registrationPin: string, username: string) {
        super(notificationStrategies, destinations);
        this.registrationPin = registrationPin;
        this.username = username;
    }

    protected asString(): string {
        //TODO
        return "";
    }
}
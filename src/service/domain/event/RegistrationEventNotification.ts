import { EventNotification } from "./EventNotification";
import { Notificator } from "../notification/Notificator";

export class RegistrationEventNotification extends EventNotification<string> {
    private readonly registrationPin: string;
    private readonly username: string;

    constructor(notificator: Notificator, destinations: string[], sender: string, registrationPin: string, username: string) {
        super(notificator, destinations, sender);
        this.registrationPin = registrationPin;
        this.username = username;
    }

    protected getPayload = (): string => {
        return `
            Hi ${this.username},
    
            Thank you for registering at TwitSnap! 
            To confirm your registration, please use the following PIN:
    
            ${this.registrationPin}
    
            If you did not register at TwitSnap, please ignore this email.
    
            Cheers,
            The TwitSnap Team
        `;
    }

    protected getSubject = (): string => {
        return "TwitSnap - Confirm your registration!";
    }
}

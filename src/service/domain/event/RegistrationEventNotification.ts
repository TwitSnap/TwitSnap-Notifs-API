import { EventNotification } from "./EventNotification";
import { Notificator } from "../notification/Notificator";

export class RegistrationEventNotification extends EventNotification {
    private readonly registrationPin: string;
    private readonly username: string;

    constructor(notificator: Notificator, destinations: string[], sender: string, registrationPin: string, username: string) {
        super(notificator, destinations, sender);
        this.registrationPin = registrationPin;
        this.username = username;
    }

    protected getPayload = (): string => {
        return `
            <div style="padding: 20px;">
                <p>Hi Guido,<br></p>
                
                </p>Thank you for registering at TwitSnap!<br>
                To confirm your registration, please use the following PIN:<br><br>
                <strong>1234</strong><br><br></p>
                
                </p>If you did not register at TwitSnap, please ignore this email.<br><br>
                Cheers,<br>
                The TwitSnap Team</p>
            </div>
        `;
    }

    protected getSubject = (): string => {
        return "TwitSnap - Confirm your registration! 🎉";
    }
}

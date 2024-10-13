import {Notificator} from "../notification/Notificator";
import {EventNotification} from "./EventNotification";

export class ResetPasswordNotification extends EventNotification {
    private readonly token: string;

    constructor(notificator: Notificator, destinations: string[], sender: string, token: string) {
        super(notificator, destinations, sender);
        this.token = token;
    }

    protected getSubject = (): string => {
        return "TwitSnap - Reset your password! 🔒";
    }

    // ? Todos los payloads a enviarse por mail deben ser en HTML y tener un logo de TwitSnap al final.
    protected getPayload = (): string => {
        //TODO El link debe levantarse de un .env
        return `
            <div style="padding: 20px; font-family: Arial, sans-serif; color: #333;">
                <p>Hi there!<br><br></p>
                <p>We received a request to reset your password at TwitSnap.<br> 
                To reset your password, please click the following link:<br><br>
                <a href="http://localhost:3000/reset-password/${this.token}" style="color: #007BFF;">Reset Password</a><br><br></p>
                <p>If you did not request a password reset, please ignore this email.<br><br> 
                Cheers,<br>
                The TwitSnap Team 😊</p>
                <div style="text-align:left; margin-top:10px;">
                    <img src="cid:TwitSnap-Logo" style="width:auto; height:auto; max-width:100px; max-height:100px; border-radius:15px;" alt="TwitSnap Logo"/>
                </div>
            </div>
        `;
    }
}
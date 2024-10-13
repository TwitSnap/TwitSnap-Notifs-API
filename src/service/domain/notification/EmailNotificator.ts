import {Notificator} from "./Notificator";
import nodemailer from 'nodemailer';
import {logger} from "../../../utils/container";
import {InvalidArgumentsError} from "../errors/InvalidArgumentsError";
import {NotificationError} from "../errors/NotificationError";

export class EmailNotificator extends Notificator {
    private transporter: nodemailer.Transporter;

    constructor(service: string, user: string, password: string) {
        super();
        this.transporter = nodemailer.createTransport({ service: service, auth: { user: user, pass: password }});

        this.transporter.verify((error, _) => {
            if (error) {
                logger.logErrorFromEntity(`Error while verifying email transporter: ${error}`, this.constructor);
            }
        });
    }

    sendNotification<T, Y>(sender: T, destinations: T[], subject: Y, payload: Y): void {
        if (this.argsAreOk(sender, destinations, subject, payload)) {
            logger.logInfoFromEntity(`Sending email notification:
                From: ${sender}
                To: ${destinations}
                Subject: ${subject}
                Payload: ${payload}`
            , this.constructor);

            const mailOptions = {
                from: sender as string,
                to: destinations as string[],
                subject: subject as string,
                text: payload as string,
            };

            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) this.throwError(`Error while sending email notification: ${error}`, new NotificationError("Error while sending email notification."), this.constructor);

                const successInfo = `Email notification sent: 
                    SMTP Response: ${info.response}
                    Message ID: ${info.messageId}
                    Envelope (from -> to): ${info.envelope.from} -> ${info.envelope.to}`;

                logger.logInfoFromEntity(successInfo, this.constructor);
            });
        } else {
            this.throwError("Invalid data types. Expected all parameters to be strings.", new InvalidArgumentsError("Invalid data types. Expected all parameters to be strings."), this.constructor);
        }
    }
    
    argsAreOk<T, Y>(sender: T, destinations: T[], subject: Y, payload: Y): boolean {
        return typeof sender === 'string' && typeof subject === 'string' && typeof payload === 'string' && destinations.every(dest => typeof dest === 'string');
    }
}
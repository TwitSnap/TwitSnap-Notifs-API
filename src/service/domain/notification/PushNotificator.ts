import {Notificator} from "./Notificator";
import * as admin from "firebase-admin";
import {logger} from "../../../utils/container";
import {MulticastMessage, BatchResponse } from "firebase-admin/lib/messaging";
import {NotificationError} from "../errors/NotificationError";

export class PushNotificator extends Notificator {
    private messaging: admin.messaging.Messaging;

    constructor(messaging: admin.messaging.Messaging) {
        super();
        this.messaging = messaging;
    }

    // ? Sender must be null, destinations must be the device tokens, subject must be notification title and payload must be the messages body.
    public async notify(sender: string | null, destinations: string[], subject: string, payload: string): Promise<void> {
        const message: MulticastMessage = {
            notification: {title: subject, body: payload},
            tokens: destinations,
        };

        return await this.messaging.sendEachForMulticast(message)
            .then((response: BatchResponse) => {
                logger.logInfoFromEntity(`${response.successCount} messages were sent successfully.`, this.constructor);

                if (response.failureCount > 0) {
                    const failedTokens: string[] = [];
                    response.responses.forEach((resp, idx) => { if (!resp.success) failedTokens.push(destinations[idx]) });

                    logger.logErrorFromEntity(this.constructor.name, `Error when sending push notifications to the following tokens: ${failedTokens.join(', ')}`, this.constructor);
                }
            })
            .catch((e: any) => {
                this.throwError(`Error while sending push notification: ${e}`, new NotificationError("Error while sending push notification."), this.constructor);
            });
    }
}
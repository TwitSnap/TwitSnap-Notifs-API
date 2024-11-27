import { Notificator } from '../notification/Notificator';

export abstract class EventNotification {
    private notificator: Notificator;
    private readonly destinations: string[];
    private readonly sender: string | null;

    protected constructor(notificator: Notificator, destinations: string[], sender: string | null) {
        this.notificator = notificator;
        this.destinations = destinations;
        this.sender = sender;
    }

    public notify = async (): Promise<void> => {
        await this.notificator.notify(this.sender, this.destinations, this.getSubject(), this.getPayload());
    }

    protected abstract getPayload: () => string;

    protected abstract getSubject: () => string;
}

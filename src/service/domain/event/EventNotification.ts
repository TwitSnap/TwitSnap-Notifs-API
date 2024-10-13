import { Notificator } from '../notification/Notificator';

export abstract class EventNotification<T> {
    private notificator: Notificator;
    private readonly destinations: T[];
    private readonly sender: T;

    protected constructor(notificator: Notificator, destinations: T[], sender: T) {
        this.notificator = notificator;
        this.destinations = destinations;
        this.sender = sender;
    }

    protected abstract getPayload: () => string;

    public notify = (): void => {
        this.notificator.notify(this.sender, this.destinations, this.getSubject(), this.getPayload());
    }

    protected abstract getSubject: () => string;
}

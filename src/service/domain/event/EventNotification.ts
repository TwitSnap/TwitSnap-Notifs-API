import { Notificator } from '../notification/Notificator';

export abstract class EventNotification<T> {
    private notificationStrategies: Notificator[];
    private readonly destinations: T[];
    private readonly sender: T;

    protected constructor(notificationStrategies: Notificator[], destinations: T[], sender: T) {
        this.notificationStrategies = notificationStrategies;
        this.destinations = destinations;
        this.sender = sender;
    }

    protected abstract getPayload: () => string;

    public notify = (): void => {
        this.notificationStrategies.forEach(strategy => {
            strategy.sendNotification(this.sender, this.destinations, this.getSubject(), this.getPayload());
        });
    }

    protected abstract getSubject: () => string;
}

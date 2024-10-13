import { Notificator } from '../notification/Notificator';

export abstract class EventNotification<T> {
    private timestamp: Date;
    private notificationStrategies: Notificator[];
    private readonly destinations: T[];
    private readonly sender: T;

    protected constructor(notificationStrategies: Notificator[], destinations: T[], sender: T) {
        this.timestamp = new Date();
        this.notificationStrategies = notificationStrategies;
        this.destinations = destinations;
        this.sender = sender;
    }

    protected abstract asString(): string;

    public notify(): void {
        this.notificationStrategies.forEach(strategy => {
            strategy.sendNotification(this.sender, this.destinations, this.asString());
        });
    }

    protected abstract getSubject(): string;
}
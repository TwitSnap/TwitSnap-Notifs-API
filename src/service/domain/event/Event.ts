import { NotificationStrategy } from '../notification/NotificationStrategy';

export abstract class Event<T> {
    private timestamp: Date;
    private notificationStrategies: NotificationStrategy[];
    private readonly destinations: T[];

    protected constructor(notificationStrategies: NotificationStrategy[], destinations: T[]) {
        this.timestamp = new Date();
        this.notificationStrategies = notificationStrategies;
        this.destinations = destinations;
    }

    protected abstract asString(): string;

    public notify(): void {
        this.notificationStrategies.forEach(strategy => {
            strategy.sendNotification(this.destinations, this.asString());
        });
    }
}
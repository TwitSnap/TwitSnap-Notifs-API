export class InvalidApiKeyError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, InvalidApiKeyError.prototype);
    }
}
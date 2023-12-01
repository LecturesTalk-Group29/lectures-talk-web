export class Publisher<T> {
    value: T;
    constructor(value: T) {
        this.value = value
    }
    _subscribers: ((value: T) => void)[] = []

    subscribe(callback: (value: T) => void) {
        this._subscribers.push(callback)
        callback(this.value)
    }

    set(value: T) {
        this.value = value
        for(const callback of this._subscribers) {
            callback(this.value)
        }
    }
}

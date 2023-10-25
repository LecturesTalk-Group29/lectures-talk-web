export class PubSub {
    value: any;
    constructor(value: any) {
        this.value = value
    }
    _subscribers: ((value: any) => void)[] = []

    subscribe(callback: (value: any) => void) {
        this._subscribers.push(callback)
        callback(this.value)
    }

    set(value: any) {
        this.value = value
        for(const callback of this._subscribers) {
            callback(this.value)
        }
    }
}
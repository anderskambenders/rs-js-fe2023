import { CallbackFn } from './types/types';

type EventsType = Record<string, Array<CallbackFn>>;

export class EventEmitter {
  private events: EventsType;

  constructor() {
    this.events = {};
  }

  subscribe(eventName: string, fn: CallbackFn) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(fn);
  }

  emit(eventName: string, data?: unknown) {
    const event = this.events[eventName];
    if (event) {
      event.forEach((fn: CallbackFn) => {
        fn.call(null, data);
      });
    }
  }
}

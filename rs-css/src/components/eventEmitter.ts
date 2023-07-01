type EventsType = Record<string, Array<() => void>>;

export class EventEmitter {
  private events: EventsType;
  constructor() {
    this.events = {};
  }
  subscribe(eventName: string, fn: () => void) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(fn);
  }

  emit(eventName: string, data: number) {
    const event = this.events[eventName];
    if (event) {
      event.forEach((fn: (data: number) => void) => {
        fn.call(null, data);
      });
    }
  }
}

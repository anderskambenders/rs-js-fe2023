export class Animation {
  stoppedAnimations: Map<number, number>;

  requestId: Map<number, number>;

  constructor() {
    this.stoppedAnimations = new Map();
    this.requestId = new Map();
  }

  animate(id: number, value: { distance: number; velocity: number }) {
    const car = document.getElementById(`car-${id}`) as HTMLElement;
    const finish = document.getElementById(`finish-${id}`) as HTMLElement;
    const startPoint = car.getBoundingClientRect().x + car.getBoundingClientRect().width / 2;
    const endPoint = finish.getBoundingClientRect().x + finish.getBoundingClientRect().width / 2 - 50;
    const distance = endPoint - startPoint;
    const animationTime = value.distance / value.velocity;
    let startTime: number;
    let previousTime: number;
    let isFinished = false;
    const getAnimationStep = (time: number) => {
      startTime = startTime || time;
      if (previousTime !== time) {
        const count = (distance / animationTime) * (time - startTime);
        (car as HTMLElement).style.transform = `translateX(${count}px)`;
        if (count === distance) {
          isFinished = true;
        }
      }
      if (time - startTime < animationTime) {
        previousTime = time;
        if (!isFinished) {
          if (!Number.isFinite(animationTime)) {
            window.cancelAnimationFrame(this.requestId.get(id) as number);
            this.requestId.set(id, 0);
            return;
          }
          this.requestId.set(id, window.requestAnimationFrame(getAnimationStep));
        }
      }
    };
    this.requestId.set(id, window.requestAnimationFrame(getAnimationStep));
  }
}

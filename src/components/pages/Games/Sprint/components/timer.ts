import { Sprint } from '../../../../../config/enums';
import { findSelector, createTag } from '../../../../helper/helper';
import Stat from './stat';
import renderSvg from './svg';

class Timer {
  duration: number;

  out: HTMLElement;

  fullRound: number;

  timer: HTMLElement;

  time: HTMLElement;

  id: number;

  constructor() {
    this.id = 0;
    this.duration = 60000;
    this.fullRound = 314;
    this.timer = findSelector(Sprint.timer);
    this.timer.innerHTML = renderSvg();
    this.time = createTag('div', Sprint.time, '60');
    this.timer.append(this.time);
    this.out = findSelector('out');
  }

  draw(progress: number): void {
    this.out.style.strokeDasharray = `${this.fullRound * (1 - progress)}, ${
      this.fullRound * progress
    }`;
    this.time.innerText = `${Math.floor((1 - progress) * 60)}`;
    if (progress > 0.75) {
      this.out.classList.add('red');
    }
  }

  start(): void {
    this.animate(this.duration);
  }

   stop():void {
    cancelAnimationFrame(this.id);
    this.out.style.strokeDasharray = `0, ${this.fullRound}`;
    this.time.innerText = `0`;
    new Stat().show();
  }

  animate = (duration: number): void => {
    const start = performance.now();
    this.id = requestAnimationFrame(
      (this.animate = (time: number): void => {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1 || this.time.innerText <= '0') timeFraction = 1;
        if (timeFraction < 1) {
          this.draw(timeFraction);
          this.id =  requestAnimationFrame(this.animate);
        } else {
          this.stop();
        }
      })
    );
  };
}

export default Timer;

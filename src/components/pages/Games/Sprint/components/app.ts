import { Card } from '../../../../../config/enums';
import { findSelector } from '../../../../helper/helper';
import Controller from './controller';
import Model from './model';
import Timer from './timer';
import View from './view';

class App {
  private view: View;

  private controller: Controller;

  private btnTrue!: HTMLElement;

  private btnFalse!: HTMLElement;

  private timer!: Timer;

  constructor() {
    this.view = new View();
    this.controller = new Controller();
    
  }

  start(): void {
    this.view.startLoader();
    Model.init()
      .then(() => this.view.init())
      .then(() => this.controller.init())
      .then(() => this.initBtns())
      .then(() => this.event())
      .then(() => this.view.stopLoader())
      .then(() => {this.timer = new Timer()})
      .then(() => this.timer.start())
      .catch(() => new Error());
  }

  initBtns(): void {
    this.btnTrue = findSelector(Card.true);
    this.btnFalse = findSelector(Card.false);
  }

  event(): void {
    this.btnTrue.addEventListener('click', async () => {
      await this.next(true);
    });
    this.btnFalse.addEventListener('click', async () => {
      await this.next(false);
    });
    document.addEventListener('keyup', async (e) => {
      if (e.code === 'ArrowLeft') {
        await this.next(false);
      } else if (e.code === 'ArrowRight') {
        await this.next(true);
      }
    });
  }

  async next(opinion: boolean): Promise<void> {
    const answer = this.controller.checkAnswer(opinion);
    const isCreated = this.view.initCard();
    if (isCreated) {
      await this.controller.playSound(answer);
    } else {
      this.timer.stop();
    }
  }
}

export default App;
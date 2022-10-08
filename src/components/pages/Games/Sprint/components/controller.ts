/* eslint-disable no-restricted-globals */
import { Card, Sprint, State } from '../../../../../config/enums';
import { findSelector } from '../../../../helper/helper';
import Model from './model';

class Controller {
  root!: HTMLElement;

  exit!: HTMLElement;

  sound!: HTMLElement;

  soundOn!: boolean;

  audio!: HTMLElement;

  voice!: HTMLAudioElement;

  init():void {
    this.root = findSelector(Card.root);
    this.exit = findSelector(Sprint.exit);
    this.sound = findSelector(Sprint.sound);
    this.initListeners();
  }

  initListeners():void {
    this.sound.addEventListener('click', () => this.toogleSound());
    this.exit.addEventListener('click', () => location.reload());
  }

  toogleSound():void {
      this.sound.classList.toggle(State.active);
      if (this.sound.classList.contains(State.active)) {
        this.soundOn = true;
      } else {
        this.soundOn = false;
      }
  }
  
  async playSound(answer: boolean) {
    if (this.soundOn) {
      if (answer) {
        await new Audio('./src/assets/right.mp3').play();
      } else {
        await new Audio('./src/assets/wrong.mp3').play();
      }
    }
  }

  checkAnswer(opinion: boolean): boolean {
    const answer = Model.getAnswer();
    const item = findSelector(Card.item);
    if(item)item.remove();
    if (answer === opinion) {
      Model.setTrue();
      this.root.classList.add(State.right);
      setTimeout(() => this.root.classList.remove(State.right), 500);
    } else {
      Model.setFalse();
      this.root.classList.add(State.wrong);
      setTimeout(() => this.root.classList.remove(State.wrong), 500);
    }
    return answer === opinion;
  }
}

export default Controller;

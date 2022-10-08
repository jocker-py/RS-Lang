import { Sprint, Card, API, State, Phrases } from '../../../../../config/enums';
import { Word } from '../../../../../config/interfaces';
import { createTag, findSelector, initAudioListener } from '../../../../helper/helper';
import Model from './model';

class View {
  root: HTMLElement;

  header: HTMLElement;

  card: HTMLElement;

  word: HTMLElement;

  section: HTMLElement;

  points: HTMLElement;

  loader: HTMLElement;

  constructor() {
    this.root = findSelector('main');
    this.section = createTag('section', Sprint.root, '');
    this.points = createTag('div', Sprint.points, '');
    this.card = createTag('ul', Card.root, '');
    this.header = createTag('li', Card.header, '');
    this.word = createTag('div', Card.list, '');
    this.loader = createTag('div', 'loader', '');
  }

  init():void {
    this.initCard();
    this.initSection();
    this.initButtons();
  }

  createWord(word: Word, translate: string): void {
    const state = Model.getHeaderState();
    const item = createTag('ul', Card.item, '');
    const audio = createTag('li', Card.audio, '');
    const image = createTag('li', Card.image, '');
    const eng = createTag('li', Card.eng, word.word);
    const ru = createTag('li', Card.ru, translate);
    const voice = new Audio(`${API.baseLink}/${word.audio}`);
    image.classList.add(state);
    initAudioListener(audio, voice, Card.voice);
    item.append(image, audio, eng, ru);
    this.word = item;
  }

  initHeader():void {
    this.points.innerText = `${Model.getPoints()}`;
    this.header.remove();
    this.header = createTag('li', Card.header, '');
    const headerState = Model.getHeaderState();
    const state = Model.getState();
    const activeRounds = Model.getRounds();
    const rounds = createTag('ul', Card.rounds, '');
    for (let i = 1; i < 4; i += 1) {
      const round = createTag('li', Card.round, '');
      if (i <= activeRounds) {
        round.classList.add(State.active);
      }
      rounds.append(round);
    }
    const title = createTag('div', Card.title, Phrases[state]);
    this.header.classList.add(`${headerState}`);
    this.header.append(rounds, title);
  }

  initCard(): boolean {
    const newWord = Model.getWord();
    const translate = Model.getTraslate();
    if (newWord && translate) {
      this.initHeader();
      this.createWord(newWord, translate);
      this.card.prepend(this.header, this.word);
      return true;
    }
    return false;
  }

  initSection(): void {
    const header = createTag('ul', Sprint.header, '');
    const sound = createTag('li', Sprint.sound, '');
    const exit = createTag('li', Sprint.exit, '');
    const timer = createTag('li', Sprint.timer, '');
    header.append(sound, timer, exit);
    this.section.append(header, this.points, this.card);
    this.root.append(this.section);
  }

  initButtons(): void {
    const btns = createTag('li', Card.buttons, '');
    const btnFalse = createTag('button', Card.button, 'Не правильно');
    const btnTrue = createTag('button', Card.button, 'Правильно');
    btnFalse.classList.add(Card.false);
    btnTrue.classList.add(Card.true);
    btns.append(btnFalse, btnTrue);
    this.card.append(btns);
  }

  startLoader(){
    this.root.append(this.loader);
  }

  stopLoader(){
    this.root.removeChild(this.loader);
  }
}

export default View;

/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-globals */
import { Card, State, API, Level } from '../../../../../config/enums';
import {
  CustomWord,
  Difficulty,
  UserId,
  Word,
} from '../../../../../config/interfaces';
import {
  createUserWord,
  getUserWords,
  updateUserWord,
} from '../../../../api/api';
import {
  findSelector,
  createTag,
  initAudioListener,
} from '../../../../helper/helper';
import Model from './model';

class Stat {
  card: HTMLElement;

  stat: boolean[];

  words: Word[];

  positive: HTMLElement;

  negative: HTMLElement;

  wrapper: HTMLElement;

  promises: [];

  countRight: HTMLElement;

  countFail: HTMLElement;

  userId: UserId;

  usersWords: CustomWord[];

  constructor() {
    this.stat = Model.getStat();
    this.words = Model.getWords();
    this.card = findSelector(Card.root);
    this.positive = createTag('table', Card.positive, '');
    this.negative = createTag('table', Card.negative, '');
    this.wrapper = createTag('wrapper', Card.wrapper, '');
    this.countRight = createTag('span', Card.right, '0');
    this.countFail = createTag('span', Card.fail, '0');
    this.promises = [];
    this.userId = localStorage.getItem(API.userId) || '';
    this.usersWords = [];
  }

  async show(): Promise<void> {
    if (this.userId) {
      this.usersWords = await getUserWords(this.userId);
    }
    this.createCountRows();
    this.updateCard();
    this.addAllItems();
    this.addExit();
    this.resetPageAndGroup();
  }

  resetPageAndGroup(){
    localStorage.removeItem('current_group');
    localStorage.removeItem('current_page');
  }

  addExit() {
    const exit = createTag('button', Card.row, 'Выход');
    this.card.append(exit);
    exit.addEventListener('click', () => location.reload());
  }

  updateCard(): void {
    this.wrapper.innerHTML = '';
    this.card.classList.add(Card.stat);
    this.wrapper.append(this.negative, this.positive);
    this.card.append(this.wrapper);
  }

  createCountRows() {
    this.card.innerHTML = '';
    const fail = createTag('button', Card.row, 'Ошибок ');
    const right = createTag('button', Card.row, 'Знаю ');
    fail.classList.add(State.active);
    fail.append(this.countFail);
    right.append(this.countRight);
    this.card.append(fail, right);
    fail.addEventListener('click', () => {
      this.wrapper.style.left = '0';
      right.classList.remove(State.active);
      fail.classList.add(State.active);
    });
    right.addEventListener('click', () => {
      this.wrapper.style.left = '-100%';
      fail.classList.remove(State.active);
      right.classList.add(State.active);
    });
  }

  addAllItems(): void {
    this.words.forEach((elem, idx) => this.addItem(elem, idx, this.userId));
  }

  async addItem(elem: Word, idx: number, userId: UserId) {
    let options 
    const item = createTag('tr', Card.item, '');
    const audio = createTag('th', Card.audio, '');
    const eng = createTag('th', Card.eng, elem.word);
    const ru = createTag('th', Card.ru, elem.wordTranslate);
    const round = createTag('th', Card.round, '');
    const voice = new Audio(`${API.baseLink}/${elem.audio}`);
    initAudioListener(audio, voice, Card.voice);
    audio.append(voice);
    item.append(audio, eng, ru, round);
    if(userId) options = await this.getOptions(userId, elem);
    if (this.stat[idx] === true) {
      if (options) options.optional.attemp += 1;
      if (options?.optional.attemp === 3) options.optional.learned = true;
      this.countRight.innerText = `${
        parseInt(this.countRight.innerText, 10) + 1
      }`;
      round.classList.add(State.active);
      this.positive.append(item);
    } else if (this.stat[idx] === false) {
      if(userId) options = this.resetOptions(elem);
      this.countFail.innerText = `${
        parseInt(this.countFail.innerText, 10) + 1
      }`;
      this.negative.append(item);
    }
    if (userId && options) await updateUserWord(userId, elem.id, options);
  }

  async getOptions(
    userId: UserId,
    word: Word
  ): Promise<CustomWord | undefined> {
    if (this.usersWords.some((item) => item.wordId === word.id)) {
      return this.usersWords.find((item) => item.wordId === word.id);
    }
    const settings = this.resetOptions(word);
    await createUserWord(userId, word.id, settings);
    return settings;
  }

  resetOptions(word: Word): CustomWord {
    return <CustomWord>{
      difficulty: <Difficulty>Level[+word.group],
      optional: { attemp: 0, learned: false },
    };
  }
}

export default Stat;

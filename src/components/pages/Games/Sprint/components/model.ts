import { Word } from '../../../../../config/interfaces';
import { getWords } from '../../../../api/api';

interface ModelState {
  words: Word[];
  idx: number;
  multiply: number;
  rounds: number;
  translates: Word[];
  points: number;
  stat: boolean[];
  page: string;
  group: string;

  init: () => Promise<void>;
  getWord: () => Word | null;
  getTraslate: () => Word['wordTranslate'] | null;
  getAnswer: () => boolean;
  getRounds: () => number;
  getWords: () => Word[];
  getHeaderState: () => string;
  getPoints: () => number;
  getStat: () => boolean[];
  mix: (item: Word) => Word;
  setTrue: () => void;
  setFalse: () => void;
  setGroup: (group: number, page?: number) => void;
  getState: () => number;
}

const Model: ModelState = {
  words: [],
  idx: 0,
  multiply: 1,
  rounds: 0,
  translates: [],
  points: 0,
  stat: [],
  page: '0',
  group: '0',

  async init() {
    if (parseInt(this.group, 10) || this.group === '0') {
      this.words = await getWords(this.group, this.page);
      if(+this.page >= 1) {
        const newWords = await getWords(this.group, `${+this.page - 1}`)
        this.words = [...this.words, ...newWords];
      }
    } else {
      const words = localStorage.getItem('words');  
      if (words) {
        this.words = <Word[]>JSON.parse(words) || [];
      }
    }
    this.words.sort(() => Math.random() - 0.5);
    this.translates = this.words.map((item) => this.mix(item));
  },

  mix(item: Word) {
    const right = Math.floor(Math.random() * 3);
    if (right === 1) {
      return { ...item };
    }
    const idx = Math.floor(Math.random() * this.words.length);
    return { ...this.words[idx] };
  },

  getWord() {
    return this.idx < this.words.length ? this.words[this.idx] : null;
  },

  getWords() {
    return this.words;
  },

  getTraslate() {
    return this.idx < this.translates.length
      ? this.translates[this.idx].wordTranslate
      : null;
  },

  getAnswer() {
    if (this.idx < this.words.length) {
      return this.words[this.idx].word === this.translates[this.idx].word;
    }
    return false;
  },

  getRounds() {
    return this.rounds % 4;
  },

  getHeaderState() {
    const state = this.getState();
    return `state__${state}`;
  },

  getState() {
    this.multiply = Math.floor(this.rounds / 4);
    if (this.multiply > 3) {
      this.multiply = 3;
    }
    return this.multiply;
  },

  getPoints() {
    return (this.multiply + 1) * this.points * 100;
  },

  getStat(): boolean[] {
    return this.stat;
  },

  setTrue() {
    this.points += 1;
    this.rounds += 1;
    this.stat.push(true);
    this.idx += 1;
  },

  setFalse() {
    this.stat.push(false);
    this.points -= 1;
    this.rounds = 0;
    this.idx += 1;
  },

  setGroup(group: number, page = Math.floor(Math.random() * 29)) {
    this.group = String(group);
    this.page = String(page);
  },
};

export default Model;

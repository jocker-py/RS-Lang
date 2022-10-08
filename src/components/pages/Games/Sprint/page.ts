/* eslint-disable no-restricted-globals */
import { SprintPage, Level } from '../../../../config/enums';
import { createTag, findSelector } from '../../../helper/helper';
import App from './components/app';
import Model from './components/model';

const obj = [
  { tag: 'li', cls: 'page__title', value: 'Спринт' },
  {
    tag: 'li',
    cls: 'page__row',
    value: 'Спринт - это тренеровка на скорость.',
  },
  {
    tag: 'li',
    cls: 'page__row',
    value: 'Попробуй угадать максимальное количество слов.',
  },
  {
    tag: 'li',
    cls: 'page__row',
    value: 'Используй стрелки на клавиатуре или мышь.',
  },
  { tag: 'li', cls: 'page__row', value: 'У тебя будет 60 секунд.' },
];

class Page {
  root: HTMLElement;

  section: HTMLElement;

  description: HTMLElement;

  levels: HTMLElement;
  
  constructor() {
    this.root = findSelector('main');
    this.section = createTag('section', SprintPage.root, '');
    this.description = createTag('ul', SprintPage.description, '');
    this.levels = createTag('ul', SprintPage.levels, '');
  }
  
  onClearPage() {
    this.section.innerHTML = ''
    this.description.innerHTML = ''
    this.levels.innerHTML = ''
  }

  draw(parent: HTMLElement): void {
    this.onClearPage()
    for (let i = 0; i < obj.length; i += 1) {
      const { tag, cls, value } = obj[i];
      const item = createTag(tag, cls, value);
      this.description.append(item);
    }

    for (let i = 0; i < 6; i += 1) {
      const level = createTag('li', SprintPage.level, Level[i]);
      level.classList.add(`${SprintPage.currentLevel}${i}`);
      this.levels.append(level);
    }
    this.section.append(this.description, this.levels);
    parent.append(this.section);
  }

  initListeners(): void {
    for (let i = 0; i < this.levels.childElementCount; i += 1) {
      this.levels.children[i].addEventListener('click', (e) => {
        const targetLevel = (<HTMLElement>e.target).classList[1].split('--')[1];
        const targetPage = localStorage.getItem('current_page') || Math.floor(Math.random()*29)
        this.section.remove();
        Model.setGroup(Number(targetLevel), Number(targetPage));
        new App().start();
      });
    }
  }

  initDictStart():void{
    const rand = Math.floor(Math.random()*5);
    const level = createTag('li', SprintPage.level, 'Начать');
    level.classList.add(`${SprintPage.currentLevel}${rand}`);
    const group = localStorage.getItem('current_group') || rand;
    const page = localStorage.getItem('current_page') || Math.floor(Math.random() * 29);
    Model.setGroup(Number(group), Number(page));
    this.levels.innerHTML = '';
    this.levels.append(level);
    level.addEventListener('click', () => new App().start())
  }
}

export default Page;
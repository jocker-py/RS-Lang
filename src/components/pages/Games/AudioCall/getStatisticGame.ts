import { createTag } from '../../../helper/helper';
import { audioPlay, falseAnswerArray, rightAnswerArray } from './constants';

class AudiocallStatistic {
  wrapper_audiocall: HTMLElement;

  parent: HTMLElement;

  constructor(parent: HTMLElement) {
    this.parent = parent;
    this.wrapper_audiocall = createTag('div', 'wrapper_audiocall', '');
  }

  initStatistic() {
    this.wrapper_audiocall.innerHTML = '';
    this.parent.append(this.wrapper_audiocall);
    this.gameStatistic();
  }

  gameStatistic() {
    const header = createTag('div', 'wrapper__stat_table', '');
    this.wrapper_audiocall.append(header);

    const table = createTag('div', 'stat_table', '');
    header.append(table);

    const wordHeaderFalse = createTag(
      'div',
      'word_header',
      `Ошибок: ${falseAnswerArray.length}`
    );
    table.prepend(wordHeaderFalse);
    for (let i = 0; i < falseAnswerArray.length; i += 1) {
      const wordWrapper = createTag('div', 'word_wrapper', '');
      table.append(wordWrapper);
      const wordSound = createTag('span', 'word_sound', ` `);
      wordSound.addEventListener('click', () => {
        audioPlay(falseAnswerArray[i].audio);
      });
      const wordEng = createTag(
        'span',
        'word_eng',
        ` ${falseAnswerArray[i].word}  `
      );
      const wordTranslate = createTag(
        'span',
        'word_translate',
        ` - ${falseAnswerArray[i].wordTranslate}\n`
      );
      wordWrapper.append(wordSound, wordEng, wordTranslate);
    }
    const wordHeaderTrue = createTag(
      'div',
      'word_header',
      `Знаю: ${rightAnswerArray.length}`
    );
    table.append(wordHeaderTrue);

    for (let i = 0; i < rightAnswerArray.length; i += 1) {
      const wordWrapper = createTag('div', 'word_wrapper', '');
      table.append(wordWrapper);
      const wordSound = createTag('span', 'word_sound', ` `);
      wordSound.addEventListener('click', () => {
        audioPlay(rightAnswerArray[i].audio);
      });
      const wordEng = createTag(
        'span',
        'word_eng',
        ` ${rightAnswerArray[i].word}  `
      );
      const wordTranslate = createTag(
        'span',
        'word_translate',
        ` - ${rightAnswerArray[i].wordTranslate}\n`
      );
      wordWrapper.append(wordSound, wordEng, wordTranslate);
    }
    const goHome = createTag('button', 'go_home', 'Вернуться на главную');
    this.wrapper_audiocall.append(goHome);

    goHome.addEventListener('click', () => {
      location.reload();
    });
    document.onkeydown = () => {
      location.reload();
    };
  }
}

export default AudiocallStatistic;

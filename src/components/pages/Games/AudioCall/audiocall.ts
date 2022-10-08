import { API } from '../../../../config/enums';
import { Word } from '../../../../config/interfaces';
import { getWords } from '../../../api/api';
import { createTag } from '../../../helper/helper';

import {
  addInfoAfterAnswer,
  falseAnswerArray,
  getRandom,
  getRandomPage,
  rightAnswerArray,
  toActOnFiveButtons,
} from './constants';
import AudiocallStatistic from './getStatisticGame';

class Audiocall {
  wrapper_audiocall: HTMLElement;

  gameStatistic: AudiocallStatistic;

  parent: HTMLElement;

  constructor(parent: HTMLElement) {
    this.parent = parent;
    this.gameStatistic = new AudiocallStatistic(parent);
    this.wrapper_audiocall = createTag('div', 'wrapper_audiocall', '');
    // document.body.append(this.wrapper_audiocall);
  }

  async initMain() {
    this.wrapper_audiocall.innerHTML = '';
    this.parent.append(this.wrapper_audiocall);
    await this.renderWrapper();
  }

  async renderWrapper() {
    const sound = createTag('button', 'sound', '');
    const audiocallExit = createTag('button', 'audiocall_exit', '');
    const additionalButtons = createTag('div', 'additional_btns', '');
    const header = createTag('div', 'wrapper_box', '');
    const voiceBox = createTag('button', 'voiceBox', '');
    this.wrapper_audiocall.prepend(additionalButtons);
    additionalButtons.appendChild(sound);
    additionalButtons.appendChild(audiocallExit);
    this.wrapper_audiocall.append(header);
    header.appendChild(voiceBox);
    const wordBtns = createTag('div', 'word_btns', '');
    this.wrapper_audiocall.append(wordBtns);
    let randomWordsArray: Word[] = [];
    let groupWords = localStorage.getItem('current_group');
    if (!groupWords) groupWords = '0';
    const data = getWords(String(groupWords), String(getRandomPage(0, 30)));
    const oneSessionWordsArray: Word[] = [];

    (await data).forEach((item: Word) => {
      randomWordsArray.push(item);
    });
    randomWordsArray = randomWordsArray.sort(getRandom);
    for (let i = 0; i < toActOnFiveButtons; i += 1) {
      oneSessionWordsArray.push(randomWordsArray[i]);
    }

    const btnAnswer = [...oneSessionWordsArray].sort(getRandom);
    for (let i = 0; i < toActOnFiveButtons; i += 1) {
      const wordBtn = createTag(
        'button',
        `word_btn`,
        `${i + 1}. ${btnAnswer[i].wordTranslate.toUpperCase()}`
      );
      wordBtns.append(wordBtn);
    }

    const buttonUnknown = createTag('button', 'unknown_btn', 'Не знаю');
    const buttonNext = createTag('button', 'next_btn', 'Дальше  →');
    this.wrapper_audiocall.append(buttonUnknown);
    this.wrapper_audiocall.append(buttonNext);
    buttonUnknown.style.display = 'block';
    buttonNext.style.display = 'none';
    const textContentValueButtons: (string | null)[] = [];
    wordBtns.childNodes.forEach((value) =>
      textContentValueButtons.push(value.textContent)
    );
    const textContentValueOnButtonsArray = textContentValueButtons.map((e) =>
      e?.slice(3).toLowerCase()
    );

    function addImageResult(): void {
      addInfoAfterAnswer(header, oneSessionWordsArray);
      voiceBox.style.transform = 'scale(0.7)';
    }

    buttonUnknown.addEventListener('click', () => {
      showRigthOrFalseAnswer(6);
    });

    const clearPage = (): void => {
      this.wrapper_audiocall.innerHTML = '';
    };

    buttonNext.addEventListener('click', () => {
      clearPage();
      if (falseAnswerArray.length + rightAnswerArray.length !== 10) {
        this.renderWrapper();
      } else {
        this.wrapper_audiocall.innerHTML = '';
        this.gameStatistic.initStatistic();
      }
    });
    this.tooMuch();

    async function showRigthOrFalseAnswer(indexElem: number): Promise<void> {
      const element = textContentValueOnButtonsArray[indexElem];
      addImageResult();
      buttonUnknown.style.display = 'none';
      buttonNext.style.display = 'block';

      if (element === oneSessionWordsArray[0].wordTranslate) {
        rightAnswerArray.push(oneSessionWordsArray[0]);
        wordBtns.children.item(indexElem)?.classList.add('rightAnswer');
        if (sound.hasAttribute('active')) {
          //
        } else {
        await new Audio('./src/assets/right.mp3').play();
        }
      } else {
        wordBtns.children.item(indexElem)?.classList.add('falseAnswer');
        falseAnswerArray.push(oneSessionWordsArray[0]);
        if (sound.hasAttribute('active')) {
          //
        } else {
        await new Audio('./src/assets/wrong.mp3').play();
        }
        for (let i = 0; i < toActOnFiveButtons; i += 1) {
          if (
            oneSessionWordsArray[0].wordTranslate !==
            textContentValueOnButtonsArray[i]
          ) {
            //
          } else {
            wordBtns.children.item(i)?.classList.add('rightAnswer');
          }
        }
      }
      for (let j = 0; j < toActOnFiveButtons; j += 1) {
        wordBtns.children.item(j)?.setAttribute('disabled', '');
      }
    }

    const createVoiceTag = createTag('audio', '', '');
    this.wrapper_audiocall.appendChild(createVoiceTag);
    let counterOfSelectionButtonPress = 0;

    function keystrokeCondition(num: number) {
      while (counterOfSelectionButtonPress < 1) {
        counterOfSelectionButtonPress += 1;
        showRigthOrFalseAnswer(num);
      }
    }

    function removeVoiceAttr() {
      createVoiceTag.removeAttribute('src', );
      createVoiceTag.removeAttribute('autoplay');
    }

    function addVoiceAttr() {
      createVoiceTag.setAttribute(
        'src',
        `${API.baseLink}/${oneSessionWordsArray[0].audio}`
      );
      createVoiceTag.setAttribute('autoplay', 'autoplay');
      window.setTimeout(removeVoiceAttr, 1000);
    }
    addVoiceAttr();

    voiceBox.addEventListener('click', () => {
      addVoiceAttr();
    });

    const keystroke = () => {
      document.addEventListener('keydown', (e) => {
        switch (e.code) {
          case 'Digit1':
            keystrokeCondition(0);
            break;
          case 'Digit2':
            keystrokeCondition(1);
            break;
          case 'Digit3':
            keystrokeCondition(2);
            break;
          case 'Digit4':
            keystrokeCondition(3);
            break;
          case 'Digit5':
            keystrokeCondition(4);
            break;
          case 'Space':
            if (!createVoiceTag.hasAttribute('src')) {
              createVoiceTag.setAttribute(
                'src',
                `${API.baseLink}/${oneSessionWordsArray[0].audio}`
              );
              createVoiceTag.setAttribute('autoplay', 'autoplay');
            }
            break;
          case 'Enter':
          case 'NumpadEnter':
            if (counterOfSelectionButtonPress < 2) {
              if (counterOfSelectionButtonPress < 1) {
                counterOfSelectionButtonPress += 1;
                showRigthOrFalseAnswer(5);
              } else {
                counterOfSelectionButtonPress += 1;
                clearPage();
                this.renderWrapper();
              }
            }
            break;
          default:
        }
      });
    };
    keystroke();

    function isTrue() {
      for (let i = 0; i < toActOnFiveButtons; i += 1) {
        wordBtns.children.item(i)?.addEventListener('click', () => {
          counterOfSelectionButtonPress += 1;
          void showRigthOrFalseAnswer(i);
        });
      }
    }
    isTrue();
    audiocallExit.addEventListener('click', () => {
      location.reload();
    })

    if (localStorage.getItem('soundOff')) {
      sound.toggleAttribute('active')
    }
    sound.addEventListener('click', () => {
      sound.toggleAttribute('active');
      if (sound.hasAttribute('active')) {
        localStorage.setItem('soundOff', 'active')
      } else {
        localStorage.removeItem('soundOff')
      }
    })
  }

  tooMuch(): void {
    const col = rightAnswerArray.length + falseAnswerArray.length;
    if (col > 9) {
      this.wrapper_audiocall.innerHTML = '';
      this.gameStatistic.initStatistic();
    }
  }
}

export default Audiocall;

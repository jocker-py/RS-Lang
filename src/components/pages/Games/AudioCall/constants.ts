import { API } from '../../../../config/enums';
import { Word } from "../../../../config/interfaces";
import { createTag } from '../../../helper/helper';

export function getRandom() {
  return Math.random() - 0.5;
}

export const rightAnswerArray: Word[] = [];
export const falseAnswerArray: Word[] = [];

export const audioPlay = async (mp3: string) => {
  const voice = new Audio();
  voice.src = `${API.baseLink}/${mp3}`;
  await voice.play();
}

export const getRandomPage = (start: number, end: number) => Math.floor(Math.random() * (0 - (end - start)) + (end - start));

export const toActOnFiveButtons = 5;

export const addInfoAfterAnswer = (htmlEl: HTMLElement, array: Word[]) => {
  const wordImage = createTag('img', 'image', '');
  wordImage.setAttribute(
    'src',
    `${API.baseLink}/${array[0].image}`
  );
  const wordInEnglish = createTag(
    'p',
    'wordInEnglish',
    `${array[0].word}`
  );
  htmlEl.prepend(wordImage, wordInEnglish);
};

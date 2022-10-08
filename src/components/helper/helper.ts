import { Word } from '../../config/interfaces';
import { State } from '../../config/enums';

type CreateTagDictionary = (tag: string, value: string, classList: string) => HTMLElement;
export const createTagDictionary: CreateTagDictionary = (tag: string, value = '', classList = '',) => {
    const elem = document.createElement(tag);
    elem.innerHTML = value;
    if(classList)elem.classList.add(classList);
    return elem;
};
type CreateImg = (tag: string, src: string, classList: string) => HTMLElement;
export const createImg: CreateImg = (tag: string, src: string, classList: string) => {
    const elem = document.createElement(tag) as HTMLImageElement;
    elem.src = src;
    elem.classList.add(classList);
    return elem;
};
type CreateAudio = (tag: string, src: string, classList: string) => HTMLElement;
export const createAudio: CreateAudio = (tag: string, src: string, classList: string) => {
    const elem = document.createElement(tag) as HTMLImageElement;
    elem.src = src
    elem.classList.add(classList);
    return elem;
};

export const isLocalSaveWordsIncludeItem = (array: Word[], item: Word) => {
    const searchId = item.id;
    const cityId = array && array.find(element => element.id === searchId) || false;
    return !!cityId

}
 
type CreateTag = (tag: string, value: string, classList: string) => HTMLElement;
export const createTag: CreateTag = (tag: string, classList = '', value = '') => {
  const elem = document.createElement(tag);
  elem.innerHTML = value;
  if (classList && classList !== 'false') {
    elem.classList.add(classList);
  }
  return elem;
};

type CreateInput = (
  type: string,
  value: string,
  classList: string,
  placeholder: string
) => HTMLInputElement;

export const createInput: CreateInput = (
  type: string,
  value: string,
  classList: string,
  placeholder: string
) => {
  const elem = document.createElement('input');
  elem.type = type;
  elem.value = value;
  elem.placeholder = placeholder;
  if (classList) {
    elem.classList.add(classList);
  }
  return elem;
};

type Find = (selector: string) => HTMLElement;

export const findSelector: Find = (selector: string) =>
  <HTMLElement>document.querySelector(`.${selector}`);

type PlayVoice = (audio: HTMLElement, voice: HTMLAudioElement) => Promise<void>;

const playVoice: PlayVoice = async (
  audio: HTMLElement,
  voice: HTMLAudioElement
) => {
  audio.classList.add(State.active);
  await voice.play();
  setTimeout(() => audio.classList.remove(State.active), 1000);
};

type InitAudioListener = (
  audio: HTMLElement,
  voice: HTMLAudioElement,
  classList: string
) => void;

export const initAudioListener: InitAudioListener = (
  audio: HTMLElement,
  voice: HTMLAudioElement,
  classList = ''
) => {
  voice.classList.add(classList);
  audio.addEventListener('click', async () => {
    await playVoice(audio, voice);
  });
};

import { API, Sprint } from '../../../config/enums';
import { Word } from '../../../config/interfaces';
import { getWords } from '../../api/api';
import {
    createTagDictionary,
    isLocalSaveWordsIncludeItem,
    createImg,
} from '../../helper/helper';
import Preloader from './preloader/preloader';
import SprintApp from '../Games/Sprint/sprint';
import PreAudiocall from '../Games/AudioCall/pre-audiocall';

class Dictionary {
    lastLocalStorePage: number;

    firstUiPage: number;

    lastUiPage: number;

    firstLocalPage: number;

    container: HTMLElement;

    difficultWords: string;

    user: string;

    difficultWordsArray: Word[];

    learnedWordsArray: Word[];

    preloader: Preloader;

    parent: HTMLElement

    sprint: SprintApp;

    audiocall: PreAudiocall;

    sprintButton: HTMLElement;
    constructor(parent: HTMLElement, sprintButton: HTMLElement) {
        this.parent = parent
        this.sprintButton = sprintButton
        this.container = createTagDictionary('div', '', 'dictionary-container');
        this.lastLocalStorePage = 29;
        this.firstUiPage = 1;
        this.firstLocalPage = 0;
        this.lastUiPage = 30;
        this.user = localStorage.getItem('token') || '';
        this.difficultWordsArray = [];
        this.learnedWordsArray = [] || localStorage.getItem('learned');
        this.preloader = new Preloader(this.container);
        this.difficultWords = 'Difficult Words';
        this.audiocall = new PreAudiocall(this.parent);

        this.sprint = new SprintApp(this.parent)
        
    }

    onUpdatePreloader(boolean: boolean) {
        const preloader = document.querySelector('.preloader');
        boolean
            ? preloader?.classList.remove('display-none')
            : preloader?.classList.add('display-none');
    }

    async getData() {
        const page = localStorage.getItem('current_page') || '0';
        const group = localStorage.getItem('current_group') || '0';
        const data = await getWords(group, page);
        return data;
    }

    renderDictionaryTitle() {
        const dictionaryTitle = createTagDictionary(
            'h1',
            '', //Учебник
            'dictionary-title'
        );
        this.container.append(dictionaryTitle);
    }

    renderGames() {
        const gamesContainer = createTagDictionary('div', '', 'games-container');
        this.container.append(gamesContainer);
        const gameAudioCall = createTagDictionary(
            'div',
            'AudioCall',
            'game-audio-call'
        );

        gameAudioCall.addEventListener('click', () => {
            this.parent.innerHTML = ''
            document.querySelectorAll('.disabled-page').forEach(item => {
                item.classList.remove('disabled-page')
            })
            this.sprintButton.classList.add('disabled-page')
            this.audiocall.initPreAudiocallGame()
        })

        const gameSprint = createTagDictionary('div', 'Sprint', 'game-sprint');
        gameSprint.addEventListener('click', () => {
            this.parent.innerHTML = ''
            document.querySelectorAll('.disabled-page').forEach(item => {
                item.classList.remove('disabled-page')
            })
            this.sprint.startGame()
        })

        gamesContainer.append(gameAudioCall);
        gamesContainer.append(gameSprint);
    }

    onSelectFullPage() {
        const allDifficultButtons = document.querySelectorAll(
            '.difficult-words-button'
        );
        const allLearnedButtons = document.querySelectorAll(
            '.learned-words-button'
        );
        const page = localStorage.getItem('current_page') || '1';
        const group = localStorage.getItem('current_group') || '1';
        const selectedPage = localStorage.getItem('selected-page');
        const selectedGroup = localStorage.getItem('selected-group');
        const numberOfButtons =
            allDifficultButtons.length + allLearnedButtons.length;
        if (numberOfButtons === 20) {
            if (page === selectedPage && group === selectedGroup) {
                document
                    .querySelector('.cards-container')
                    ?.classList.add('selected-page');
            }
            document
                .querySelector('.cards-container')
                ?.classList.add('selected-page');
            localStorage.setItem('selected-page', page);
            localStorage.setItem('selected-group', group);
        } else {
            document
                .querySelector('.cards-container')
                ?.classList.remove('selected-page');
        }
    }

    renderGroups() {
        const arr = [
            'Elementary (A1)',
            'Pre-Intermediate (A2)',
            'Intermediate (B1)',
            'Upper-Intermediate (B2)',
            'Advanced (C1)',
            'Proficiency (C2)',
        ];
        const localStorageGroupNum = localStorage.getItem('current_group') || '0';
        this.user && arr.push(this.difficultWords);
        const groupContainer = createTagDictionary('div', '', 'group-container');
        arr.forEach((item, index) => {
            const groupButton = createTagDictionary('div', item, 'group-button');
            if (index === +localStorageGroupNum) {
                groupButton.classList.add('disabled-group');
            } else if (
                localStorageGroupNum === 'difficult' &&
                groupButton.innerHTML === 'Difficult Words'
            ) {
                groupButton.classList.add('disabled-group');
            }
            groupButton.addEventListener('click', async () => {
                if (groupButton.innerHTML === this.difficultWords) {
                    localStorage.setItem('current_group', 'difficult');
                    await this.pageButtonsRender();
                } else {
                    localStorage.setItem('current_group', index.toString());
                    await this.pageButtonsRender();
                }
                document.querySelectorAll('.disabled-group').forEach((item) => {
                    item.classList.remove('disabled-group');
                });
                groupButton.classList.add('disabled-group');
            });
            groupContainer.append(groupButton);

            this.container.append(groupContainer);
        });
        return groupContainer;
    }

    async renderCards() {
        const localStorageGroud = localStorage.getItem('current_group');
        const savedWords = localStorage.getItem('words');
        const localWords = savedWords && JSON.parse(savedWords);
        const learnedWords = localStorage.getItem('learned');
        const localWordsLearned = learnedWords && JSON.parse(learnedWords);
        let cards: Word[] = [];
        this.removeCards();
        localStorageGroud !== 'difficult'
            ? (cards = await this.getData())
            : (cards = localWords);
        const cardsContainer = createTagDictionary('div', '', 'cards-container');
        cards &&
            cards.forEach((item) => {
                const included = isLocalSaveWordsIncludeItem(localWords, item);
                const includedLearned = isLocalSaveWordsIncludeItem(
                    localWordsLearned,
                    item
                );
                const card = createTagDictionary('div', '', 'card');
                const titleTransSound = createTagDictionary(
                    'div',
                    '',
                    'title-trans-sound'
                );
                const titleEn = createTagDictionary('h2', item.word, 'title-card');
                const transcription = createTagDictionary(
                    'h3',
                    item.transcription,
                    'word-transcription'
                );
                const image = createImg(
                    'img',
                    `${API.baseLink}/${item.image}`,
                    'img-card'
                );
                const sound = createTagDictionary('div', '', 'sound-card');
                const wordTranslate = createTagDictionary(
                    'h3',
                    item.wordTranslate,
                    'word-translate'
                );
                const meanConteiner = createTagDictionary('div', '', 'mean-conteiner');
                const textMeaning = createTagDictionary(
                    'h3',
                    item.textMeaning,
                    'text-meaning'
                );
                const textMeaningTranslate = createTagDictionary(
                    'p',
                    item.textMeaningTranslate,
                    'text-meaning-translate'
                );
                const exampleConteiner = createTagDictionary(
                    'div',
                    '',
                    'example-conteiner'
                );
                const textExample = createTagDictionary(
                    'p',
                    item.textExample,
                    'text-example'
                );
                const textExampleTranslate = createTagDictionary(
                    'p',
                    item.textExampleTranslate,
                    'text-example-translate'
                );
                const audio = new Audio(`${API.baseLink}/${item.audio}`);
                const audioMeaning = new Audio(`${API.baseLink}/${item.audioMeaning}`);
                const battonsContainer = createTagDictionary(
                    'div',
                    '',
                    'battons-container'
                );
                const difficultWordButton = createTagDictionary(
                    'div',
                    `${included ? 'Удалить из сложных слов' : `Сложнoе слово`}`,
                    'word-button'
                );
                const learnedWordsButton = createTagDictionary(
                    'div',
                    `${includedLearned ? 'Слово изучено' : `Изученное слово`}`,
                    'word-button'
                );
                if (includedLearned) {
                    learnedWordsButton?.classList.add('learned-words-button');
                    difficultWordButton.classList.add('difficult-word-disabled');
                }
                if (included) {
                    difficultWordButton?.classList.add('difficult-words-button');
                }
                const audioExample = new Audio(`${API.baseLink}/${item.audioExample}`);
                sound.addEventListener('click', () => {
                    setTimeout(() => {
                        audio.play();
                    }, 0);
                    setTimeout(() => {
                        audioMeaning.play();
                    }, 2000);
                    setTimeout(() => {
                        audioExample.play();
                    }, 6000);
                });
                cardsContainer.append(card);
                card.append(image);
                card.append(titleTransSound);
                card.append(wordTranslate);
                card.append(meanConteiner);
                card.append(exampleConteiner);
                titleTransSound.append(titleEn);
                titleTransSound.append(transcription);
                titleTransSound.append(sound);
                card.append(audioExample);
                meanConteiner.append(textMeaning);
                meanConteiner.append(textMeaningTranslate);
                exampleConteiner.append(textExample);
                exampleConteiner.append(textExampleTranslate);
                if (this.user) {
                    battonsContainer.append(difficultWordButton);
                    battonsContainer.append(learnedWordsButton);
                    learnedWordsButton.addEventListener('click', () => {
                        if (learnedWordsButton.innerHTML === 'Изученное слово') {
                            const learnedWords = localStorage.getItem('learned');
                            const localWordsLearned =
                                learnedWords && JSON.parse(learnedWords);
                            this.learnedWordsArray = localWordsLearned || [];
                            this.learnedWordsArray.push(item);
                            localStorage.setItem(
                                'learned',
                                JSON.stringify(this.learnedWordsArray)
                            );
                            this.difficultWordsArray = this.difficultWordsArray.filter(
                                (element) => element.id !== item.id
                            );
                            localStorage.setItem(
                                'words',
                                JSON.stringify(this.difficultWordsArray)
                            );
                            difficultWordButton.innerHTML = 'Сложнoе слово';
                            difficultWordButton?.classList.remove('difficult-words-button');
                            difficultWordButton.classList.add('difficult-word-disabled');
                            learnedWordsButton?.classList.add('learned-words-button');
                            learnedWordsButton.innerHTML = 'Слово изучено';
                            if (localStorageGroud === 'difficult') {
                                this.removeCards();
                                this.renderCards();
                            }
                            this.onSelectFullPage();
                            return;
                        }
                        if (learnedWordsButton.innerHTML === 'Слово изучено') {
                            const learnedWords = localStorage.getItem('learned');
                            const localWordsLearned =
                                learnedWords && JSON.parse(learnedWords);
                            this.learnedWordsArray = localWordsLearned;
                            this.learnedWordsArray = this.learnedWordsArray.filter(
                                (element) => element.id !== item.id
                            );
                            localStorage.setItem(
                                'learned',
                                JSON.stringify(this.learnedWordsArray)
                            );
                            learnedWordsButton?.classList.remove('learned-words-button');
                            learnedWordsButton.innerHTML = 'Изученное слово';
                            difficultWordButton.classList.remove('difficult-word-disabled');
                            this.onSelectFullPage();
                        }
                    });
                    difficultWordButton.addEventListener('click', () => {
                        if (difficultWordButton.innerHTML === 'Сложнoе слово') {
                            difficultWordButton.innerHTML = 'Удалить из сложных слов';
                            difficultWordButton?.classList.add('difficult-words-button');
                            this.difficultWordsArray.push(item);
                            localStorage.setItem(
                                'words',
                                JSON.stringify(this.difficultWordsArray)
                            );
                            this.onSelectFullPage();
                            return;
                        }
                        if (difficultWordButton.innerHTML === 'Удалить из сложных слов') {
                            difficultWordButton.innerHTML = 'Сложнoе слово';
                            difficultWordButton?.classList.remove('difficult-words-button');
                            this.difficultWordsArray = this.difficultWordsArray.filter(
                                (element) => element.id !== item.id
                            );
                            if (localStorageGroud === 'difficult') {
                                localStorage.setItem(
                                    'words',
                                    JSON.stringify(this.difficultWordsArray)
                                );
                                this.removeCards();
                                this.renderCards();
                            }
                            localStorage.setItem(
                                'words',
                                JSON.stringify(this.difficultWordsArray)
                            );
                            this.onSelectFullPage();
                        }
                    });
                    card.append(battonsContainer);
                }
            });
        this.container.append(cardsContainer);
        this.onSelectFullPage();
    }

    removeCards() {
        document.querySelectorAll('.cards-container').forEach((item) => {
            item.remove();
        });
    }

    disablePages() {
        const localStoragePage = localStorage.getItem('current_page') || '1';
        const start = document.querySelector('.page-button-start');
        const left = document.querySelector('.page-button-left');
        const right = document.querySelector('.page-button-right');
        const end = document.querySelector('.page-button-end');
        if (+localStoragePage === 0) {
            left?.classList.add('disabled-page');
            start?.classList.add('disabled-page');
        } else {
            left?.classList.remove('disabled-page');
            start?.classList.remove('disabled-page');
        }
        if (+localStoragePage === 29) {
            right?.classList.add('disabled-page');
            end?.classList.add('disabled-page');
        } else {
            right?.classList.remove('disabled-page');
            end?.classList.remove('disabled-page');
        }
    }

    renderPages() {
        const pageButtons = createTagDictionary('div', '', 'page-buttons');
        this.container.append(pageButtons);
        const pageButtonStart = createTagDictionary('div', '', 'page-button-start');
        pageButtons.append(pageButtonStart);
        const pageButtonLeft = createImg('div', '', 'page-button-left');
        pageButtons.append(pageButtonLeft);
        const page = createTagDictionary('div', '', '');
        const number = localStorage.getItem('current_page') || 1;
        page.innerHTML = `${+number + 1}/30`;
        page.classList.add('curr__page');
        pageButtons.append(page);
        const pageButtonRight = createTagDictionary('div', '', 'page-button-right');
        pageButtons.append(pageButtonRight);
        const pageButtonEnd = createTagDictionary('div', '', 'page-button-end');
        pageButtons.append(pageButtonEnd);
        this.disablePages();
        pageButtonEnd.addEventListener('click', async () => {
            const localStoragePage = localStorage.getItem('current_page') || '1';
            if (+localStoragePage + 1 < this.lastUiPage) {
                localStorage.setItem(
                    'current_page',
                    this.lastLocalStorePage.toString()
                );
                page.innerHTML = `${this.lastLocalStorePage + 1}/30`;
                this.disablePages();
                await this.pageButtonsRender();
            }
        });
        pageButtonStart.addEventListener('click', async () => {
            const localStoragePage = localStorage.getItem('current_page') || '1';
            if (+localStoragePage + 1 > 1) {
                localStorage.setItem('current_page', this.firstLocalPage.toString());
                page.innerHTML = `${this.firstLocalPage + 1}/30`;
                this.disablePages();
                await this.pageButtonsRender();
            }
        });
        pageButtonRight.addEventListener('click', async () => {
            const localStoragePage = localStorage.getItem('current_page') || '1';
            if (+localStoragePage + 1 < this.lastUiPage) {
                const currentNumber = +localStoragePage + 1;
                localStorage.setItem('current_page', currentNumber.toString());
                page.innerHTML = `${currentNumber + 1}/30`;
                this.disablePages();
                await this.pageButtonsRender();
            }
        });
        pageButtonLeft.addEventListener('click', async () => {
            const localStoragePage = localStorage.getItem('current_page') || '1';
            if (+localStoragePage + 1 > 1) {
                const currentNumber = +localStoragePage - 1;
                localStorage.setItem('current_page', currentNumber.toString());
                page.innerHTML = `${currentNumber + 1}/30`;
                this.disablePages();
                await this.pageButtonsRender();
            }
        });
        return pageButtons;
    }

    async pageButtonsRender() {
        this.onUpdatePreloader(true);
        this.removeCards();
        await this.renderCards();
        this.onUpdatePreloader(false);
    }

    async init() {
        this.container.innerHTML = ''
        this.parent.append(this.container);
        this.renderDictionaryTitle();
        this.renderGames();
        this.container.append(this.renderGroups());
        this.container.append(this.renderPages());
        this.preloader.init();
        this.onUpdatePreloader(true);
        await this.renderCards();
        this.onUpdatePreloader(false);
    }
}

export default Dictionary;

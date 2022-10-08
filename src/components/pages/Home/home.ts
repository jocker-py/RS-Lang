import { createTagDictionary } from '../../helper/helper';
import AboutUs from '../AboutUs/about';
import Dictionary from '../Dictionary/dictionary';
import PreAudiocall from '../Games/AudioCall/pre-audiocall';
import SprintApp from '../Games/Sprint/sprint';
import Authorization from './authorization/authorization';


class Home {
    homeContainer: HTMLElement;

    aboutUs: AboutUs;

    sprint: SprintApp;

    audiocall: PreAudiocall;

    dictionary: Dictionary;

    main: HTMLElement

    footer: HTMLElement

    sprintButton: HTMLElement

    constructor() {
        this.main = createTagDictionary('div', '', 'main');
        this.footer = createTagDictionary('div', '', 'footer');
        this.sprintButton = createTagDictionary('div', 'sprint', 'header-batton');

        this.sprint = new SprintApp(this.main);
        this.audiocall = new PreAudiocall(this.main);
        this.dictionary = new Dictionary(this.main, this.sprintButton);
        this.homeContainer = createTagDictionary('div', '', 'home-container');
        document.body.append(this.homeContainer);
        this.aboutUs = new AboutUs();
        
    }

    onClearMain() {
        this.main.innerHTML = ''
    }

    onDisableHeaderButton(element: HTMLElement) {
        document.querySelectorAll('.disabled-page').forEach(item => {
            item.classList.remove('disabled-page')
        })
        element.classList.add('disabled-page')
    }

    appendMain() {
        this.homeContainer.append(this.main);
    }

    initGameSprint(sprint: HTMLElement) {
        this.onDisableHeaderButton(sprint)
        this.onClearMain()
        this.footer.innerHTML = ''
        this.sprint.startPage()
    }

    renderHeader() {
        const header = createTagDictionary('div', '', 'header');
        this.homeContainer.append(header);
        const mainTitle = createTagDictionary('h1', 'SKYlang', 'main-title');
        mainTitle.classList.add('disabled-page')
        const dictionary = createTagDictionary('div', 'dictionary', 'header-batton');
        const audioCall = createTagDictionary('div', 'audioCall', 'header-batton');
        const statistics = createTagDictionary('div', 'statistics', 'header-batton');
        header.append(mainTitle, dictionary, audioCall, this.sprintButton, statistics)
        mainTitle.addEventListener('click', () => {
            this.onDisableHeaderButton(mainTitle);
            this.onClearMain();
            !this.footer.innerHTML && this.initFooter();
            this.init();
        })
        this.sprintButton.addEventListener('click', () => {
            this.initGameSprint(this.sprintButton)
        })
        audioCall.addEventListener('click', () => {
            this.onDisableHeaderButton(audioCall)
            this.onClearMain()
            this.footer.innerHTML = ''
            this.audiocall.initPreAudiocallGame()
        })
        dictionary.addEventListener('click', () => {
            this.onDisableHeaderButton(dictionary)
            this.onClearMain()
            !this.footer.innerHTML && this.initFooter()
            this.dictionary.init()
        })
    }



    renderMain() {
        const skyLangInfConteiner = createTagDictionary('div', '', 'sky-lang-inf-conteiner');
        const skyLangTitle = createTagDictionary('h2', 'SKYlang', 'sky-lang-title');
        const skyLangText = createTagDictionary('div', 'SKYlang - это про удобство и легкость в изучении даже самых сложных слов. Уже спустя три месяца изучения слов с нами, ты заговоришь на английском языке и начнешь понимать носителей! :)', 'sky-lang-text');
        const listOfQualities = createTagDictionary('ul', '', 'list-of-qualities');
        const firstQuality = createTagDictionary('li', '', 'first-quality');
        const firstQualityImage = createTagDictionary('div', '', 'first-quality-image');
        const firstQualityText = createTagDictionary('p', 'С помощью игр слова запоминаются еще быстрее', 'first-quality-text');
        firstQuality.append(firstQualityImage, firstQualityText);
        const secondQuality = createTagDictionary('li', '', 'second-quality');
        const secondQualityImage = createTagDictionary('div', '', 'second-quality-image');
        const secondQualityText = createTagDictionary('p', 'Каждое слово в учебнике с аудио, что позволит узнать правильное произноешние слова', 'second-quality-text');
        secondQuality.append(secondQualityImage, secondQualityText);
        const thirdQuality = createTagDictionary('li', '', 'third-quality');
        const thirdQualityImage = createTagDictionary('div', '', 'third-quality-image');
        const thirdQualityText = createTagDictionary('p', 'Есть статистика, которая позволит отслеживать свои результаты изучения слов', 'third-quality-text');
        thirdQuality.append(thirdQualityImage, thirdQualityText);
        listOfQualities.append(firstQuality, secondQuality, thirdQuality);
        skyLangInfConteiner.append(skyLangTitle, skyLangText, listOfQualities);

        this.main.append(skyLangInfConteiner);
    }

    renderFooter() {
        this.homeContainer.appendChild(this.footer);
        const logoRss = document.createElement('a');
        logoRss.href = 'https://rs.school/js/';
        const imageLogo = document.createElement('img');
        imageLogo.classList.add('img-logo');
        logoRss.append(imageLogo);
        const gitValeryia = document.createElement('a');
        gitValeryia.href = 'https://github.com/ValeryiaDemeneva';
        // gitValeryia.innerHTML = 'Валерия';
        gitValeryia.classList.add('footer__git--val');
        const gitAlex = document.createElement('a');
        gitAlex.href = 'https://github.com/SaintSanta';
        // gitAlex.innerHTML = 'Алексей';
        gitAlex.classList.add('footer__git--alex');
        const gitVlad = document.createElement('a');
        gitVlad.href = 'https://github.com/jocker-py';
        // gitVlad.innerHTML = 'Влад';
        gitVlad.classList.add('footer__git--vlad');
        const year = createTagDictionary('div', '2022', 'year');
        this.footer.append(logoRss, gitValeryia, gitAlex, gitVlad, year);

    }

    initHeader() {
        this.renderHeader();
        new Authorization();
    }

    initFooter() {
        this.renderFooter();
    }

    init() {
        this.renderMain();
        this.aboutUs.init();

    }
}
export default Home;
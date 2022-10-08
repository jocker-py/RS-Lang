import { createTagDictionary } from '../../helper/helper';
class AboutUs {
    constructor() {
    }

    init() {
        const aboutUs = createTagDictionary('div', '', 'about-us');
        const aboutUsContainer = createTagDictionary('div', '', 'about-us-container');
        const titleAboutUs = createTagDictionary('h3', 'Наша команда:', 'title-about-us');
        aboutUs.append(titleAboutUs);
        aboutUs.append(aboutUsContainer);
        const mainHome = document.querySelector('.main');
        mainHome?.append(aboutUs);
        const alexContainer = createTagDictionary('div', '', 'alex-container');
        const alexNameAndText = createTagDictionary('div', '', 'name-and-text-al');
        const alexName = createTagDictionary('h3', 'Alex', 'alex-name');
        const alexText = createTagDictionary('p', 'Tим-лид команды', 'alex-text');
        const taskListAlex = createTagDictionary('ul', '', 'task-list');
        const firstTaskAlex = createTagDictionary('li', 'Игра «Аудио вызов»', 'first-task-alex');
        const secondTaskAlex = createTagDictionary('li', 'Страница "Статистика"', 'second-task-alex');
        taskListAlex.append(firstTaskAlex, secondTaskAlex);
        const alexPhoto = createTagDictionary('div', '', 'alex-photo');
        alexNameAndText.append(alexName, alexText, taskListAlex);
        alexContainer.append(alexNameAndText);
        alexContainer.append(alexPhoto);
        const valeryiaContainer = createTagDictionary('div', '', 'valeryia-container');
        const valNameAndText = createTagDictionary('div', '', 'name-and-text-val');
        const valeryiaName = createTagDictionary('h3', 'Valeryia', 'valeryia-name');
        const valeryiaText = createTagDictionary('p', 'Муза команды', 'valeryia-text');
        const taskListValeryia = createTagDictionary('ul', '', 'task-list');
        const firstTaskValeryia = createTagDictionary('li', 'Учебник', 'first-task-valeryia');
        const secondTaskValeryia = createTagDictionary('li', 'Главная страница', 'second-task-valeryia');
        const thirdTaskValeryia = createTagDictionary('li', 'Раздел «О команде»', 'third-task-valeryia');
        taskListValeryia.append(firstTaskValeryia, secondTaskValeryia, thirdTaskValeryia);
        const valeryiaPhoto = createTagDictionary('div', '', 'valeryia-photo');
        valNameAndText.append(valeryiaName, valeryiaText, taskListValeryia);
        valeryiaContainer.append(valNameAndText);
        valeryiaContainer.append(valeryiaPhoto);
        const vladContainer = createTagDictionary('div', '', 'vlad-container');
        const vladNameAndText = createTagDictionary('div', '', 'name-and-text-vl');
        const vladName = createTagDictionary('h3', 'Vlad', 'vlad-name');
        const vladText = createTagDictionary('p', 'Мозг команды', 'vlad-text');
        const taskListVlad = createTagDictionary('ul', '', 'task-list');
        const firstTaskVlad = createTagDictionary('li', 'Игра "Спринт"', 'first-task-vlad');
        const secondTaskVlad = createTagDictionary('li', 'Создание API', 'second-task-vlad');
        const thirdTaskVlad = createTagDictionary('li', 'Страница регистрации и логина', 'third-task-vlad');
        taskListVlad.append(firstTaskVlad, secondTaskVlad, thirdTaskVlad);
        const vladPhoto = createTagDictionary('div', '', 'vlad-photo');
        vladNameAndText.append(vladName, vladText, taskListVlad);
        vladContainer.append(vladNameAndText);

        vladContainer.append(vladPhoto);
        aboutUsContainer.append(alexContainer);
        aboutUsContainer.append(valeryiaContainer);
        aboutUsContainer.append(vladContainer);

    }
}

export default AboutUs  
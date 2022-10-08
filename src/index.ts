import { createTagDictionary } from './components/helper/helper';
import './styles/main.scss';
import Home from './components/pages/Home/home';

class App {

    main: HTMLElement;

    home: Home
    constructor() {
        this.main = createTagDictionary('div', '', 'main');
        this.home = new Home();
    }

    init() {
        this.home.initHeader();
        this.home.appendMain();
        this.home.init();
        this.home.initFooter();

    }
}

const app = new App();
app.init();

import { findSelector } from '../../../helper/helper';
import Page from './page';

class SprintApp {
  page: Page;

  main: HTMLElement | null;

  parent: HTMLElement;
  
  constructor(parent: HTMLElement) {
    this.parent = parent;
    this.main = findSelector('main');
    this.page = new Page();
  }

  startPage(): void {
    this.page.draw(this.parent);
    this.page.initListeners();
  }

  startGame(){
    const footer = findSelector('footer');
    footer.innerHTML = '';
    this.page.draw(this.parent);
    this.page.initDictStart();
  }
}

export default SprintApp
// const sprint = new Sprint();
// sprint.startPage();

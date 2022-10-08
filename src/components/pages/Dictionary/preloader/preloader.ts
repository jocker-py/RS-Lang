import { createTag } from '../../../helper/helper';

class Preloader {
  container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  init() {
    const preloader = createTag('div', '', 'preloader');
    const preloaderRow = createTag('div', '', 'preloader-row');
    const preloaderItem = createTag('div', '', 'preloader-item');
    const preloaderItem1 = createTag('div', '', 'preloader-item');
    preloader.classList.add('display-none');
    this.container.append(preloader);
    preloader.append(preloaderRow);
    preloaderRow.append(preloaderItem);
    preloaderRow.append(preloaderItem1);
  }
}

export default Preloader;
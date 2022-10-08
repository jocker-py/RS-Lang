import { createTag, findSelector } from "../../../helper/helper";
import Audiocall from "./audiocall";

class PreAudiocall {
  wrapper_audiocall: HTMLElement;

  audiocall: Audiocall;

  parent: HTMLElement;
  
  constructor(parent: HTMLElement) {
    this.parent = parent;
    this.audiocall = new Audiocall(parent);
    this.wrapper_audiocall = createTag('div', 'wrapper_audiocall', '');
  }

  initPreAudiocallGame() {
    const footer = findSelector('footer');
    footer.innerHTML = '';
    this.wrapper_audiocall.innerHTML = '';
    this.parent.append(this.wrapper_audiocall);
    this.renderPreAudiocallWrapper();
    this.renderLevelBtns();
  }

  renderPreAudiocallWrapper() {
    const header = createTag('div', 'wrapper_box', '');
    const titleOne = createTag('h1', '', 'Аудиовызов');
    const descriptionOne = createTag('h3', '', 'Улучшает твоё восприятие речи на слух');
    this.wrapper_audiocall.append(header);
    header.appendChild(titleOne);
    header.appendChild(descriptionOne);
    const titleTwo = createTag('div', 'title_complexity', '');
    const descriptionTwo = createTag('h3', '', 'уровень сложности');
    this.wrapper_audiocall.append(titleTwo);
    titleTwo.appendChild(descriptionTwo);
  }

  renderLevelBtns() {
    const arrBtn = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const levelBtns = createTag('div', 'level_btns', '');
    this.wrapper_audiocall.append(levelBtns);
    arrBtn.forEach(elem => {
      const levelBtn = createTag('button', 'level_btn', elem);
      levelBtns.append(levelBtn);
    })
    const start = createTag('button', 'start_btn', 'Начать');
    this.wrapper_audiocall.append(start);

    for (let i = 0; i < 6; i += 1) {
      levelBtns.children.item(i)?.setAttribute('data-key', `${i}`);
    }

    levelBtns.addEventListener('click', (e) => {
      const target = e.target as HTMLButtonElement;
      if (target.tagName !== 'button') {
          const groupWords: string | null = target.getAttribute('data-key');
          if (groupWords) {
            localStorage.setItem('level', groupWords);
          }
        }
      }
      )
      
      start.addEventListener('click', () => {
        this.wrapper_audiocall.innerHTML = '';
        void this.audiocall.initMain();
      })
  }
}

export default PreAudiocall;

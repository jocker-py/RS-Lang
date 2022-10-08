/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */

import { API, Auth, Notice, Phrases, State } from '../../../../config/enums';
import { createUser, loginUser } from '../../../api/api';
import { createTag, createInput, findSelector } from '../../../helper/helper';

class Authorization {
  user: HTMLElement;

  close: HTMLElement;

  wrapper: HTMLElement;

  root: HTMLElement;

  signIn: HTMLElement;

  signUp: HTMLElement;

  btnSignIn: HTMLElement;

  btnSignUp: HTMLElement;

  constructor() {
    this.user = createTag('div', Auth.user, '');
    this.close = createTag('div', Auth.close, '');
    this.wrapper = createTag('div', Auth.wrapper, '');
    this.root = createTag('section', Auth.root, '');
    this.signIn = createTag('section', Auth.signIn, '');
    this.signUp = createTag('section', Auth.signUp, '');
    this.btnSignIn = createTag('button', Auth.button, Phrases.into);
    this.btnSignUp = createTag('button', Auth.button, Phrases.reg);
    this.init();
  }

  init() {
    const user = localStorage.getItem('name') || '';
    const header = document.querySelector('.header');
    this.reset();
    this.createSignIn();
    this.createSignUp();
    this.addListeners();
    this.initLogo();
    header?.append(this.user, this.root);
    if (user) this.createLogOut();
  }

  reset(): void {
    this.root.innerHTML = '';
    this.signIn.innerHTML = '';
    this.signUp.innerHTML = '';
    this.root.append(this.close);
    this.root.append(this.wrapper);
  }

  initLogo(): void {
    this.user.innerHTML = '';
    const img = createTag('div', Auth.img, '');
    const call = createTag('div', Auth.call, Phrases.guest);
    const name = localStorage.getItem(API.name);
    if (name) {
      call.innerText = name;
      img.classList.add(State.active);
      img.addEventListener('click', () => this.createLogOut());
    }
    this.user.append(img, call);
    this.user.addEventListener('click', () => {
      this.root.classList.add(State.active);
    });
  }

  addListeners(): void {
    this.close.addEventListener('click', () => {
      this.root.classList.remove(State.active);
    });
    this.btnSignIn.addEventListener('click', () =>
      this.checkInput(Auth.signIn)
    );
    this.btnSignUp.addEventListener('click', () =>
      this.checkInput(Auth.signUp)
    );
  }

  createSignIn(): void {
    const main = createTag('section', Auth.main, '');
    const title = createTag('h2', Auth.title, Phrases.into);
    const email = createInput('email', '', Auth.email, Phrases.email);
    const password = createInput(
      'password',
      '',
      Auth.password,
      Phrases.password
    );
    const notice = createTag('div', Auth.notice, '');
    const additional = createTag('section', Auth.add, '');
    const subtitle = createTag('h2', Auth.subtitle, Phrases.hello);
    const description = createTag('p', Auth.description, Phrases.descr1);
    const move = createTag('button', Auth.move, Phrases.reg);

    additional.append(subtitle, description, move);
    main.append(title, email, password, this.btnSignIn, notice);
    this.signIn.append(main, additional);
    this.wrapper.append(this.signIn);
    move.addEventListener('click', () =>
      this.wrapper.classList.add(State.active)
    );
  }

  createSignUp(): void {
    const main = createTag('section', Auth.main, '');
    const title = createTag('h2', Auth.title, Phrases.reg);
    const userEmail = createInput('email', '', Auth.email, Phrases.email);
    const userPassword = createInput(
      'password',
      '',
      Auth.password,
      Phrases.password
    );
    const userName = createInput('text', '', Auth.name, Phrases.name);
    const notice = createTag('div', Auth.notice, '');
    const additional = createTag('section', Auth.add, '');
    const subtitle = createTag('h2', Auth.subtitle, Phrases.back);
    const move = createTag('button', Auth.button, Phrases.into);
    const description = createTag('p', Auth.description, Phrases.descr2);
    additional.append(subtitle, description, move);
    main.append(
      title,
      userName,
      userEmail,
      userPassword,
      this.btnSignUp,
      notice
    );
    this.signUp.append(main, additional);
    this.wrapper.append(this.signUp);
    move.addEventListener('click', () => {
      this.wrapper.classList.remove(State.active);
    });
  }

  async checkInput(target: string): Promise<void> {
    let response = 200;
    let name = null;
    const section = findSelector(target);
    const notice = <HTMLElement>section.querySelector(`.${Auth.notice}`);
    const email = (<HTMLInputElement>section.querySelector(`.${Auth.email}`))
      .value || '';
    const password = (<HTMLInputElement>(
      section.querySelector(`.${Auth.password}`)
    )).value || '';
    if (target === Auth.signUp) {
      name = (<HTMLInputElement>section.querySelector(`.${Auth.name}`)).value || '';
    }
    notice.innerHTML = '';
    const check = this.checkItems(notice, email, password, name);
    if (check) {
      if (target === Auth.signUp && name && name.length) {
        response = await createUser({ email, password, name });
      } else {
        response = await loginUser({ email, password });
      }
      const checkResponse = this.checkResponse(notice, response);
      if (checkResponse) this.showSuccess(target);
    }
  }

  checkResponse(notice: HTMLElement, response: number): boolean {
    if (response >= 200 && response < 300) return true;
    if (response === 403) {
      notice.innerHTML = Notice.falsePassword;
      return false;
    }
    if (response === 404) {
      notice.innerHTML = Notice.noUser;
      return false;
    }
    if (response === 417) {
      notice.innerHTML = Notice.userExist;
      return false;
    }
    if (response === 422) {
      notice.innerHTML = Notice.incorrect;
      return false;
    }
    return false
  }

  checkItems(
    notice: HTMLElement,
    email: string,
    password: string,
    name: string | null
  ): boolean {
    if (name !== null && !name.length) {
      notice.innerHTML = Notice.name;
      return false;
    }
    if (!email.includes('@') || email.length < 4) {
      notice.innerHTML = Notice.email;
      return false;
    }
    if (password.length < 8) {
      notice.innerHTML = Notice.password;
      return false;
    }
    
    return true;
  }

  showSuccess(target: string): void {
    if (target === Auth.signIn){
      this.showSignIn()
    } else {
      this.showSignUp()
    }
  }

  showSignIn(){
    const mark = createTag('div', Auth.mark, '');
    const title = createTag('h2', Auth.title, Phrases.graditude1);
    const description = createTag('div', Auth.description, Phrases.descr3);
    const button = createTag('button', Auth.button, Phrases.want);
    this.root.innerHTML = '';
    this.root.append(mark, title, description, button);

    button.addEventListener('click', () => {
      this.root.classList.remove(State.active);
    });
    this.initLogo();
  }

  showSignUp(){
    const mark = createTag('div', Auth.mark, '');
    const title = createTag('h2', Auth.title, Phrases.graditude2);
    const description = createTag('div', Auth.description, Phrases.descr4);
    const button = createTag('button', Auth.button, Phrases.continiue);
    const main = <HTMLElement>this.signUp.querySelector(`.${Auth.main}`);
    main.innerHTML = '';
    main.append(mark, title, description, button);
    button.addEventListener('click', () => {
      this.wrapper.style.left = '0';
    });

    this.initLogo();
  }

  createLogOut(): void {
    this.root.innerHTML = '';
    const button = createTag('button', Auth.button, Phrases.out);
    const title = createTag('h2', Auth.title, Phrases.leave);
    button.addEventListener('click', () => {
      localStorage.clear();
      this.init();
    });
    this.root.append(title, button, this.close);
  }
}

export default Authorization;

export enum Method {
  get = 'GET',
  post = 'POST',
  delete = 'DELETE',
  put = 'PUT',
}

export enum API {
  baseLink = 'https://learn-words-rs-lang.herokuapp.com',
  json = 'application/json',
  signIn = 'https://learn-words-rs-lang.herokuapp.com/signin',
  users = 'https://learn-words-rs-lang.herokuapp.com/users',
  tokens = 'tokens',
  words = 'words',
  token = 'token',
  refreshToken = 'refreshToken',
  settings = 'settings',
  stats = 'statistics',
  name = 'name',
  userId = 'userId',
}

export enum Sprint {
  root = 'sprint',
  header = 'sprint__header',
  timer = 'sprint__timer',
  sound = 'sprint__sound',
  exit = 'sprint__exit',
  points = 'sprint__points',
  buttons = 'sprint__buttons',
  true = 'sprint__true',
  false = 'sprint__false',
  time = 'sprint__time',
}

export enum Card {
    root = 'card',
    list = 'card__list',
    item = 'card__item',
    header = 'card__header',
    rounds = 'card__rounds',
    round = 'card__round',
    title = 'card__title',
    image = 'card__image',
    eng = 'card__eng',
    ru = 'card__ru',
    buttons = 'card__buttons',
    button = 'card__button',
    false = 'card__false',
    true = 'card__true',
    audio = 'card__audio',
    voice = 'card__voice',
    stat = 'card__stat',
    positive = 'card__positive',
    negative = "card__negative",
    row = 'card__table',
    fail = 'card__count--fail',
    right = 'card__count--right',
    wrapper = 'wrapper',
}

export enum State {
  active = 'active',
  right = 'right',
  wrong = 'wrong',
}

export enum Level {
  A1,
  A2,
  B1,
  B2,
  C1,
  C2,
}

export enum SprintPage {
  root = 'page',
  description = 'page__description',
  levels = 'page__levels',
  level = 'page__level',
  currentLevel = 'page__level--',
  close = 'page__close',
}

export enum Auth {
  root = 'auth',
  user = 'auth__user',
  img = 'auth__img',
  call = 'auth__call',
  in = 'auth__in',
  close = 'auth__close',
  signIn = 'auth__sign-in',
  signUp = 'auth__sign-up',
  main = 'auth__main',
  add = 'auth__additional',
  title = 'auth__title',
  email = 'auth__email',
  password = 'auth__password',
  button = 'auth__button',
  subtitle = 'auth__subtitle',
  description = 'auth__description',
  move = 'auth__move',
  name = 'auth__name',
  wrapper = 'wrapper',
  notice = 'auth__notice',
  mark = 'auth__mark',
}

export enum Phrases {
    'У тебя все получится' = 0,
    Отлично = 1,
    Изумительно = 2,
    Превосходно = 3,
    into = 'войти',
    out = 'выйти',
    reg = 'регистрация',
    guest = 'гость',
    email = 'почта',
    password = 'пароль',
    name = 'имя',
    hello = 'Приветствуем, Друзья!',
    descr1 = 'Введите свои личные данные и давайте начнем учиться',
    descr2 = 'Уже не первый раз? Тогда кликайте сюда и вводите персональные данные',
    descr3 = 'Теперь вам доступно гораздо больше',
    descr4 = 'Нажмите продолжить и введите данные',
    continiue = 'Продолжить',
    back = 'С возвращением!',
    graditude1 = 'Поздравляем с успешной авторизацией!',
    graditude2 = 'Поздравляем с успешной регистрацией!',
    want = 'Хочу учиться!',
    leave = 'Уже уходите?',
}

export enum Notice {
  falsePassword = 'Не правильный пароль',
  noUser = 'Такого пользователя не существует',
  userExist = 'Такой пользователь уже существует',
  incorrect = 'Не корректный пароль или e-mail',
  email = 'Пожалуйста, введите корректный е-mail',
  password = 'Пароль должен содержать не менее 8 символов',
  name = 'Пожалуйста, введте имя пользователя',
}

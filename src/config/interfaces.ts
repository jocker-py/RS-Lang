export interface Word {
  id: string;
  group: string;
  page: string;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export type Difficulty = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

interface WordOptions {
  attemp: number,
  learned: boolean,
}
export interface UserWord {
  id: string;
  difficulty: Difficulty;
  optional: WordOptions // TODO что здесь должно быть???
}

export interface CustomWord {
  id : UserId,
  difficulty: Difficulty;
  optional: WordOptions,
  wordId: Word['id'],
}

// export interface Statistic {
//   learnedWords: number;
//   optional: {}; // TODO что здесь должно быть???
// }

// export interface Setting {
//   wordsPerDay: number;
//   optional: {}; // TODO что здесь должно быть???
// }

export type UserId = string;

export interface Tokens {
  token: string;
  refreshToken: string;
}

export interface UserAuth {
  message: string;
  name: string;
  userId: UserId;
}

export interface UserSignIn {
  email: string;
  password: string;
}

export interface UserCreate {
  name: string;
  email: string;
  password: string;
}
export interface UserResponse {
  name: string;
  email: string;
  userId: UserId;
}

export interface UserSettings {
  wordsPerDay: number;
  optional: unknown;
}

export interface UserStats {
  learnedWords: number;
  optional: unknown;
}


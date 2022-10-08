/* eslint-disable consistent-return */
import { API, Method } from '../../config/enums';

import {
  Word,
  UserCreate,
  UserId,
  UserSignIn,
  Tokens,
  UserWord,
  UserStats,
  UserSettings,
  UserAuth,
  CustomWord,
} from '../../config/interfaces';


const getAuthHeaders = () => {
  const token = localStorage.getItem(API.token);
  if(token){
    return {
      Authorization: `Bearer ${token}`,
      Accept: API.json,
      'Content-Type': API.json,
    };
  }
};

const getHeaders = () => ({ Accept: API.json, 'Content-Type': API.json });


export const getWords = async (group = '0', page = '0'): Promise<Word[]> => {
  const response: Response = await fetch(
    `${API.baseLink}/${API.words}?group=${parseInt(group, 10)}&page=${parseInt(page, 10)}`
  );
  const content: Word[] = <Word[]>await response.json();
  return content;
};

export const getWordById = async (wordId: string): Promise<Word> => {
  const response: Response = await fetch(
    `${API.baseLink}/${API.words}/${wordId}`,
    { headers: getHeaders() }
  );
  const json: Word = <Word>await response.json();
  return json;
};


export const createUser = async (user: UserCreate): Promise<number> => {
  const response = await fetch(`${API.baseLink}/users`, {
    method: Method.post,
    headers: {
      Accept: API.json,
      'Content-Type': API.json,
    },
    body: JSON.stringify(user),
  });
    return response.status;
};

export const getNewToken = async (id: UserId): Promise<void> => {
  const response = await fetch(`${API.users}/${id}/${API.tokens}`, {
    headers: getAuthHeaders(),
  });
  const { token, refreshToken } = <Tokens>await response.json();
  localStorage.setItem(API.token, token);
  localStorage.setItem(API.refreshToken, refreshToken);
};

export const getUserWords = async (id: UserId): Promise<CustomWord[]> => {
  const response = await fetch(`${API.users}/${id}/${API.words}`, {
    headers: getAuthHeaders(),
  });
  const content = <CustomWord[]>(<unknown>response.json());
  return content;
};

export const createUserWord = async (
  id: UserId,
  wordId: string,
  word: UserWord
): Promise<UserWord> => {
  const response = await fetch(`${API.users}/${id}/${API.words}/${wordId}`, {
    method: Method.post,
    headers: getAuthHeaders(),
    body: JSON.stringify(word),
  });
  const content = <UserWord>await response.json();
  return content;
};

export const updateUserWord = async (id:UserId, wordId: Word['id'], options: UserWord) => {
  const response = await fetch(`${API.users}/${id}/${API.words}/${wordId}`, {
    method : Method.post,
    headers : getAuthHeaders(),
    body: JSON.stringify(options)
  }) 
}

export const getUserWordById = async(id:UserId, wordId:Word['id']):Promise<CustomWord> => {
  const response = await fetch(`${API.users}/${id}/${API.words}/${wordId}`, {
    method: Method.get,
    headers: getAuthHeaders(),
  })
    const content = <CustomWord>await response.json();
    return content
}

export const getStats = async (id: UserId): Promise<UserStats> => {
  const response: Response = await fetch(`${API.users}/${id}/${API.stats}`, {
    headers: getAuthHeaders(),
  });
  const content = <UserStats>await response.json();
  return content;
};

export const setStats = async (
  id: UserId,
  stats: UserStats
): Promise<UserStats> => {
  const response: Response = await fetch(`${API.users}/${id}/${API.stats}`, {
    method: Method.put,
    headers: getAuthHeaders(),
    body: JSON.stringify(stats),
  });
  const content = <UserStats>await response.json();
  return content;
};

export const getSettings = async (id: UserId): Promise<UserSettings> => {
  const response: Response = await fetch(`${API.users}/${id}/${API.settings}`, {
    headers: getAuthHeaders(),
  });
  const content = <UserSettings>await response.json();
  return content;
};

export const setSettings = async (
  id: UserId,
  settings: UserSettings
): Promise<UserSettings> => {
  const response: Response = await fetch(`${API.users}/${id}/${API.settings}`, {
    method: Method.put,
    headers: getAuthHeaders(),
    body: JSON.stringify(settings),
  });
  const content = <UserSettings>await response.json();
  return content;
};

export const loginUser = async (
  user: UserSignIn
): Promise<Response['status']> => {
  const response: Response = await fetch(`${API.signIn}`, {
    method: Method.post,
    headers: getHeaders(),
    body: JSON.stringify(user),
  });
  if (response.ok) {
    const { token, refreshToken, name, userId } = <UserAuth & Tokens>(
      await response.json()
    );
    localStorage.setItem(API.userId, userId);
    localStorage.setItem(API.name, name);
    localStorage.setItem(API.token, token);
    localStorage.setItem(API.refreshToken, refreshToken);
  }
  return response.status;
};
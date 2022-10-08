import { Word } from '../../../../config/interfaces';
import { getWords } from '../../../api/api';
import { getRandom, getRandomPage, toActOnFiveButtons } from './constants';


let gameRandomWordsArray: Word[] = [];
let groupWords = localStorage.getItem('level');
if (!groupWords) groupWords = '0';
const data = getWords(String(groupWords), String(getRandomPage(0, 30)));
const oneGameSessionWordsArray: Word[] = [];

async function fillRandomArray() {
  (await data).forEach((item: Word) => {
    gameRandomWordsArray.push(item);
  });
}
void fillRandomArray();
gameRandomWordsArray = gameRandomWordsArray.sort(getRandom);

for (let i = 0; i < toActOnFiveButtons; i += 1) {
  oneGameSessionWordsArray.push(gameRandomWordsArray[i]);
}

export default oneGameSessionWordsArray
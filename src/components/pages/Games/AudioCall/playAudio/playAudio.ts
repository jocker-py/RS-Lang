/* eslint-disable @typescript-eslint/restrict-template-expressions */
// import audiocallState from "../../../../state/audiocallState";
import { API } from "../../../../../config/enums";

const playAudioWord = async () => {
  const playAudio = new Audio();
  // if (audiocallState.words) {
  //   playAudio.src = `${API.baseLink}${audiocallState.words[0].audio}`;
  // }
  playAudio.volume = 1.0;
  await playAudio.play();
};

export default playAudioWord;
import { takeEvery, select } from 'redux-saga/effects';
import { handleKeyPress } from '../slices/typingSlice';
import { soundManager } from '../../utils/audio';

function* handleAudioFeedback() {
  const soundEnabled = yield select((state) => state.ui.soundEnabled);
  if (!soundEnabled) return;

  const lastPressedCorrect = yield select((state) => state.typing.lastPressedCorrect);
  if (lastPressedCorrect === true) {
    soundManager.playCorrect();
  } else if (lastPressedCorrect === false) {
    soundManager.playIncorrect();
  }
}

export function* audioSaga() {
  yield takeEvery(handleKeyPress.type, handleAudioFeedback);
}

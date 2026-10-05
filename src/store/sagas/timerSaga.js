import { take, put, call, race, select, delay } from 'redux-saga/effects';
import {
  handleKeyPress,
  tickTimer,
  pauseSession,
  resumeSession,
  resetSession,
  loadTargetText,
  setDuration,
} from '../slices/typingSlice';
import { openResultsModal } from '../slices/uiSlice';
import { soundManager } from '../../utils/audio';

function* runTimerWorker() {
  while (true) {
    yield delay(1000);
    yield put(tickTimer());

    const status = yield select((state) => state.typing.status);
    const soundEnabled = yield select((state) => state.ui.soundEnabled);

    if (status === 'completed') {
      if (soundEnabled) {
        soundManager.playCompletion();
      }
      yield put(openResultsModal());
      break;
    }
  }
}

export function* timerSaga() {
  while (true) {
    // Wait until typing starts (first keypress kicks off the session)
    yield take(handleKeyPress.type);

    let sessionActive = true;

    while (sessionActive) {
      const status = yield select((state) => state.typing.status);
      if (status !== 'running') {
        sessionActive = false;
        break;
      }

      // Race the timer loop against pause/reset
      const result = yield race({
        timer:  call(runTimerWorker),
        paused: take(pauseSession.type),
        reset:  take([resetSession.type, loadTargetText.type, setDuration.type]),
      });

      if (result.timer) {
        // Timer finished normally (session completed)
        sessionActive = false;
      } else if (result.reset) {
        // Hard reset — break entirely, wait for next keypress
        sessionActive = false;
      } else if (result.paused) {
        // Paused — wait for resume OR a reset before continuing
        const afterPause = yield race({
          resumed: take(resumeSession.type),
          reset:   take([resetSession.type, loadTargetText.type, setDuration.type]),
        });

        if (afterPause.reset) {
          // Reset while paused — go back to outer loop
          sessionActive = false;
        }
        // If resumed, the inner while loop continues and restarts the timer worker
      }
    }
  }
}

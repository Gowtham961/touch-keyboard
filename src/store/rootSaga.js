import { all, fork } from 'redux-saga/effects';
import { timerSaga } from './sagas/timerSaga';
import { lessonSaga } from './sagas/lessonSaga';
import { audioSaga } from './sagas/audioSaga';

export function* rootSaga() {
  yield all([
    fork(timerSaga),
    fork(lessonSaga),
    fork(audioSaga),
  ]);
}

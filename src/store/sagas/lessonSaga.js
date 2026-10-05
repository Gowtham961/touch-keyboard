import { takeLatest, put, delay, call, select } from 'redux-saga/effects';
import {
  fetchExternalLessonRequest,
  fetchExternalLessonSuccess,
  fetchExternalLessonFailure,
} from '../slices/lessonSlice';
import { loadTargetText } from '../slices/typingSlice';
import { generateDynamicBenchmarkText, HOME_ROW_WORDS } from '../../data/lessons';

// Simulated external API call for remote lesson drill packages
function fetchRemoteDrillData(topic) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (topic === 'cloud-words') {
        const text = [...HOME_ROW_WORDS, ...HOME_ROW_WORDS]
          .sort(() => 0.5 - Math.random())
          .slice(0, 30)
          .join(' ');
        resolve({
          id: 'cloud-words',
          title: 'Cloud Drill: Home Row Vocabulary',
          category: 'Remote Resource',
          isTimed: true,
          durationSeconds: 300,
          tag: 'Cloud Sync',
          description: 'Asynchronously fetched external drill package focusing on English home row dictionary combinations.',
          keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
          sampleText: text,
        });
      } else {
        const text = generateDynamicBenchmarkText(45);
        resolve({
          id: 'cloud-adaptive',
          title: 'Cloud Drill: Adaptive Home Row N-Grams',
          category: 'Remote Resource',
          isTimed: true,
          durationSeconds: 300,
          tag: 'Cloud Sync',
          description: 'Asynchronously fetched drill focusing on rapid finger roll transitions.',
          keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
          sampleText: text,
        });
      }
    }, 800); // 800ms simulated async network latency
  });
}

function* handleFetchExternalLesson(action) {
  try {
    const topic = action.payload?.topic || 'cloud-words';
    // Async call effect via Saga
    const lesson = yield call(fetchRemoteDrillData, topic);
    yield put(fetchExternalLessonSuccess(lesson));
    yield put(loadTargetText(lesson.sampleText));
  } catch (error) {
    yield put(fetchExternalLessonFailure(error.message || 'Failed to fetch external lesson'));
  }
}

export function* lessonSaga() {
  yield takeLatest(fetchExternalLessonRequest.type, handleFetchExternalLesson);
}

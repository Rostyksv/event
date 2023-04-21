import { all } from 'redux-saga/effects';
import eventsSagas from './events/saga';
export default function* rootSaga() {
    yield all([eventsSagas()]);
}

import { all, takeEvery, put, fork } from 'redux-saga/effects';
import actions from './actions';
import {EventsTypes} from "./action.types";
import axios from 'axios';
import {EventsState} from "../../components/table/types";
import {Response} from "./types";

export function* loadEvents() {
    yield takeEvery(EventsTypes.EVENTS_LOAD, function* () {

        const result: Response<EventsState> = yield axios.get(`${process.env.REACT_APP_API_URL}/events`);
        if (result.status === 200) {
            const {data} = result;

            yield all([
                put(
                    actions.loadEventsSuccess(data),
                ),
            ]);
        }
    });
}

export function* deleteEvent() {
    yield takeEvery(EventsTypes.EVENT_DELETE, function* ({payload}: any) {
        const result: Response<{id: number}> = yield axios.post(`${process.env.REACT_APP_API_URL}/events/${payload.type}`, {id: payload.id});
        if (result.status === 200) {
            const {data} = result;

            yield all([
                put(
                    actions.deleteEventSuccess({id: data.id, type: payload.type}),
                ),
            ]);
        }
    });
}

export default function* rootSaga() {
    yield all([fork(loadEvents), fork(deleteEvent)]);
}

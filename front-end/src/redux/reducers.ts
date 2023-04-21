import { combineReducers } from 'redux';
import {events} from "./events/reducer";

const rootReducer = combineReducers({
    events
});

export default rootReducer;

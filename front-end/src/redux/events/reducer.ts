
// ------------------------------
// Initial State
// ------------------------------
import {EventsTypes} from "./action.types";
import {EventInterface} from "../../components/table/types";

const initialState: { events: EventInterface[], loading: boolean } = {
    events: [],
    loading: true,
};

export const events = (state = initialState, action: any) => {
    switch (action.type) {
        case EventsTypes.EVENTS_LOAD:
            return { ...state, loading: true };
        case EventsTypes.EVENTS_LOAD_SUCCESS:
            return { ...state, loading: false, events: action.payload };
        case EventsTypes.EVENTS_LOAD_ERROR:
            return { ...state, loading: false, error: action.payload };
        case EventsTypes.EVENT_DELETE:
            return { ...state};
        case EventsTypes.EVENT_DELETE_SUCCESS:
            return { ...state, events: state.events.filter((ev) => ev.id !== action.payload.id)};
        case EventsTypes.EVENT_DELETE_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

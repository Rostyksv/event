import {EventsTypes} from "./action.types";
import {EventsState} from "../../components/table/types";

const actions = {
    loadEvents: () => ({
        type: EventsTypes.EVENTS_LOAD,
    }),
    loadEventsSuccess: (data: EventsState) => ({
        type: EventsTypes.EVENTS_LOAD_SUCCESS,
        payload: data,
    }),
    loadEventsError: (data: any)=> ({
        type: EventsTypes.EVENTS_LOAD_SUCCESS,
        payload: data,
    }),

    deleteEvent: (data: any) => ({
        type: EventsTypes.EVENT_DELETE,
        payload: data,
    }),
    deleteEventSuccess: (data: { id: number, type: string }) => ({
        type: EventsTypes.EVENT_DELETE_SUCCESS,
        payload: data,
    }),
    deleteEventError: (data: any): any => ({
        type: EventsTypes.EVENT_DELETE_ERROR,
        payload: data,
    }),

};
export default actions;

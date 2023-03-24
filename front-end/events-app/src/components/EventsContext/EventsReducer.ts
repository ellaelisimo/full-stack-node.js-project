import { TEventsAction, TEventsState } from "./types";

export const eventsReducer = (state: TEventsState, action: TEventsAction) => {
  // switch (action.type) {
  //   case "FETCH_EVENTS": {
  //     return {
  //       ...state,
  //       events: action.payload,
  //       loading: false,
  //     };
  //   }
  //   case "FETCH_EVENTS_ERROR":
  //     return {
  //       ...state,
  //       error: action.payload,
  //       loading: false,
  //     };
  //   case "ADD_EVENT":
  //     return {
  //       ...state,
  //       events: [...state.events, action.payload],
  //     };
  //   case "DELETE_EVENT":
  //     return {
  //       ...state,
  //       events: state.events.filter((event) => event.id !== action.payload),
  //     };
  //   case "SET_LOADING":
  //     return {
  //       ...state,
  //       loading: true,
  //     };
  //   default:
  //     return state;
  // }
};

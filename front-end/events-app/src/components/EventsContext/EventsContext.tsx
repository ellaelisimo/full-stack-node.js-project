import { createContext } from "react";
import { TEventsContext } from "./types";

const INITIAL_EVENTS_CONTEXT = {
  fetchedEvents: [],
  dispatch: () => {},
} as const;

export const EventsContext = createContext<TEventsContext>(
  INITIAL_EVENTS_CONTEXT
);

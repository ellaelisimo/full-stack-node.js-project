import { Dispatch } from "react";

export type TEvent = {
  id: number;
  name: string;
  date_starts: string;
  date_ends: string;
  //description: string; reik pridet i db, jei nuspresiu daryt
};

export type TEventsContext = {
  fetchedEvents: Readonly<TEvent[]>;
  dispatch: React.Dispatch<TEventsAction>;
};

export type TEventsAction = {
  type: string;
  payload: TEvent[];
};

export type TEventsState = {
  fetchedEvents: Readonly<TEvent[]>;
};

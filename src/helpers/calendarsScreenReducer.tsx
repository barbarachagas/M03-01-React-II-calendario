import { ICalendar, IEditingEvent, IEvent } from "../app/backend";

export interface ICalendarScreenState {
  calendars: ICalendar[];
  calendarsSelected: boolean[];
  events: IEvent[];
  editingEvent: IEditingEvent | null;
}

export type ICalendarScreenAction =
  | {
      type: "load";
      payload: { events: IEvent[]; calendars?: ICalendar[] };
    }
  | {
      type: "edit";
      payload: IEvent;
    }
  | {
      type: "new";
      payload: string;
    }
  | {
      type: "closeDialog";
    }
  | {
      type: "toggleCalendar";
      payload: number;
    };

export function reducer(
  state: ICalendarScreenState,
  action: ICalendarScreenAction
) {
  switch (action.type) {
    case "load":
      const calendars = action.payload.calendars ?? state.calendars;
      const calendarsSelected = action.payload.calendars
        ? action.payload.calendars.map(() => true)
        : state.calendarsSelected;
      return {
        ...state,
        events: action.payload.events,
        calendars,
        calendarsSelected,
      };
    case "edit":
      return { ...state, editingEvent: action.payload };
    case "new": {
      return {
        ...state,
        editingEvent: {
          date: action.payload,
          desc: "",
          calendarId: state.calendars[0].id,
        },
      };
    }
    case "closeDialog":
      return { ...state, editingEvent: null };
    case "toggleCalendar":
      const calendarSelected = [...state.calendarsSelected];
      calendarSelected[action.payload] = !calendarSelected[action.payload];
      return { ...state, calendarSelected };

    default:
      return state;
  }
}

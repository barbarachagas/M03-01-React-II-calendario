export interface ICalendar {
  id: number;
  name: string;
  color: string;
}
export interface IEditingEvent {
  id?: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

export interface IEvent extends IEditingEvent {
  id: number;
}

export interface IUser {
  name: string;
  email: string;
}

export function getCalendarsEndpoint(): Promise<ICalendar[]> {
  return fetch("http://localhost:3002/calendars", {
    credentials: "include",
  }).then(handleResponse);
}

export function getEventsEndpoint(from: string, to: string): Promise<IEvent[]> {
  return fetch(
    `http://localhost:3002/events?date_gte=${from}&date_lte=${to}&_sort=date,time`,
    { credentials: "include" }
  ).then(handleResponse);
}

export function createEventEndpoint(event: IEditingEvent): Promise<IEvent> {
  return fetch(`http://localhost:3002/events`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  }).then(handleResponse);
}

export function updateEventEndpoint(event: IEditingEvent): Promise<IEvent> {
  return fetch(`http://localhost:3002/events/${event.id}`, {
    credentials: "include",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  }).then(handleResponse);
}

export function deleteEventEndpoint(eventId: number): Promise<void> {
  return fetch(`http://localhost:3002/events/${eventId}`, {
    method: "DELETE",
    credentials: "include",
  }).then(handleResponse);
}

export function getUserEndpoint(): Promise<IUser> {
  return fetch(`http://localhost:3002/auth/user`, {
    credentials: "include",
  }).then(handleResponse);
}

export function singInEndpoint(
  email: string,
  password: string
): Promise<IUser> {
  return fetch(`http://localhost:3002/auth/login`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
}

export function singOutEndpoint(): Promise<IUser> {
  return fetch(`http://localhost:3002/auth/logout`, {
    credentials: "include",
    method: "POST",
  }).then(handleResponse);
}

function handleResponse(resp: Response) {
  if (resp.ok) {
    return resp.json();
  } else {
    throw new Error(resp.statusText);
  }
}

import { Box, Checkbox, FormControlLabel } from "@material-ui/core";
import React from "react";
import { ICalendar } from "../app/backend";
import { ICalendarScreenAction } from "../helpers/calendarsScreenReducer";

interface ICalendarViewProps {
  calendars: ICalendar[];
  calendarsSelected: boolean[];
  dispatch: React.Dispatch<ICalendarScreenAction>;
}
export const CalendarsView = React.memo(function CalendarsView(
  props: ICalendarViewProps
) {
  const { calendars, calendarsSelected } = props;
  return (
    <Box marginTop="64px">
      <h2>Agendas</h2>
      {calendars.map((calendar, i) => (
        <FormControlLabel
          key={calendar.id}
          control={
            <Checkbox
              style={{ color: calendar.color }}
              checked={calendarsSelected[i]}
              onChange={() =>
                props.dispatch({ type: "toggleCalendar", payload: i })
              }
            />
          }
          label={calendar.name}
        />
      ))}
    </Box>
  );
});

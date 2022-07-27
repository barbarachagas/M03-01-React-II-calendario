import { Box, Checkbox, FormControlLabel } from "@material-ui/core";
import React from "react";

import { ICalendar } from "../app/backend";

interface ICalendarViewProps {
  calendars: ICalendar[];
  toggleCalendar: (i: number) => void;
  calendarsSelected: boolean[];
}
export const CalendarsView = React.memo(function CalendarsView(
  props: ICalendarViewProps
) {
  const { calendars, calendarsSelected, toggleCalendar } = props;
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
              onChange={() => toggleCalendar(i)}
            />
          }
          label={calendar.name}
        />
      ))}
    </Box>
  );
});

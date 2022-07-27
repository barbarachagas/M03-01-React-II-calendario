import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { createEventEndpoint, ICalendar, IEditingEvent } from "../app/backend";

interface IEventFormDialogProps {
  event: IEditingEvent | null;
  calendars: ICalendar[];
  onCancel: () => void;
  onSave: () => void;
}

export default function EventFormDialog(props: IEventFormDialogProps) {
  const [event, setEvent] = useState<IEditingEvent | null>(props.event);

  useEffect(() => {
    setEvent(props.event);
  }, [props.event]);

  function save(evt: React.FormEvent) {
    evt.preventDefault();
    if (event) {
      createEventEndpoint(event).then(props.onSave);
    }
  }

  return (
    <div>
      <Dialog
        open={!!event}
        onClose={props.onCancel}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={save}>
          <DialogTitle id="form-dialog-title">Criar evento</DialogTitle>
          <DialogContent>
            {event && (
              <>
                <TextField
                  type="date"
                  margin="normal"
                  label="Data"
                  fullWidth
                  value={event.date}
                  onChange={(evt) =>
                    setEvent({ ...event, date: evt.target.value })
                  }
                />
                <TextField
                  autoFocus
                  margin="normal"
                  label="Descrição"
                  fullWidth
                  value={event.desc}
                  onChange={(evt) =>
                    setEvent({ ...event, desc: evt.target.value })
                  }
                />
                <TextField
                  type="time"
                  margin="normal"
                  label="Hora"
                  fullWidth
                  value={event.time ?? ""}
                  onChange={(evt) =>
                    setEvent({ ...event, time: evt.target.value })
                  }
                />
                <FormControl margin="normal" fullWidth>
                  <InputLabel id="select-calendar">Agendas</InputLabel>
                  <Select
                    labelId="select-calendar"
                    value={event.calendarId}
                    onChange={(evt) =>
                      setEvent({
                        ...event,
                        calendarId: evt.target.value as number,
                      })
                    }
                  >
                    {props.calendars.map((calendar) => (
                      <MenuItem value={calendar.id} key={calendar.id}>
                        {calendar.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={props.onCancel}>
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Salvar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

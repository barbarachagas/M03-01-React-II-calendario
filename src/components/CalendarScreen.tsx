import {
  Avatar,
  Box,
  Checkbox,
  FormControlLabel,
  Icon,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

const DAYS_OF_WEEK = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
  table: {
    minHeight: "100%",
    "& td ~ td, & th ~ th": {
      borderLeft: "1px solid rgb(224, 224, 224)",
    },
  },
});

export default function CalendarScreen() {
  const classes = useStyles();

  return (
    <Box display="flex" height="100%" alignItems="stretch">
      <Box
        borderRight="1px solid rgb(224, 224, 224)"
        width="16em"
        padding="8px 16px"
      >
        <h2>Agenda React</h2>
        <Button variant="contained" color="primary">
          Novo Evento
        </Button>

        <Box marginTop="64px">
          <h2>Agendas</h2>
          <FormControlLabel
            control={<Checkbox name="checkedA" />}
            label="Pessoal"
          />
          <FormControlLabel
            control={<Checkbox name="checkedA" />}
            label="Trabalho"
          />
        </Box>
      </Box>
      <TableContainer className={classes.root} component={"div"}>
        <Box display="flex" alignItems="center" padding="8px 16px">
          <Box>
            <IconButton aria-label="Mês anterior">
              <Icon>chevron_left</Icon>
            </IconButton>
            <IconButton aria-label="Próximo mês">
              <Icon>chevron_right</Icon>
            </IconButton>
          </Box>
          <Box flex={1} marginLeft="16px" component="h3">
            <strong>Junho de 2021</strong>
          </Box>
          <Avatar></Avatar>
        </Box>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {DAYS_OF_WEEK.map((day) => (
                <TableCell align="center">{day}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="right">x</TableCell>
              <TableCell align="right">x</TableCell>
              <TableCell align="right">x</TableCell>
              <TableCell align="right">x</TableCell>
              <TableCell align="right">x</TableCell>
              <TableCell align="right">x</TableCell>
              <TableCell align="right">x</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

import { Avatar, Box, Icon, IconButton } from "@material-ui/core";
import { addMonths, formatMonth } from "../helpers/dateFunctions";
import { Link } from "react-router-dom";

interface ICalendarHeaderProps {
  month: string;
}

export default function CalendarHeader(props: ICalendarHeaderProps) {
  const { month } = props;

  return (
    <Box display="flex" alignItems="center" padding="8px 16px">
      <Box>
        <IconButton
          aria-label="Mês anterior"
          component={Link}
          to={"/calendar/" + addMonths(month, -1)}
        >
          <Icon>chevron_left</Icon>
        </IconButton>
        <IconButton
          aria-label="Próximo mês"
          component={Link}
          to={"/calendar/" + addMonths(month, 1)}
        >
          <Icon>chevron_right</Icon>
        </IconButton>
      </Box>
      <Box flex={1} marginLeft="16px" component="h3">
        <strong>{formatMonth(month)}</strong>
      </Box>
      <Avatar></Avatar>
    </Box>
  );
}

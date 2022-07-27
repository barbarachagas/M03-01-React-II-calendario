import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { IUser, singOutEndpoint } from "../app/backend";

interface IUserMenu {
  onSingOut: () => void;
  user: IUser;
}

const useStyles = makeStyles({
  userDetails: {
    borderBottom: "1px solid rgb(224, 224, 224)",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    marginBottom: "8px",
    alignItems: "center",
    padding: "16px",
    "& > *": {
      marginBottom: "8px",
    },
  },
});

export default function UserMenu(props: IUserMenu) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function singOut() {
    singOutEndpoint();
    props.onSingOut;
  }

  return (
    <div>
      <IconButton onClick={handleClick}>
        <Avatar></Avatar>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box className={classes.userDetails}>
          <Avatar></Avatar>
          <div>{props.user.name}</div>
          <small>{props.user.email}</small>
        </Box>
        <MenuItem onClick={props.onSingOut}>Sair</MenuItem>
      </Menu>
    </div>
  );
}

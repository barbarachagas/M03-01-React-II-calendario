import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { singOutEndpoint } from "../app/backend";
import { useAuthContext } from "../helpers/authContext";

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

export default function UserMenu() {
  const { user, onSingOut } = useAuthContext();

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
          <div>{user.name}</div>
          <small>{user.email}</small>
        </Box>
        <MenuItem onClick={singOut}>Sair</MenuItem>
      </Menu>
    </div>
  );
}

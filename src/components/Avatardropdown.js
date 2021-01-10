import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core";
import { AuthContext } from "../context/AuthContext";

const options = ["Logout"];

const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
  svg: {
    fill: theme.palette.background.default,
  },
  button: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  logout: {
    color: theme.palette.secondary.main,
    marginRight: ".5rem",
  },
  label: {
    color: theme.palette.secondary.main,
    "&:hover": {
      textDecoration: "none",
    },
  },
}));

export default function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const preventDefault = (event) => event.preventDefault();
  const classes = useStyles();
  const authContext = useContext(AuthContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon className={classes.svg} />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={handleClose}
          >
            <IconButton className={classes.button}>
              <ExitToAppIcon className={classes.logout} />
              <Link
                onClick={preventDefault}
                color="inherit"
                className={classes.label}
                onClick={authContext.logout}
              >
                {options}
              </Link>
            </IconButton>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

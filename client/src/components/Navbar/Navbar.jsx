import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import GarageIcon from "@mui/icons-material/Garage";
import React from "react";
import { Stack } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { isObjEmpty } from "../../utils/isObjEmpty";
import { logoutUser } from "../../api/authApi";
import Swal from "sweetalert2";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const linkStyle = { color: "inherit", textDecoration: "none" };

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/" style={linkStyle}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <GarageIcon />
          </IconButton>
        </Link>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Nirav's Garage
        </Typography>
        <Stack direction="row" spacing={2}>
          <Link to="/appointment" style={linkStyle}>
            <Button color="inherit">Appointment</Button>
          </Link>
          <Link to="/garage" style={linkStyle}>
            <Button color="inherit">Garage</Button>
          </Link>
          <Link to="/report" style={linkStyle}>
            <Button color="inherit">Report</Button>
          </Link>
          <Link to="/about" style={linkStyle}>
            <Button color="inherit">About</Button>
          </Link>
          {!isObjEmpty(auth.loggedInUser) ? (
            <Button
              color="inherit"
              onClick={async () => {
                await dispatch(logoutUser());
                Swal.fire(
                  "SUCCESS!",
                  "User Logged Out Successfully!",
                  "success"
                );
                navigate("/");
              }}
            >
              logout
            </Button>
          ) : (
            <Link to="/signup" style={linkStyle}>
              <Button color="inherit">signup</Button>
            </Link>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

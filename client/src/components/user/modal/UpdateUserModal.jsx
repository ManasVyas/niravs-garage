import { Autocomplete, Button, TextField } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../api/authApi";
import Swal from "sweetalert2";

export const UpdateUserModal = ({
  open,
  handleClose,
  _id,
  email,
  role = ``,
  number,
}) => {
  const isMobile = useMediaQuery("(min-width:768px)");
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let updatedUser = {};
    if (password) {
      updatedUser = {
        _id,
        userName: email,
        password: data.get("password"),
        role: data.get("role"),
        contactNumber: data.get("contactNumber"),
      };
    } else {
      updatedUser = {
        _id,
        userName: email,
        role: data.get("role"),
        contactNumber: data.get("contactNumber"),
      };
    }
    const response = await dispatch(updateUser(updatedUser));
    if (response.payload) {
      Swal.fire("SUCCESS!", "User Updated Successfully!", "success");
    } else {
      Swal.fire("ERROR!", "Update Unsuccessful. Please Try Again!", "error");
    }
    handleClose();
  };

  const roles = [
    {
      label: "admin",
      value: "admin",
    },
    {
      label: "customer",
      value: "customer",
    },
  ];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "auto" : "70%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" component="div">
            Update User
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              value={email}
              disabled
            />
            <TextField
              margin="normal"
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              autoFocus
            />
            <Autocomplete
              margin="normal"
              fullWidth
              id="role"
              disablePortal
              options={roles}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  fullWidth
                  id="role"
                  label="Role"
                  name="role"
                  autoComplete="role"
                />
              )}
              defaultValue={role}
            />
            <TextField
              margin="normal"
              fullWidth
              id="contactNumber"
              label="Contact Number"
              name="contactNumber"
              autoComplete="contactNumber"
              type="number"
              defaultValue={number}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mb: 0.5 }}
            >
              update
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="error"
              onClick={handleClose}
            >
              cancel
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

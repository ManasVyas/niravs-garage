import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { fetchUsers, updateUser } from "../../../api/userApi";

export const UpdateUserModal = ({ handleClose, open, user }) => {
  const isMobile = useMediaQuery("(min-width:768px)");
  const dispatch = useDispatch();
  useEffect(() => {}, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const updatedUser = await updateUser({
      _id: user._id,
      userName: user.userName,
      role: data.get("role"),
      contactNumber: user.contactNumber,
    });
    if (updatedUser.success) {
      const response = await dispatch(fetchUsers());
      if (response.payload) {
        Swal.fire("SUCCESS!", "User Updated Successfully!", "success");
      } else {
        Swal.fire(
          "ERROR!",
          "Unable to Update User. Please Try Again!",
          "error"
        );
      }
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
    {
      label: "mechanic",
      value: "mechanic",
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
              value={user.userName}
              disabled
            />
            <Autocomplete
              margin="normal"
              fullWidth
              id="role"
              disablePortal
              options={roles}
              defaultValue={{ label: user.role, value: user.role }}
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

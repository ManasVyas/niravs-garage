import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { getAllServices, updateService } from "../../../api/serviceApi";

export const UpdateServiceModal = ({ handleClose, open, service }) => {
  const isMobile = useMediaQuery("(min-width:768px)");
  const dispatch = useDispatch();
  useEffect(() => {}, [service]);
  const [file, setFile] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = new FormData();
    if (file.length > 0) {
      formData.append("file", file[0]);
    }
    formData.append("_id", service._id);
    formData.append("name", data.get("name"));
    formData.append("description", data.get("description"));
    formData.append("cost", data.get("cost"));
    const updatedService = await updateService(formData);
    if (updatedService.success) {
      const response = await dispatch(getAllServices());
      if (response.payload) {
        setFile([]);
        Swal.fire("SUCCESS!", "Service Updated Successfully!", "success");
      } else {
        Swal.fire(
          "ERROR!",
          "Unable to Update Service. Please Try Again!",
          "error"
        );
      }
    }
    handleClose();
  };

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
            Update Service
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              type="text"
              defaultValue={service.name}
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="description"
              label="Description"
              name="description"
              type="text"
              autoComplete="description"
              defaultValue={service.description}
            />
            <TextField
              margin="normal"
              fullWidth
              id="cost"
              label="Cost"
              name="cost"
              type="number"
              autoComplete="cost"
              defaultValue={service.cost}
            />
            <input
              margin="normal"
              fullWidth
              id="file"
              label="Image"
              name="file"
              autoComplete="file"
              type="file"
              onChange={(e) => setFile([...file, e.target.files[0]])}
              style={{ marginBottom: "4px" }}
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

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
import { getAllItems, updateItem } from "../../../api/itemApi";

export const UpdateItemModal = ({ handleClose, open, item }) => {
  const isMobile = useMediaQuery("(min-width:768px)");
  const dispatch = useDispatch();
  useEffect(() => {}, [item]);
  const [file, setFile] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = new FormData();
    if (file.length > 0) {
      formData.append("file", file[0]);
    }
    formData.append("_id", item._id);
    formData.append("name", data.get("name"));
    formData.append("description", data.get("description"));
    formData.append("cost", data.get("cost"));
    formData.append("quantity", data.get("quantity"));
    formData.append("sold", data.get("sold"));
    const updatedItem = await updateItem(formData);
    if (updatedItem.success) {
      const response = await dispatch(getAllItems());
      if (response.payload) {
        setFile([]);
        Swal.fire("SUCCESS!", "Item Updated Successfully!", "success");
      } else {
        Swal.fire(
          "ERROR!",
          "Unable to Update Item. Please Try Again!",
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
            Update Item
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
              defaultValue={item.name}
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="description"
              label="description"
              name="description"
              type="text"
              autoComplete="description"
              defaultValue={item.description}
            />
            <TextField
              margin="normal"
              fullWidth
              id="cost"
              label="Cost"
              name="cost"
              type="number"
              autoComplete="cost"
              defaultValue={item.cost}
            />
            <TextField
              margin="normal"
              fullWidth
              id="quantity"
              label="Quantity"
              name="quantity"
              type="number"
              autoComplete="quantity"
              defaultValue={item.quantity}
            />
            <TextField
              margin="normal"
              fullWidth
              id="sold"
              label="Sold"
              name="sold"
              type="number"
              autoComplete="sold"
              defaultValue={item.sold}
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

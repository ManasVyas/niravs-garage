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
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { createCarForSell, getAllCarsForSell } from "../../../api/carForSellApi";

export const AddCarForSellModal = ({ handleClose, open }) => {
  const isMobile = useMediaQuery("(min-width:768px)");
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [registration, setRegistration] = useState();
  const [cost, setCost] = useState();
  const [quantity, setQuantity] = useState();
  const [sold, setSold] = useState();
  const [file, setFile] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("name", name);
    formData.append("registration", registration);
    formData.append("cost", cost);
    formData.append("quantity", quantity);
    formData.append("sold", sold);
    const carForSell = await createCarForSell(formData);
    if (carForSell.success) {
      const response = await dispatch(getAllCarsForSell());
      if (response.payload) {
        setName(``);
        setFile([]);
        setRegistration(``);
        setCost(0);
        setQuantity(0);
        setSold(0);
        Swal.fire("SUCCESS!", "Car Added Successfully!", "success");
      } else {
        Swal.fire("ERROR!", "Unable to Add Car. Please Try Again!", "error");
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
            Add Car
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="registration"
              label="Registration"
              name="registration"
              type="text"
              autoComplete="registration"
              value={registration}
              onChange={(e) => setRegistration(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="cost"
              label="Cost"
              name="cost"
              type="number"
              autoComplete="cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="quantity"
              label="quantity"
              name="Quantity"
              type="number"
              autoComplete="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="sold"
              label="Sold"
              name="sold"
              type="number"
              autoComplete="sold"
              value={sold}
              onChange={(e) => setSold(e.target.value)}
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
              add
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

import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarsByUserId } from "../../../api/carApi";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  createAppointment,
  getAppointmentsByUserId,
} from "../../../api/appointmentApi";
import Swal from "sweetalert2";

const AddAppointmentModal = ({
  open,
  handleClose,
  services,
  setServices,
  setServiceIds,
}) => {
  const isMobile = useMediaQuery("(min-width:768px)");
  const { auth, car } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { _id, contactNumber } = auth.loggedInUser;

  useEffect(() => {
    dispatch(getCarsByUserId(_id));
  }, [services]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let description = ``;
    for (let i = 0; i < services.length; i++) {
      description += `${services[i].name}${
        i === services.length - 1 ? "" : ", "
      }`;
    }
    const appointment = await createAppointment({
      date: data.get("date"),
      userId: _id,
      contactNumber,
      carId: data.get("car"),
      status: "pending",
      description,
      cost: payable,
    });
    if (appointment.success) {
      const response = await dispatch(getAppointmentsByUserId(_id));
      if (response.payload) {
        Swal.fire("SUCCESS!", "Appointment Created Successfully!", "success");
        setServices([]);
        setServiceIds([]);
        handleClose();
      } else {
        Swal.fire(
          "ERROR!",
          "Unable to Create Appointment. Please Try Again!",
          "error"
        );
      }
    }
  };

  const cars = car.cars.map((car) => {
    return { label: `${car.name} (${car.registration})`, value: car._id };
  });

  let payable = 0;
  services.forEach((service) => (payable += service.cost));

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
            Add Appointment
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <input type="date" id="date" name="date" required />
            <Autocomplete
              margin="normal"
              fullWidth
              id="vehicle"
              disablePortal
              options={cars}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  fullWidth
                  id="car"
                  label="Car"
                  name="car"
                  autoComplete="car"
                  required
                />
              )}
              required
            />
            {services.map((service) => (
              <Stack
                width="100%"
                height="100%"
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                key={service._id}
              >
                <Typography variant="body" color="text.Primary">
                  {service.name}
                </Typography>
                <Typography variant="body" color="text.Primary">
                  {`$ ${service.cost}`}
                </Typography>
              </Stack>
            ))}
            <Stack
              width="100%"
              height="100%"
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: "4px" }}
            >
              <Typography variant="body" color="text.Primary">
                Total Payable
              </Typography>
              <Typography variant="body" color="text.Primary">
                {`$ ${payable}`}
              </Typography>
            </Stack>
            {/* <PayPalScriptProvider
              options={{
                "client-id":
                  "ATrJcboBn8xIWc6goKiyEhfVcBh77YiO3IuOUoDLINy0CoqfUN2IIYOlCE9OZskbfT00z2a1aF280-l7",
              }}
            >
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: { value: payable },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then(function (details) {
                    // dispatch create appointment
                  });
                }}
              />
            </PayPalScriptProvider> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mb: 0.5 }}
            >
              create
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

export default AddAppointmentModal;

import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";
import { createOrder } from "../../api/orderApi";

export const OrderCarsModal = ({
  open,
  handleClose,
  cars,
  setCars,
  setCarIds,
}) => {
  const isMobile = useMediaQuery("(min-width:768px)");
  const { auth, car } = useSelector((state) => state);
  const { _id, userName } = auth.loggedInUser;

  useEffect(() => {}, [car]);

  let payable = 0;
  cars.forEach((car) => (payable += car.cost));

  const handleSubmit = async (event) => {
    event.preventDefault();
    let productId = ``;
    let productName = ``;
    for (let i = 0; i < cars.length; i++) {
      productId += `${cars[i]._id}${i === cars.length - 1 ? "" : ", "}`;
      productName += `${cars[i].name}${i === cars.length - 1 ? "" : ", "}`;
    }

    const order = await createOrder({
      userId: _id,
      username: userName,
      productId,
      productName,
      price: payable,
    });
    if (order.success) {
      Swal.fire("SUCCESS!", "Order Created Successfully!", "success");
      setCars([]);
      setCarIds([]);
      handleClose();
    } else {
      Swal.fire("ERROR!", "Unable to Create Order. Please Try Again!", "error");
    }
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
            Order Cars
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {cars.map((car) => (
              <Stack
                width="100%"
                height="100%"
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                key={car._id}
              >
                <Typography variant="body" color="text.Primary">
                  {car.name}
                </Typography>
                <Typography variant="body" color="text.Primary">
                  {`$ ${car.cost}`}
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
                        // dispatch order items
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
              order
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

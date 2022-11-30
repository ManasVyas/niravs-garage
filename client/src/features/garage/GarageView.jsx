import {
  Box,
  Button,
  Card as MuiCard,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  getAllAppointments,
  updateAppointment,
} from "../../api/appointmentApi";

export const GarageView = () => {
  const { auth, appointment } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllAppointments());
  }, []);

  const handleChange = async (
    _id,
    date,
    userId,
    carId,
    status,
    description,
    cost,
    contactNumber
  ) => {
    const appointment = await updateAppointment({
      _id,
      date,
      userId,
      carId,
      mechanic: auth.loggedInUser._id,
      status: status === "pending" ? "in progress" : "completed",
      description,
      cost,
      contactNumber,
    });
    if (appointment.success) {
      const response = await dispatch(getAllAppointments());
      if (response.payload) {
        Swal.fire("SUCCESS!", "Status Updated Successfully!", "success");
      } else {
        Swal.fire(
          "ERROR!",
          "Unable to Update Status. Please Try Again!",
          "error"
        );
      }
    }
  };

  return (
    <Stack width="100%" height="100%" alignItems="center" gap={1}>
      <Stack width="100%" height="100%" alignItems="center" gap={1}>
        <Stack
          width="100%"
          height="100%"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box w="100%" h="100%" />
          <Typography variant="h4" color="text.Primary">
            Appointments
          </Typography>
          <Box w="100%" h="100%" />
        </Stack>
        {appointment.loading ? (
          <Box>Loading...</Box>
        ) : (
          <Stack
            sx={{ flexWrap: "wrap", margin: "2px" }}
            direction="column"
            spacing={0}
          >
            {appointment.appointments.map(
              ({
                _id,
                date,
                userId,
                carId,
                status,
                description,
                cost,
                contactNumber,
              }) => (
                <MuiCard
                  key={_id}
                  sx={{
                    bgcolor: "text.disabled",
                    minW: "210px",
                    margin: "4px",
                  }}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {carId}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {contactNumber}
                    </Typography>
                    <Typography variant="body" color="text.secondary">
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Typography>
                  </CardContent>
                  {status !== "completed" && (
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() =>
                          handleChange(
                            _id,
                            date,
                            userId,
                            carId,
                            status,
                            description,
                            cost,
                            contactNumber
                          )
                        }
                      >
                        change status
                      </Button>
                    </CardActions>
                  )}
                </MuiCard>
              )
            )}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

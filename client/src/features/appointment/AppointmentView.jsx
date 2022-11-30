import {
  Badge,
  Box,
  Button,
  Card as MuiCard,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../../api/serviceApi";
import EventIcon from "@mui/icons-material/Event";
import config from "../../api/config.json";
import AddAppointmentModal from "./modal/AddAppointmentModal";
import { getAppointmentsByUserId } from "../../api/appointmentApi";

export const AppointmentView = () => {
  const { service, auth, appointment } = useSelector((state) => state);
  const [serviceIds, setServiceIds] = useState([]);
  const [services, setServices] = useState([]);
  const [openAddAppointment, setOpenAddAppointment] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllServices());
    dispatch(getAppointmentsByUserId(auth.loggedInUser._id));
  }, []);

  const handleAddAppointmentOpen = () => setOpenAddAppointment(true);
  const handleAddAppointmentClose = () => setOpenAddAppointment(false);

  return (
    <>
      <AddAppointmentModal
        open={openAddAppointment}
        handleClose={handleAddAppointmentClose}
        services={services}
        setServices={setServices}
        setServiceIds={setServiceIds}
      />
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
                ({ _id, carId, date, description, cost, status }) => (
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
                        {`${description} (${
                          status.charAt(0).toUpperCase() + status.slice(1)
                        })`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`$ ${cost}`}
                      </Typography>
                    </CardContent>
                  </MuiCard>
                )
              )}
            </Stack>
          )}
        </Stack>
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
              Services
            </Typography>
            <Badge
              badgeContent={serviceIds.length}
              color="primary"
              sx={{ mt: "12px", mr: "12px" }}
            >
              <EventIcon
                fontSize="large"
                sx={{ ":hover": { cursor: "pointer" } }}
                onClick={
                  serviceIds.length ? handleAddAppointmentOpen : undefined
                }
              />
            </Badge>
          </Stack>
          {service.loading ? (
            <Box>Loading...</Box>
          ) : (
            <Stack
              sx={{ flexWrap: "wrap", margin: "2px" }}
              direction={{ xs: "column", sm: "row" }}
              spacing={0}
            >
              {service.services.map(
                ({ _id, image, name, description, cost }) => (
                  <MuiCard
                    key={_id}
                    sx={{
                      bgcolor: "text.disabled",
                      minWidth: "210px",
                      margin: "4px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={`${config.Backend_URL}${image}`}
                      alt="service"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`$ ${cost}`}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => {
                          setServiceIds((prevState) =>
                            serviceIds.includes(_id)
                              ? prevState.filter((id) => id !== _id)
                              : [...prevState, _id]
                          );
                          setServices((prevState) =>
                            serviceIds.includes(_id)
                              ? prevState.filter(
                                  (service) => service._id !== _id
                                )
                              : [...prevState, { _id, name, description, cost }]
                          );
                        }}
                      >
                        {serviceIds.includes(_id) ? "remove" : "add"}
                      </Button>
                    </CardActions>
                  </MuiCard>
                )
              )}
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
};

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card as MuiCard,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCar, getCarsByUserId } from "../../api/carApi";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { UpdateUserModal } from "./modal/UpdateUserModal";
import { AddCarModal } from "../car/modal/AddCarModal";
import { UpdateCarModal } from "../car/modal/UpdateCarModal";
import Swal from "sweetalert2";

export const Profile = () => {
  const dispatch = useDispatch();
  const { auth, car } = useSelector((state) => state);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [openAddCar, setOpenAddCar] = useState(false);
  const [openUpdateCar, setOpenUpdateCar] = useState(false);
  const [selectedCar, setSelectedCar] = useState({
    _id: 0,
  });
  const { _id, userName, role, contactNumber } = auth.loggedInUser;

  useEffect(() => {
    dispatch(getCarsByUserId(_id));
  }, []);

  const handleUpdateUserOpen = () => setOpenUpdateUser(true);
  const handleUpdateUserClose = () => setOpenUpdateUser(false);

  const handleAddCarOpen = () => setOpenAddCar(true);
  const handleAddCarClose = () => setOpenAddCar(false);

  const handleUpdateCarOpen = () => setOpenUpdateCar(true);
  const handleUpdateCarClose = () => setOpenUpdateCar(false);

  return (
    <>
      <UpdateUserModal
        open={openUpdateUser}
        handleClose={handleUpdateUserClose}
        _id={_id}
        email={userName}
        role={role}
        number={contactNumber}
      />
      <AddCarModal
        open={openAddCar}
        handleClose={handleAddCarClose}
        _id={_id}
      />
      <UpdateCarModal
        open={openUpdateCar}
        handleClose={handleUpdateCarClose}
        _id={_id}
        carId={selectedCar._id}
      />
      <Stack width="100%" height="100%" alignItems="center" gap={1}>
        <Stack width="100%" height="100%" alignItems="center" gap={1}>
          <Typography variant="h4" color="text.Primary">
            User
          </Typography>
          <MuiCard sx={{ bgcolor: "text.disabled" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {userName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {role}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {contactNumber}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={handleUpdateUserOpen}>
                update
              </Button>
            </CardActions>
          </MuiCard>
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
              Vehicles
            </Typography>
            <AddCircleIcon
              fontSize="large"
              sx={{ ":hover": { cursor: "pointer" } }}
              onClick={handleAddCarOpen}
            />
          </Stack>
          {car.loading ? (
            <Box>Loading...</Box>
          ) : (
            <Stack
              sx={{ flexWrap: "wrap", margin: "2px" }}
              direction={{ xs: "column", sm: "row" }}
              spacing={0}
            >
              {car.cars.map((car) => (
                <MuiCard
                  key={car._id}
                  sx={{
                    bgcolor: "text.disabled",
                    minWidth: "210px",
                    margin: "4px",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={`http://localhost:5000/${car.image}`}
                    alt="car"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {car.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {car.registration}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" />
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        setSelectedCar({
                          _id: car._id,
                        });
                        handleUpdateCarOpen();
                      }}
                    >
                      update
                    </Button>
                    <Button
                      size="small"
                      onClick={async () => {
                        const carId = car._id;
                        const response = await dispatch(deleteCar(carId));
                        if (response.payload) {
                          const updatedData = await dispatch(
                            getCarsByUserId(_id)
                          );
                          if (updatedData.payload) {
                            Swal.fire(
                              "SUCCESS!",
                              "Car Deleted Successfully!",
                              "success"
                            );
                          } else {
                            Swal.fire(
                              "ERROR!",
                              "Unable to Delete Car. Please Try Again!",
                              "error"
                            );
                          }
                        }
                      }}
                    >
                      delete
                    </Button>
                  </CardActions>
                </MuiCard>
              ))}
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
};

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
import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import config from "../../api/config.json";
import Swal from "sweetalert2";
import { deleteCarForSell, getAllCarsForSell } from "../../api/carForSellApi";
import { AddCarForSellModal } from "./modal/AddCarForSellModal";
import { UpdateCarForSellModal } from "./modal/UpdateCarForSellModal";

export const ManageCarForSell = () => {
  const dispatch = useDispatch();
  const { carForSell } = useSelector((state) => state);
  const [openAddCar, setOpenAddCar] = useState(false);
  const [openUpdateCar, setOpenUpdateCar] = useState(false);
  const [selectedCar, setSelectedCar] = useState({});

  useEffect(() => {
    dispatch(getAllCarsForSell());
  }, []);

  const handleAddCarOpen = () => setOpenAddCar(true);
  const handleAddCarClose = () => setOpenAddCar(false);

  const handleUpdateCarOpen = () => setOpenUpdateCar(true);
  const handleUpdateCarClose = () => setOpenUpdateCar(false);

  return (
    <>
      <AddCarForSellModal open={openAddCar} handleClose={handleAddCarClose} />
      <UpdateCarForSellModal
        open={openUpdateCar}
        handleClose={handleUpdateCarClose}
        car={selectedCar}
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
              Cars
            </Typography>
            <AddCircleIcon
              fontSize="large"
              sx={{ ":hover": { cursor: "pointer" } }}
              onClick={handleAddCarOpen}
            />
          </Stack>
          {carForSell.loading ? (
            <Box>Loading...</Box>
          ) : (
            <Stack
              sx={{ flexWrap: "wrap", margin: "2px" }}
              direction={{ xs: "column", sm: "row" }}
              spacing={0}
            >
              {carForSell.cars.map((car) => (
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
                    image={`${config.Backend_URL}${car.image}`}
                    alt="car"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {car.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {car.registration}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`$ ${car.cost}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`Qty: ${car.quantity}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`Sold: ${car.sold}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" />
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        setSelectedCar(car);
                        handleUpdateCarOpen();
                      }}
                    >
                      update
                    </Button>
                    <Button
                      size="small"
                      onClick={async () => {
                        const deletedCar = await deleteCarForSell(car._id);
                        if (deletedCar.success) {
                          const response = await dispatch(getAllCarsForSell());
                          if (response.payload) {
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

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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import config from "../../api/config.json";
import { getAllItems } from "../../api/itemApi";
import { OrderItemsModal } from "./OrderItemModal";
import { getAllCarsForSell } from "../../api/carForSellApi";
import { OrderCarsModal } from "./OrderCarModal";

export const Car = () => {
  const dispatch = useDispatch();
  const { carForSell } = useSelector((state) => state);
  const [carIds, setCarIds] = useState([]);
  const [cars, setCars] = useState([]);
  const [openOrderCar, setOpenOrderCar] = useState(false);

  useEffect(() => {
    dispatch(getAllCarsForSell());
  }, []);

  const handleOrderCarOpen = () => setOpenOrderCar(true);
  const handleOrderCarClose = () => setOpenOrderCar(false);

  return (
    <>
      <OrderCarsModal
        open={openOrderCar}
        handleClose={handleOrderCarClose}
        cars={cars}
        setCars={setCars}
        setCarIds={setCarIds}
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
            <Badge
              badgeContent={carIds.length}
              color="primary"
              sx={{ mt: "12px", mr: "12px" }}
            >
              <ShoppingCartIcon
                fontSize="large"
                sx={{ ":hover": { cursor: "pointer" } }}
                onClick={carIds.length ? handleOrderCarOpen : undefined}
              />
            </Badge>
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
                    <Typography variant="body2" color="text.secondary" />
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        setCarIds((prevState) =>
                          carIds.includes(car._id)
                            ? prevState.filter((id) => id !== car._id)
                            : [...prevState, car._id]
                        );
                        setCars((prevState) =>
                          carIds.includes(car._id)
                            ? prevState.filter((i) => i._id !== car._id)
                            : [...prevState, car]
                        );
                      }}
                    >
                      {carIds.includes(car._id) ? "remove" : "add"}
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

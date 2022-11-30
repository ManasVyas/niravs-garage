import {
  Box,
  Card as MuiCard,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../api/orderApi";

export const Order = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  return (
    <>
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
              Orders
            </Typography>
            <Box w="100%" h="100%" />
          </Stack>
          {order.loading ? (
            <Box>Loading...</Box>
          ) : (
            <Stack
              sx={{ flexWrap: "wrap", margin: "2px" }}
              direction={{ xs: "column", sm: "row" }}
              spacing={0}
            >
              {order.orders.map((order) => (
                <MuiCard
                  key={order._id}
                  sx={{
                    bgcolor: "text.disabled",
                    minWidth: "210px",
                    margin: "4px",
                  }}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {order.username}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {order.productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`$ ${order.price}`}
                    </Typography>
                  </CardContent>
                </MuiCard>
              ))}
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
};

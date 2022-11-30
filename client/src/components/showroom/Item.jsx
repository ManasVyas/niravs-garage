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

export const Item = () => {
  const dispatch = useDispatch();
  const { item } = useSelector((state) => state);
  const [itemIds, setItemIds] = useState([]);
  const [items, setItems] = useState([]);
  const [openOrderItem, setOpenOrderItem] = useState(false);

  useEffect(() => {
    dispatch(getAllItems());
  }, []);

  const handleOrderItemOpen = () => setOpenOrderItem(true);
  const handleOrderItemClose = () => setOpenOrderItem(false);

  return (
    <>
      <OrderItemsModal
        open={openOrderItem}
        handleClose={handleOrderItemClose}
        items={items}
        setItems={setItems}
        setItemIds={setItemIds}
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
              Items
            </Typography>
            <Badge
              badgeContent={itemIds.length}
              color="primary"
              sx={{ mt: "12px", mr: "12px" }}
            >
              <ShoppingCartIcon
                fontSize="large"
                sx={{ ":hover": { cursor: "pointer" } }}
                onClick={itemIds.length ? handleOrderItemOpen : undefined}
              />
            </Badge>
          </Stack>
          {item.loading ? (
            <Box>Loading...</Box>
          ) : (
            <Stack
              sx={{ flexWrap: "wrap", margin: "2px" }}
              direction={{ xs: "column", sm: "row" }}
              spacing={0}
            >
              {item.items.map((item) => (
                <MuiCard
                  key={item._id}
                  sx={{
                    bgcolor: "text.disabled",
                    minWidth: "210px",
                    margin: "4px",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${config.Backend_URL}${item.image}`}
                    alt="item"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`$ ${item.cost}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" />
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        setItemIds((prevState) =>
                          itemIds.includes(item._id)
                            ? prevState.filter((id) => id !== item._id)
                            : [...prevState, item._id]
                        );
                        setItems((prevState) =>
                          itemIds.includes(item._id)
                            ? prevState.filter((i) => i._id !== item._id)
                            : [...prevState, item]
                        );
                      }}
                    >
                      {itemIds.includes(item._id) ? "remove" : "add"}
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

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
import { deleteItem, getAllItems } from "../../api/itemApi";
import { AddItemModal } from "./modal/AddItemModal";
import { UpdateItemModal } from "./modal/UpdateItemModal";

export const ManageItem = () => {
  const dispatch = useDispatch();
  const { item } = useSelector((state) => state);
  const [openAddItem, setOpenAddItem] = useState(false);
  const [openUpdateItem, setOpenUpdateItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    dispatch(getAllItems());
  }, []);

  const handleAddItemOpen = () => setOpenAddItem(true);
  const handleAddItemClose = () => setOpenAddItem(false);

  const handleUpdateItemOpen = () => setOpenUpdateItem(true);
  const handleUpdateItemClose = () => setOpenUpdateItem(false);

  return (
    <>
      <AddItemModal
        open={openAddItem}
        handleClose={handleAddItemClose}
      />
      <UpdateItemModal
        open={openUpdateItem}
        handleClose={handleUpdateItemClose}
        item={selectedItem}
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
            <AddCircleIcon
              fontSize="large"
              sx={{ ":hover": { cursor: "pointer" } }}
              onClick={handleAddItemOpen}
            />
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
                    <Typography variant="body2" color="text.secondary">
                      {`Qty: ${item.quantity}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`Sold: ${item.sold}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" />
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        setSelectedItem(item);
                        handleUpdateItemOpen();
                      }}
                    >
                      update
                    </Button>
                    <Button
                      size="small"
                      onClick={async () => {
                        const deletedItem = await deleteItem(item._id);
                        if (deletedItem.success) {
                          const response = await dispatch(getAllItems());
                          if (response.payload) {
                            Swal.fire(
                              "SUCCESS!",
                              "Item Deleted Successfully!",
                              "success"
                            );
                          } else {
                            Swal.fire(
                              "ERROR!",
                              "Unable to Delete Item. Please Try Again!",
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

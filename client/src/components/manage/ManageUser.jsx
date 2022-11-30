import {
  Box,
  Button,
  Card as MuiCard,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteUser, fetchUsers } from "../../api/userApi";
import { UpdateUserModal } from "./modal/UpdateUserModal";

export const ManageUser = () => {
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState({});
  const { user } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleUpdateUserOpen = () => setOpenUpdateUser(true);
  const handleUpdateUserClose = () => setOpenUpdateUser(false);

  return (
    <>
      <UpdateUserModal
        open={openUpdateUser}
        handleClose={handleUpdateUserClose}
        user={selectedUser}
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
              Users
            </Typography>
            <Box w="100%" h="100%" />
          </Stack>
          {user.loading ? (
            <Box>Loading...</Box>
          ) : (
            <Stack
              sx={{ flexWrap: "wrap", margin: "2px" }}
              direction={{ xs: "column", sm: "row" }}
              spacing={0}
            >
              {user.users.map((user) => (
                <MuiCard
                  key={user._id}
                  sx={{
                    bgcolor: "text.disabled",
                    minWidth: "210px",
                    margin: "4px",
                  }}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {user.userName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.contactNumber}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" />
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        setSelectedUser(user);
                        handleUpdateUserOpen();
                      }}
                    >
                      update
                    </Button>
                    <Button
                      size="small"
                      onClick={async () => {
                        const deletedUser = await deleteUser(user._id);
                        if (deletedUser.success) {
                          const response = await dispatch(fetchUsers());
                          if (response.payload) {
                            Swal.fire(
                              "SUCCESS!",
                              "User Deleted Successfully!",
                              "success"
                            );
                          } else {
                            Swal.fire(
                              "ERROR!",
                              "Unable to Delete User. Please Try Again!",
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

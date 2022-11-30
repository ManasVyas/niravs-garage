import {
  Box,
  Card as MuiCard,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../api/userApi";

export const User = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchUsers());
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

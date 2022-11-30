import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { Appointment } from "./Appointment";
import { Order } from "./Order";
import { User } from "./User";

export const ReportView = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        centered
      >
        <Tab label="appointment" id={0} />
        <Tab label="order" id={1} />
        <Tab label="user" id={2} />
      </Tabs>
      {value === 0 && (
        <Typography variant="body2" color="text.secondary">
          <Appointment />
        </Typography>
      )}
      {value === 1 && (
        <Typography variant="body2" color="text.secondary">
          <Order />
        </Typography>
      )}
      {value === 2 && (
        <Typography variant="body2" color="text.secondary">
          <User />
        </Typography>
      )}
    </Box>
  );
};

import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { ManageCarForSell } from "./ManageCarForSell";
import { ManageItem } from "./ManageItem";
import { ManageService } from "./ManageService";
import { ManageUser } from "./ManageUser";

const ManageView = () => {
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
        <Tab label="user" id={0} />
        <Tab label="service" id={1} />
        <Tab label="item" id={2} />
        <Tab label="car" id={2} />
      </Tabs>
      {value === 0 && (
        <Typography variant="body2" color="text.secondary">
          <ManageUser />
        </Typography>
      )}
      {value === 1 && (
        <Typography variant="body2" color="text.secondary">
          <ManageService />
        </Typography>
      )}
      {value === 2 && (
        <Typography variant="body2" color="text.secondary">
          <ManageItem />
        </Typography>
      )}
      {value === 3 && (
        <Typography variant="body2" color="text.secondary">
          <ManageCarForSell />
        </Typography>
      )}
    </Box>
  );
};

export default ManageView;

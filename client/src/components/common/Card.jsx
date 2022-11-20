import React from "react";
import {
  Button,
  Card as MuiCard,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export const Card = () => {
  return (
    <MuiCard sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image="/addedsoon" alt="car" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Name
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Registration
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </MuiCard>
  );
};

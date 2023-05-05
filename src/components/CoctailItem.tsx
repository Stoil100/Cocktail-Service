import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Checkbox } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { Button, CardActionArea, CardActions } from "@mui/material";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const CoctailItem: React.FC<{
  coctailTitle: string;
  coctailDesc: string;
  coctailImg: string;
}> = (props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.coctailImg}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.coctailTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.coctailDesc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
      </CardActions>
    </Card>
  );
};

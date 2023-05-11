import React,{ useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Checkbox } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { CardActionArea, CardActions } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { FavouritesContext } from "../context";

const StyledCard = styled(Card)`
  max-width: 345px;
`;

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export const CoctailItem: React.FC<{
  coctailTitle: string;
  coctailDesc: string;
  coctailImg: string;
  coctailId: string;
}> = (props) => {
  const navigate = useNavigate();
  const { favourites, toggleFavourite } = useContext(FavouritesContext);
  const isFavourited = favourites.includes(props.coctailId);

  const navigateTo = () => {
    navigate(`/${props.coctailId}`);
  };

  const handleFavouriteChange = () => {
    toggleFavourite(props.coctailId);
  };

  return (
    <StyledCard>
      <CardActionArea onClick={navigateTo}>
        <CardMedia
          component="img"
          height="140"
          image={props.coctailImg}
          alt="coctail image"
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
        <Checkbox
          {...label}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          checked={isFavourited}
          onChange={handleFavouriteChange}
        />
      </CardActions>
    </StyledCard>
  );
};

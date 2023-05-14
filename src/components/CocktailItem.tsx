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
import { Cocktail } from "../models/cocktail";

const StyledCard = styled(Card)`
  max-width: 345px;
`;

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export const CocktailItem = (props: {cocktail: Cocktail}) => {
  const navigate = useNavigate();
  const { favourites, toggleFavourite } = useContext(FavouritesContext);
  const isFavourited = favourites.includes(props.cocktail.idDrink);

  const navigateTo = () => {
    navigate(`/${props.cocktail.idDrink}`);
  };

  const handleFavouriteChange = () => {
    toggleFavourite(props.cocktail.idDrink);
  };

  return (
    <StyledCard>
      <CardActionArea onClick={navigateTo}>
        <CardMedia
          component="img"
          height="140"
          image={props.cocktail.strDrinkThumb}
          alt="cocktail image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.cocktail.strDrink}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.cocktail.strInstructions}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Checkbox
          {...label}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite  color="secondary"/>}
          checked={isFavourited}
          onChange={handleFavouriteChange}
        />
      </CardActions>
    </StyledCard>
  );
};

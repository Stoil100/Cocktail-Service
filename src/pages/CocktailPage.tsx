import React, { useState, useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Checkbox } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { CardActionArea, CardActions } from "@mui/material";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { Cocktail } from "../models/cocktail";
import { FavouritesContext } from "../context";

const StyledCard = styled(Card)`
  max-width: 345px;
`;

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export const CocktailPage: React.FC<{}> = () => {
  const [cocktail, setCocktail] = useState<Cocktail>();
  const id = useParams();
  const { favourites, toggleFavourite } = useContext(FavouritesContext);
  const isFavourited = favourites.includes(id.cocktailId!);
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id.cocktailId}`
      );
      const data = await response.json();
      setCocktail(data.drinks[0]);
    }
    fetchData();
  }, []);

  const handleFavouriteChange = () => {
    toggleFavourite(id.cocktailId!);
  };

  return (
    <StyledCard>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={cocktail?.strDrinkThumb}
          alt="cocktail image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {cocktail?.strDrink}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {cocktail?.strInstructions}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Checkbox
           {...label}
           icon={<FavoriteBorder />}
           checkedIcon={<Favorite color="secondary"/>}
           checked={isFavourited}
           onChange={handleFavouriteChange}
        />
      </CardActions>
    </StyledCard>
  );
};

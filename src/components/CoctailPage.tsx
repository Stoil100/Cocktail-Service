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
import { Coctail } from "../models/coctail";
import { FavouritesContext } from "../context";

const StyledCard = styled(Card)`
  max-width: 345px;
`;

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export const CoctailPage: React.FC<{}> = () => {
  const [coctail, setCoctail] = useState<Coctail>();
  const id = useParams();
  const { favourites, toggleFavourite } = useContext(FavouritesContext);
  const isFavourited = favourites.includes(id.coctailId!);
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id.coctailId}`
      );
      const data = await response.json();
      setCoctail(data.drinks[0]);
    }
    fetchData();
  }, []);

  const handleFavouriteChange = () => {
    toggleFavourite(id.coctailId!);
  };

  return (
    <StyledCard>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={coctail?.strDrinkThumb}
          alt="coctail image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {coctail?.strDrink}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {coctail?.strInstructions}
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

import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Checkbox,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { Cocktail } from "../models/cocktail";
import { FavouritesContext } from "../context";

const StyledCard = styled(Card)`
  width: 100%;
  border-radius: 0;
`;

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Image = styled(CardMedia)`
  height: 500px;
`;

const Title = styled(Typography)`
  font-weight: bold;
  font-size: 2.5rem;
  text-align: center;
`;

const Description = styled(Typography)`
  font-size: 1.2rem;
  text-align: center;
`;

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export const CocktailPage = () => {
  const [cocktail, setCocktail] = useState<Cocktail>();
  const id = useParams();
  const { favourites, toggleFavourite } = useContext(FavouritesContext);
  const [isFavourited, setIsFavourited] = useState(false);
  const fetchData = useCallback(async () => {
    const data = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id.cocktailId}`
    ).then((response) => response.json());
    setCocktail(data.drinks[0]);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setIsFavourited(
      favourites.some((favourite) =>
        Object.values(favourite).includes(cocktail?.idDrink)
      )
    );
  }, [cocktail, favourites]);

  const handleFavouriteChange = () => {
    toggleFavourite(cocktail!);
  };

  console.log(isFavourited);
  return (
    <Container>
      <StyledCard>
        <CardActionArea>
          <CardContent>
            <Title variant="h5">{cocktail?.strDrink}</Title>
            <Description variant="body2" color="text.secondary">
              {cocktail?.strInstructions}
            </Description>
          </CardContent>
          <Image image={cocktail?.strDrinkThumb} />
        </CardActionArea>
        <CardActions>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite color="secondary" />}
            checked={isFavourited}
            onChange={handleFavouriteChange}
          />
        </CardActions>
      </StyledCard>
    </Container>
  );
};

import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button
} from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { Cocktail } from "../models/cocktail";
import { FavouritesContext } from "../context";

const StyledCard = styled(Card)`
  display: flex;
  border-radius: 0;
  width:90%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
`;

const ImageContainer = styled.div`
  width: 500px;
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
  }, [id.cocktailId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  return (
    <div style={{height:"90vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <StyledCard>
        <ImageContainer>
          <CardMedia component="img" image={cocktail?.strDrinkThumb} />
        </ImageContainer>
        <ContentContainer>
          <CardContent>
            <Title variant="h5">{cocktail?.strDrink}</Title>
            <Description variant="body2" color="text.secondary">
              {cocktail?.strInstructions}
            </Description>
          </CardContent>
          <CardActions>
          <Button
            variant="contained"
            color="secondary"
            startIcon={isFavourited ? <Favorite /> : <FavoriteBorder />}
            onClick={handleFavouriteChange}
          >
            {isFavourited ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
          </CardActions>
        </ContentContainer>
      </StyledCard>
    </div>
  );
};

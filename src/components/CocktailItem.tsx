import React, { useCallback, useContext, useMemo } from "react";
import { FavoriteBorder, Favorite, InfoRounded } from "@mui/icons-material";
import {
  CardActionArea,
  CardActions,
  Button,
  Typography,
  CardMedia,
  CardContent,
  Card,
  Checkbox,
} from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { FavouritesContext } from "../context";
import { Cocktail } from "../models/cocktail";

const StyledCard = styled(Card)`
  position: relative;
  max-width: 33vw;
`;
const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  gap:10px;
`;

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export const CocktailItem = (props: { cocktail: Cocktail }) => {
  const navigate = useNavigate();
  const { favourites, toggleFavourite } = useContext(FavouritesContext);

  const checkIsFavourited = useCallback(() => {
    const exists = favourites.some((favourite) =>
      Object.values(favourite).includes(props.cocktail.idDrink)
    );
    if (exists) {
      return true;
    } else {
      return false;
    }
  }, [favourites, props.cocktail.idDrink]);

  const isFavourited = useMemo(() => checkIsFavourited(), [checkIsFavourited]);

  const navigateTo = () => {
    navigate(`/${props.cocktail.idDrink}`);
  };

  const handleFavouriteChange = () => {
    toggleFavourite(props.cocktail);
  };

  return (
    <StyledCard>
      <CardActionArea onClick={navigateTo}>
        <CardMedia
          component="img"
          height="250"
          image={props.cocktail.strDrinkThumb}
          alt="cocktail image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.cocktail.strDrink}
          </Typography>
        </CardContent>
      </CardActionArea>
      <ImageOverlay>
        <ButtonContainer>
          <Button
            variant="contained"
            color="secondary"
            startIcon={isFavourited ? <Favorite /> : <FavoriteBorder />}
            onClick={handleFavouriteChange}
          >
            {isFavourited ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<InfoRounded />}
            onClick={navigateTo}
          >
            More Info
          </Button>
        </ButtonContainer>
      </ImageOverlay>
    </StyledCard>
  );
};

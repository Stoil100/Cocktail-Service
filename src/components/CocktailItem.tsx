import React, { useState, useContext, useEffect } from "react";
import { FavoriteBorder, Favorite, InfoRounded } from "@mui/icons-material";
import {
  CardActionArea,
  Button,
  Typography,
  CardMedia,
  CardContent,
  Card,
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
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(3px);
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
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

export const CocktailItem = (props: { cocktail: Cocktail }) => {
  const navigate = useNavigate();
  const { favourites, toggleFavourite } = useContext(FavouritesContext);
  const [isFavourited, setIsFavourited] = useState(false);

  useEffect(() => {
    setIsFavourited(() => {
      const exists = favourites.some((favourite) =>
      Object.values(favourite).includes(props.cocktail.idDrink)
      );
      if (exists) {
        console.log("exists")
        return true;
      } else {
        console.log("doesn't exist")
        return false;
      }
    });
  }, [favourites, props.cocktail.idDrink]);

  const navigateTo = () => {
    navigate(`/${props.cocktail.idDrink}`);
  };

  const handleFavouriteChange = async () => {
    await toggleFavourite(props.cocktail);
  };

  return (
    <StyledCard>
      <CardActionArea>
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

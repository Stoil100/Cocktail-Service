import React, { useState, useEffect, useContext } from "react";
import { Cocktails } from "../models/cocktail";
import { CocktailItem } from "../components/CocktailItem";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FavouritesContext } from "../context";

export const FavouritedPage = () => {
  const navigate = useNavigate();
  const [cocktails, setCocktails] = useState<Cocktails>([]);
  const [isNotTheSame, setIsNotTheSame] = useState(false);
  const { favourites } = useContext(FavouritesContext);

  useEffect(() => {
    if (favourites.length === 0) {
      navigate("/");
    }

    const getCocktails = async () => {
      const cocktailData = await Promise.all(
        favourites.map(async (favourite) => {
          try {
            const response = await fetch(
              `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${favourite.idDrink}`
            );
            const data = await response.json();
            return data.drinks[0];
          } catch (error) {
            console.log(error);
            return null;
          }
        })
      );

      const filteredCocktails = cocktailData.filter(
        (cocktail) => cocktail !== null
      );
      setCocktails(filteredCocktails);
    };

    getCocktails();
  }, [favourites, navigate]);

  useEffect(() => {
    const checkSimilarity = () => {
      if (
        cocktails.length !== 0 &&
        favourites.length !== 0 &&
        cocktails.length === favourites.length
      ) {
        for (let i = 0; i < favourites.length; i++) {
          if (
            favourites[i].idDrink !== cocktails[i].idDrink ||
            favourites[i].strDrink !== cocktails[i].strDrink ||
            favourites[i].strDrinkThumb !== cocktails[i].strDrinkThumb
          ) {
            setIsNotTheSame(true);
            return;
          }
        }
        setIsNotTheSame(false);
      }
    };
    checkSimilarity();
  }, [favourites, cocktails]);

  return (
    <div style={{ padding: "16px" }}>
      <Grid container spacing={3}>
        {cocktails.map((cocktail) => (
          <Grid key={cocktail.idDrink} item xs={4}>
            <CocktailItem cocktail={cocktail} />
          </Grid>
        ))}
        {isNotTheSame && <Typography>The items are outdated!</Typography>}
      </Grid>
    </div>
  );
};

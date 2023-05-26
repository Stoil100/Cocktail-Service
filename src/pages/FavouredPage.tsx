import React, { useState, useEffect, useCallback } from "react";
import { Cocktails } from "../models/cocktail";
import { CocktailItem } from "../components/CocktailItem";
import { Grid, Typography } from "@mui/material";

export const FavouritedPage = () => {
  const [cocktails, setCocktails] = useState<Cocktails>([]);
  const [isNotTheSame, setIsNotTheSame] = useState(false);
  const [favourites, setFavourites] = useState<Cocktails>(
    JSON.parse(localStorage.getItem("favourites") ?? "[]")
  );

  useEffect(() => {
    const getCocktails = async () => {
      const cocktailData = await Promise.all(
        favourites.map(async (favourite) => {
          const data = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${favourite.idDrink}`
          ).then((response) => response.json());
          return data.drinks[0];
        })
      );
      setCocktails(cocktailData);
    };
    getCocktails();
  }, [favourites]);

  useEffect(() => {
    const checkSimilarity = () => {
      if (cocktails.length !== 0) {
        for (var i = 0; i < favourites.length; i++) {
          if (
            favourites[i].idDrink !== cocktails[i].idDrink ||
            favourites[i].strDrink !== cocktails[i].strDrink ||
            favourites[i].strDrinkThumb !== cocktails[i].strDrinkThumb
          ) {
            setIsNotTheSame(true);
          }
        }
      }
    };
    checkSimilarity();
  }, [favourites, cocktails]);

  return (
    <div style={{ padding: "16px" }}>
      <Grid container spacing={2}>
        {favourites?.map((favourite) => (
          <Grid key={favourite.idDrink} item xs={12} sm={6} md={4} lg={3}>
            <CocktailItem cocktail={favourite} />
          </Grid>
        ))}
        {isNotTheSame && <Typography>The items are outdated!</Typography>}
      </Grid>
    </div>
  );
};

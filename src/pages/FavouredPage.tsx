import React, { useState, useEffect, useCallback } from "react";
import { Cocktails } from "../models/cocktail";
import { CocktailItem } from "../components/CocktailItem";
import { Grid } from "@mui/material";

export const FavouritedPage = () => {
  const [cocktails, setCocktails] = useState<Cocktails>();
  const [favourites, setFavourites] = useState<string[]>(
    JSON.parse(localStorage.getItem("favourites") ?? "[]")
  );

  const fetchCocktailData = useCallback(async () => {
    const cocktailData = await Promise.all(
      favourites.map(async (favouriteId) => {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${favouriteId}`
        );
        const data = await response.json();
        return data.drinks[0];
      })
    );
    setCocktails(cocktailData);
  }, []);

  useEffect(() => {
    fetchCocktailData();
  }, [fetchCocktailData]);

  return (
    <div style={{ padding: "16px" }}>
      <Grid container spacing={2}>
        {cocktails?.map((cocktail) => (
          <Grid key={cocktail.idDrink} item xs={12} sm={6} md={4} lg={3}>
            <CocktailItem cocktail={cocktail} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { Cocktails } from "../models/cocktail";
import { CocktailItem } from "../components/CocktailItem";
import { Grid } from "@mui/material";

export const FavouritedPage= () => {
  const [cocktails, setCocktails] = useState<Cocktails>();
  const [favourites, setFavourites] = useState<string[]>(
    JSON.parse(localStorage.getItem("favourites") ?? "[]")
  );

  useEffect(() => {
    favourites.forEach(async (favouriteId) => {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${favouriteId}`
      );
      const data = await response.json();

      setCocktails((prevCocktail) => [...(prevCocktail ?? []), data.drinks[0]]);
    });
  }, [favourites]);

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

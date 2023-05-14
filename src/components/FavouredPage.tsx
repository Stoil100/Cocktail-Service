import React, { useState, useEffect } from "react";
import { Cocktails } from "../models/cocktail";
import { CocktailItem } from "./CocktailItem";

export const FavouritedPage: React.FC = () => {
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
    <div>
      {cocktails &&
        cocktails.map((cocktail) => (
          <CocktailItem
            key={cocktail.idDrink}
            cocktail={cocktail}
          />
        ))}
    </div>
  );
};

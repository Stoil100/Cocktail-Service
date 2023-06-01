import React, { useState, useEffect, createContext, ReactNode } from "react";
import { Cocktail, Cocktails } from "./models/cocktail";

type FavouritesContextType = {
  favourites: Cocktails;
  toggleFavourite: (cocktail: Cocktail) => void;
};

export const FavouritesContext = createContext<FavouritesContextType>({
  favourites: [],
  toggleFavourite: () => {},
});

export const FavouritesProvider = (props: { children: ReactNode }) => {
  const [favourites, setFavourites] = useState<Cocktails | []>(
    JSON.parse(localStorage.getItem("favourites") ?? "[]")
  );

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (cocktail: Cocktail) => {
    if(favourites.length===0){
      setFavourites([...favourites, cocktail]);
    }
    else{
    favourites.map((favourite) => {
      if (favourite?.idDrink === cocktail.idDrink) {
        setFavourites(
          favourites.filter(
            (favourite) => favourite.idDrink !== cocktail.idDrink
          )
        );
      } else {
        setFavourites([...favourites, cocktail]);
      }
    });
  }
  };

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
      {props.children}
    </FavouritesContext.Provider>
  );
};

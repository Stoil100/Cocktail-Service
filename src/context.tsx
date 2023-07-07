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
  const [favourites, setFavourites] = useState<Cocktails>(() => {
    const storedFavourites = localStorage.getItem("favourites");
    return storedFavourites ? JSON.parse(storedFavourites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (cocktail: Cocktail) => {
    setFavourites((prevFavourites) => {
      const isFavourite = prevFavourites.some(
        (favourite) => favourite.idDrink === cocktail.idDrink
      );

      if (isFavourite) {
        return prevFavourites.filter(
          (favourite) => favourite.idDrink !== cocktail.idDrink
        );
      } else {
        return [...prevFavourites, cocktail];
      }
    });
  };

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
      {props.children}
    </FavouritesContext.Provider>
  );
};

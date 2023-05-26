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
      console.log(cocktail)
      setFavourites([...favourites, cocktail]);
    }
    else{
    favourites.map((favourite) => {
      console.log("hello")
      if (favourite?.idDrink === cocktail.idDrink) {
        setFavourites(
          favourites.filter(
            (favourite) => favourite.idDrink !== cocktail.idDrink
          )
        );
      } else {
        console.log(favourite,0)
        setFavourites([...favourites, cocktail]);
      }
    });
  }
  };
  console.log(favourites)

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
      {props.children}
    </FavouritesContext.Provider>
  );
};

import React,{ useState, useEffect, createContext, ReactNode} from "react";

type FavouritesContextType = {
  favourites: string[];
  toggleFavourite: (cocktailId: string) => void;
};

export const FavouritesContext = createContext<FavouritesContextType>({
  favourites: [],
  toggleFavourite: () => {},
});

export const FavouritesProvider = (props:{children:ReactNode}) => {
  const [favourites, setFavourites] = useState<string[]>(
    JSON.parse(localStorage.getItem("favourites") ?? "[]")
  );

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (cocktailId: string) => {
    if (favourites.includes(cocktailId)) {
      setFavourites(favourites.filter((id) => id !== cocktailId));
    } else {
      setFavourites([...favourites, cocktailId]);
    }
  };

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
      {props.children}
    </FavouritesContext.Provider>
  );
};

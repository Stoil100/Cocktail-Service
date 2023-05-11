import React,{ useState, useEffect, createContext, ReactNode} from "react";

type FavouritesContextType = {
  favourites: string[];
  toggleFavourite: (coctailId: string) => void;
};

type Props = {
  children: ReactNode;
};

export const FavouritesContext = createContext<FavouritesContextType>({
  favourites: [],
  toggleFavourite: () => {},
});

export const FavouritesProvider = ({ children }: Props) => {
  const [favourites, setFavourites] = useState<string[]>(
    JSON.parse(localStorage.getItem("favourites") ?? "[]")
  );

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (coctailId: string) => {
    if (favourites.includes(coctailId)) {
      setFavourites(favourites.filter((id) => id !== coctailId));
    } else {
      setFavourites([...favourites, coctailId]);
    }
  };

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};

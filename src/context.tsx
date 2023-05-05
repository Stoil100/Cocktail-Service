import React, { createContext, useState } from 'react';

interface FavouritesContextType {
  favourites: string[];
  addFavourite: (item: string) => void;
  removeFavourite: (item: string) => void;
}

export const FavouritesContext = createContext<FavouritesContextType>({
  favourites: [],
  addFavourite: () => {},
  removeFavourite: () => {},
});

const FavouritesContextProvider: React.FC = (props) => {
  const [favourites, setFavourites] = useState<string[]>([]);

  const addFavourite = (item: string) => {
    if (!favourites.includes(item)) {
      setFavourites([...favourites, item]);
    }
  };

  const removeFavourite = (item: string) => {
    setFavourites(favourites.filter((f) => f !== item));
  };

  const contextValue: FavouritesContextType = {
    favourites,
    addFavourite,
    removeFavourite,
  };

  return (
    <FavouritesContext.Provider value={contextValue}>
    </FavouritesContext.Provider>
  );
};


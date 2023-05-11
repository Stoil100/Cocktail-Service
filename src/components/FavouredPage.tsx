import React, { useState, useEffect } from "react";
import { Coctails } from "../models/coctail";
import { CoctailItem } from "./CoctailItem";

export const FavouritedPage: React.FC = () => {
  const [coctails, setCoctails] = useState<Coctails>([]);
  const [favourites, setFavourites] = useState<string[]>(
    JSON.parse(localStorage.getItem("favourites") ?? "[]")
  );

  useEffect(() => {
    const getFavouritedCoctails = () => {
      favourites.forEach((favouriteId) => {
        async function fetchData() {
          const response = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${favouriteId}`
          );
          const data = await response.json();
          setCoctails((prevCoctail) => [...prevCoctail, data.drinks[0]]);
        }
        fetchData();
      });
    };
    getFavouritedCoctails();
  }, []);
  console.log(coctails);
  coctails.map(coctail=>(
    console.log(coctail,"helo")
  ))

  return (
    <div>
      {coctails &&
        coctails.map((coctail) => (
          <CoctailItem
            key={coctail.idDrink}
            coctailTitle={coctail.strDrink}
            coctailDesc={coctail.strInstructions}
            coctailImg={coctail.strDrinkThumb}
            coctailId={coctail.idDrink}
          />
        ))}
    </div>
  );
};

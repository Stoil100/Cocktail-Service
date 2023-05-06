import React, { useState, useEffect } from "react";
import { CoctailItem } from "./CoctailItem";
import { Coctails } from "../models/coctail";

export const CocktailList: React.FC = () => {
  const [coctails, setCoctails] = useState<Coctails>();
  const [searchTerm, setSearchTerm] = useState<string | null>("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`
      );
      const data = await response.json();
      console.log(data);
      setCoctails(data.drinks);
    }
    fetchData();
  }, [searchTerm]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

 

  return (
    <div>
      <input
        type="text"
        placeholder="Search cocktails..."
        onChange={handleSearch}
      />

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

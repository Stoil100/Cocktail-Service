import React, { useState, useEffect } from "react";
import { CocktailItem } from "../components/CocktailItem";
import { Cocktails, Cocktail } from "../models/cocktail";
import { Backdrop, Button } from "@mui/material";

export const Homepage: React.FC = () => {
  const [cocktails, setCocktails] = useState<Cocktails>();
  const [searchTerm, setSearchTerm] = useState<string | null>("");

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`
      ).then((response) => response.json());
      setCocktails(data.drinks);
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
      {cocktails &&
        cocktails.map(
          (cocktail) =>
            cocktail.strDrink.includes(searchTerm!) && (
              <CocktailItem key={cocktail.idDrink} cocktail={cocktail} />
            )
        )}
    </div>
  );
};

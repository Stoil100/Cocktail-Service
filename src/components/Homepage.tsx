import React, { useState, useEffect } from "react";
import { CocktailItem } from "./CocktailItem";
import { Cocktails, Cocktail } from "../models/cocktail";
import { Backdrop, Button } from "@mui/material";

export const Homepage: React.FC = () => {
  const [cocktails, setCocktails] = useState<Cocktails>();
  const [searchTerm, setSearchTerm] = useState<string | null>("");
  const [randomCocktail, setRandomCocktail] = useState<Cocktail>();
  const [isCocktailDisplayed, setIsCocktailDisplayed] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`
      ).then(response => response.json());
      setCocktails(data.drinks);
    }
    fetchData();
  }, [searchTerm]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleGetRandomCocktail = async () => {
    const data = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    ).then(response => response.json());
    setRandomCocktail(data.drinks[0]);
    setIsCocktailDisplayed(true);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search cocktails..."
        onChange={handleSearch}
      />

      <Button variant="contained" onClick={handleGetRandomCocktail}>
        Get a random cocktail
      </Button>

      {isCocktailDisplayed && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
          onClick={() => {
            setIsCocktailDisplayed(false);
          }}
        >
          <CocktailItem
            key={randomCocktail!.idDrink}
            cocktail={randomCocktail!}
          />
        </Backdrop>
      )}

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

import React, { useState, useEffect } from "react";
import { CoctailItem } from "./CoctailItem";
import { Coctails, Coctail } from "../models/coctail";
import { Backdrop, Button } from "@mui/material";

export const CocktailList: React.FC = () => {
  const [coctails, setCoctails] = useState<Coctails>();
  const [searchTerm, setSearchTerm] = useState<string | null>("");
  const [randomCocktail, setRandomCocktail] = useState<Coctail>();
  const [isCocktailDisplayed, setIsCocktailDisplayed] = useState(false);

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

  const handleGetRandomCocktail = async () => {
    const response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    const data = await response.json();
    console.log(data);
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
          <CoctailItem
            key={randomCocktail!.idDrink}
            coctailTitle={randomCocktail!.strDrink}
            coctailDesc={randomCocktail!.strInstructions}
            coctailImg={randomCocktail!.strDrinkThumb}
            coctailId={randomCocktail!.idDrink}
          />
        </Backdrop>
      )}

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

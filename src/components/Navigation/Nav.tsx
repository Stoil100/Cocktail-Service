import React, { useState, useContext } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Backdrop,
} from "@mui/material";
import { Favorite, Home, QuestionMark,} from "@mui/icons-material";
import { useNavigate, useLocation,useParams } from "react-router-dom";
import { FavouritesContext } from "../../context";
import { Cocktail } from "../../models/cocktail";
import { CocktailItem } from "../CocktailItem";

export const Nav= () => {
  const { favourites } = useContext(FavouritesContext);
  const [randomCocktail, setRandomCocktail] = useState<Cocktail>();
  const [isCocktailDisplayed, setIsCocktailDisplayed] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const handleGetRandomCocktail = async () => {
    const data = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    ).then((response) => response.json());
    setRandomCocktail(data.drinks[0]);
    setIsCocktailDisplayed(true);
  };
  return (
    <>
      <BottomNavigation
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100vw",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          zIndex:1,
          backgroundColor: "",
        }}
      >
        <BottomNavigationAction
          value="add"
          icon={<QuestionMark/>}
          onClick={handleGetRandomCocktail}
        />
        {favourites.length > 0 && location.pathname !== "/favourites" && params.cocktailId===undefined? (
          <BottomNavigationAction
            label="Favourites"
            value="favourites"
            icon={<Favorite />}
            onClick={() => {
              navigate("/favourites");
            }}
          />
        ) : (
          <BottomNavigationAction
            label="Home"
            value="home"
            icon={<Home />}
            onClick={() => {
              navigate("/");
            }}
          />
        )}
      </BottomNavigation>
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
    </>
  );
};

import React,{ useState} from "react";
import { Fab,Backdrop } from "@mui/material";
import { QuestionMark } from "@mui/icons-material";
import { Cocktail } from "../../models/cocktail";
import { CocktailItem } from "../CocktailItem";

export const MainNavButton:React.FC = () => {
  return (
    <Fab
      color="primary"
      sx={{
        width: "4.5rem",
        height: "4.5rem",
        position: "fixed",
        bottom:10,
        zIndex: 1,
        color: "#fff",
      }}
    >
      <QuestionMark sx={{ fontSize: "3rem" }} />
    </Fab>
  );
};

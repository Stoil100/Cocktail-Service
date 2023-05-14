import React,{useState,useEffect} from "react";
import { Homepage } from "./components/Homepage";
import { CocktailItem } from "./components/CocktailItem";
import RootLayout from "./components/Root";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import { CocktailPage } from "./components/CocktailPage";
import { FavouritedPage } from "./components/FavouredPage";

function App() {
  const[todos,setTodos]=useState<[]>();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <Homepage/> },
        { path: "/:cocktailId", element: <CocktailPage/> },
      ],
    },
  ]);

  return (
    <div>
       <RouterProvider router={router} />
    </div>
  );
}

export default App;

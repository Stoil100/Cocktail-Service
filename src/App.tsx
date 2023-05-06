import React,{useState,useEffect} from "react";
import { CocktailList } from "./components/Homepage";
import { CoctailItem } from "./components/CoctailItem";
import RootLayout from "./components/Root";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import { CoctailPage } from "./components/CoctailPage";

function App() {
  const[todos,setTodos]=useState<[]>();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <CocktailList/> },
        { path: "/:coctailId", element: <CoctailPage/> },
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

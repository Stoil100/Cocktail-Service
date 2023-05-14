import React from "react";
import { Homepage } from "./pages/Homepage";
import RootLayout from "./components/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CocktailPage } from "./pages/CocktailPage";
import { FavouritedPage } from "./pages/FavouredPage";
import { createTheme,ThemeProvider } from "@mui/material";

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#1977d2', //blue
      contrastText: 'white',
    },
    secondary: {
      main: '#f50057',
      contrastText: 'white',
    },
  }
})

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <Homepage/> },
        { path: "/:cocktailId", element: <CocktailPage/> },
        { path: "/favourites", element: <FavouritedPage/>},
      ],
    },
  ]);

  return (
    <ThemeProvider theme={customTheme}>
       <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;

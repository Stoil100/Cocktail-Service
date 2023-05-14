import React from "react";
import { Homepage } from "./pages/Homepage";
import RootLayout from "./components/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CocktailPage } from "./pages/CocktailPage";
import { FavouritedPage } from "./pages/FavouredPage";
import { createTheme, ThemeProvider } from "@mui/material";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#1977d2", //blue
      contrastText: "white",
    },
    secondary: {
      main: "#f50057",
      contrastText: "white",
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h2",
          h2: "h2",
          h3: "h2",
          h4: "h2",
          h5: "h2",
          h6: "h2",
          subtitle1: "h2",
          subtitle2: "h2",
          body1: "div",
          body2: "image",
        },
      },
    },
  },
});

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <Homepage /> },
        { path: "/:cocktailId", element: <CocktailPage /> },
        { path: "/favourites", element: <FavouritedPage /> },
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

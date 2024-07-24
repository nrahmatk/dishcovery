import { createBrowserRouter, redirect } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import RecipeDetail from "../pages/RecipeDetail";
import Home from "../pages/Home";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import Navbar from "../components/Navbar";
import Recipes from "../pages/Recipes";
import FavoriteList from "../pages/FavoriteList";
import Chat from "../pages/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar /> <Home />
      </>
    ),
  },
  {
    path: "/",
    element: <MainLayout />,
    loader() {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "recipes",
        element: <Recipes />,
      },
      {
        path: "recipe/:id",
        element: <RecipeDetail />,
      },
      {
        path: "favoritelist",
        element: <FavoriteList />,
      },
      {
        path: "chat-with-ai",
        element: <Chat />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader() {
      if (localStorage.access_token) {
        return redirect("/");
      }

      return null;
    },
  },
  {
    path: "/register",
    element: <RegisterPage />,
    loader() {
      if (localStorage.access_token) {
        return redirect("/");
      }

      return null;
    },
  },
]);

export default router;

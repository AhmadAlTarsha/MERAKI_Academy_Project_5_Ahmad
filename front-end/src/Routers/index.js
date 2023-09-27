import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Not_Found from "../pages/Not_Found/Not_Found";
import { Register } from "../pages/register/register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,

      },
     {
      path:"register",
      element:<Register/>
     }
    ],
  },
  {
    path: "*",
    element: <Not_Found />,
  },
]);

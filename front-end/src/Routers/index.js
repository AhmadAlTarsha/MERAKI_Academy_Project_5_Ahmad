import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Not_Found from "../pages/Not_Found/Not_Found";

import { Register } from "../pages/register/register";

import Adminindex from "../pages/Admin/Layout";
import AdminHome from "../pages/Admin/Home/Home";
import AdminPosts from "../pages/Admin/Posts/Posts";
import AdminServices from "../pages/Admin/Services/Services";


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
    path: "/admin",
    element: <Adminindex />,
    children: [
      {
        path: "",
        element: <AdminHome />,
      },
      {
        path: "posts",
        element: <AdminPosts />,
      },
      {
        path: "services",
        element: <AdminServices />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <Not_Found />,
  },
]);

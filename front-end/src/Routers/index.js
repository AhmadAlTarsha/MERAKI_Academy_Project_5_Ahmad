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
import AdminCategories from "../pages/Admin/Categories/Categories";
import AdminCategory from "../pages/Admin/Categories/Category";
import AdminSub_Categories from "../pages/Admin/Sub_Categories/Sub_Categories";
import AdminSub_Category from "../pages/Admin/Sub_Categories/Sub_Category";
import AdminRegions from "../pages/Admin/Regions/Regions";
import Orders from "../pages/Orders/Orders";
import Profile from "../pages/Profile/Profile";
import MyPosts from "../pages/MyPosts/MyPosts";
import MyServices from "../pages/MyServices/MyServices";
import Chats from "../pages/Chats/Chats";
import Conversations from "../pages/Chats/Conversations";
import UpdateMyPost from "../pages/MyPosts/updatemyPost";

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
        path: "register",
        element: <Register />,
      },
      {
        path: "posts",
        element: <MyPosts />,
      },
      {
        path: "services",
        element: <MyServices />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "chats",
        element: <Conversations />,
        children: [
          {
            path: ":id/:recieverId",
            element: <Chats />,
          },
        ],
      },
      { path: "post_update/:id", element: <UpdateMyPost /> },
    ],
  },
  {
    path: "/admin",
    element: <Adminindex />,
    children: [
      {
        path: "a",
        element: <AdminHome />,
      },
      {
        path: "categories",
        element: <AdminCategories />,
      },
      {
        path: "sub-categories",
        element: <AdminSub_Categories />,
      },
      {
        path: "categories/:id",
        element: <AdminCategory />,
      },
      {
        path: "sub-categories/:id",
        element: <AdminSub_Category />,
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
      {
        path: "regions",
        element: <AdminRegions />,
      },
    ],
  },
  {
    path: "*",
    element: <Not_Found />,
  },
]);

import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routers";
import { Register } from "./pages/register/register";

function App() {
  return <RouterProvider router={router} />;
}

export default App;

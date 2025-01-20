import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Error from "./pages/Error";
import { createContext, useState } from "react";
import { Admin } from "./pages/Admin";
export const LoginContext = createContext();
const baseURL = "http://localhost:8000/";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home baseURL={baseURL} />,
  },
  {
    path: "/cart",
    element: <Cart baseURL={baseURL} />,
  },
  {
    path: "/admin",
    element: <Admin baseURL={baseURL} />,
  },
  {
    path: "/*",
    element: <Error baseURL={baseURL} />,
  },
]);
function App() {
  const [login, setLogin] = useState(() => {
    const localData = localStorage.getItem("login");
    return localData
      ? JSON.parse(localData)
      : {
          name: "",
          contact: "",
          latitude: 0,
          longitude: 0,
          promo: "",
        };
  });
  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      <RouterProvider router={router} />
    </LoginContext.Provider>
  );
}

export default App;

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Callback from "./pages/Auth/Callback";
import Main from "./pages/Main";

function App() {
  const routes = createBrowserRouter([
    {
      index: true,
      path: "/",
      element: <Login />,
    },
    {
      index: true,
      path: "/callback",
      element: <Callback />,
    },
    {
      index: true,
      path: "/main",
      element: <Main />,
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;

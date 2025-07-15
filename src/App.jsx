import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Callback from "./pages/Auth/Callback";
import PersonaGeneration from "./pages/PersonaGeneration";
import MusicCompart from "./pages/MusicCompart";
import CheckCompart from "./pages/CheckCompart";
import WebPlayback from "./pages/WebPlayback";
function App() {
  const routes = createBrowserRouter([
    {
      index: true,
      path: "/",
      element: <Login />,
    },
    {
      path: "/callback",
      element: <Callback />,
    },
    {
      path: "/persona-generator",
      element: <PersonaGeneration />,
    },
    {
      path: "/compartability",
      element: <MusicCompart />,
    },
    {
      path: "/check-compart/:id",
      element: <CheckCompart />,
    },

     {
      path: "/web-playback",
      element: <WebPlayback />,
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;

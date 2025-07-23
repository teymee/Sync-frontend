import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Callback from "./pages/Auth/Callback";
import PersonaGeneration from "./pages/PersonaGeneration";
import MusicCompart from "./pages/MusicCompart";
import CheckCompart from "./pages/CheckCompart";
import WebPlayback from "./pages/WebPlayback";
import Home from "./pages/Home";

import gsap from "gsap";

 import { SplitText, ScrollTrigger } from "gsap/all";
gsap.registerPlugin(SplitText, ScrollTrigger );
function App() {
  const routes = createBrowserRouter([
    {
     
      path: "/login",
      element: <Login />,
    },
    {
       index: true,
      path: "/",
      element: <Home />,
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

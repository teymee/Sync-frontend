import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Callback from "./pages/Auth/Callback";
import PersonaGeneration from "./pages/PersonaGeneration";
import MusicCompart from "./pages/MusicCompart";
import CheckCompart from "./pages/CheckCompart";
import WebPlayback from "./pages/WebPlayback";
import Home from "./pages/Home";
import { Analytics } from "@vercel/analytics/react";

import gsap from "gsap";

import { SplitText, ScrollTrigger } from "gsap/all";
import TopList from "./pages/TopList";
import Artist from "./pages/Artist";
import TopTracks from "./pages/TopTracks";
import MasterLayout from "./components/Masterlayout";
gsap.registerPlugin(SplitText, ScrollTrigger);
function App() {
  const routes = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <MasterLayout />,
      children: [
        {
          index: true,
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

        {
          path: "/top-tracks",
          element: <TopTracks />,
        },

        {
          path: "/top-list",
          element: <TopList />,
        },

        {
          path: "/artist-details",
          element: <Artist />,
        },
      ],
    },
    // {
    //   path: "/callback",
    //   element: <Callback />,
    // },
  ]);

  return (
    <>
      <Analytics />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;

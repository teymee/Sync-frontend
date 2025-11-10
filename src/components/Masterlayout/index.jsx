import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function MasterLayout() {
  return (
    <section className="flex flex-col h-screen">
      <Navbar />
      <section className="flex-1  ">
        <Outlet />
      </section>
    </section>
  );
}

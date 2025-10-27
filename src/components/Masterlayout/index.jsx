import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function MasterLayout() {
  return (
    <section>
      <Navbar />
      <section className="mt-14">
        <Outlet />
      </section>
    </section>
  );
}

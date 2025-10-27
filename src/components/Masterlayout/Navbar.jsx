import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const links = [
    {
      name: "Top tracks",
      link: "/top-tracks",
    },
    {
      name: "Top artists",
      link: "/top-artists",
    },
    {
      name: "Top list",
      link: "/top-list",
    },
    {
      name: "Persona generator",
      link: "/persona-generator",
    },
    {
      name: "Music compatability",
      link: "/compartability",
    },
  ];
  return (
    <nav className="bg-primary sticky top-0  py-5 shadow z-30">
      <section className=" w-11/12 mx-auto  ">
        <section className="flex justify-between items-center">
          <section>
            <Link to="/">
              <h1 className="font-extrabold text-2xl">SYNC</h1>
            </Link>
          </section>

          <section>
            <ul className="flex gap-x-5 text-base font-medium items-center">
              {links.map(({ name, link }) => {
                return (
                  <Link to={link} key={name}>
                    <li
                      className={`${
                        pathname === link ? "underline underline-offset-4" : ""
                      } `}
                    >
                      {name}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </section>
        </section>
      </section>
    </nav>
  );
}

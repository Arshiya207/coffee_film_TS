// react router imports
import { Outlet } from "react-router-dom";

// component imports
import Header from "../Components/Header";

// type imports
import type { JSX } from "react";


export default function Layout():JSX.Element {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

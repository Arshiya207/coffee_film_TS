// react router imports
import { Outlet, Navigate } from "react-router-dom";

// type imports
import type { JSX } from "react";

export type NavigateStateType = {
  message: string;
};

const stateMessage: NavigateStateType = {
  message: "you need to login to your account first",
};


export default function Auth(): JSX.Element {
  const coffeeFilmUserId: string | null =
    localStorage.getItem("coffeeFilmUserId");
  
  function checkLoginState(): JSX.Element {
    if (coffeeFilmUserId) {
      return <Outlet />;
    } else {
      return <Navigate to="login" state={stateMessage} />;
    }
  }

  return checkLoginState();
}

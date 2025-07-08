// react router imports
import { Outlet, useNavigate } from "react-router-dom";

// asset imports
import { BsArrowLeftSquareFill as Back } from "react-icons/bs";

//  type imports
import type { JSX } from "react";
import type { NavigateFunction } from "react-router-dom";


export default function SubPages():JSX.Element {
  const navigate:NavigateFunction = useNavigate();
  function goBack():void {
    navigate(-1);
  }
  return (
    <>
      <div className="navigate-back">
        <button onClick={goBack} className="text-icon">
          {" "}
          <Back /> Back
        </button>
      </div>
      <Outlet />
    </>
  );
}

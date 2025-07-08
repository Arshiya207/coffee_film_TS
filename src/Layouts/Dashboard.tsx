// react router and react imports
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

// api imports
import { getUser } from "../api";

// component imports
import Loading from "../HL Components/Loading";

// types
import type { ApiUserType } from "../Types";
import type { JSX } from "react";


export default function Dashboard():JSX.Element {
  const coffeeFilmUserId:string|null=localStorage.getItem("coffeeFilmUserId")
  const [isLoading,setIsloading]=useState<boolean>(false)
  const [userData,setUserData]= useState<ApiUserType|null>(null)

  useEffect(()=>{
    let timeoutId:number;
    async function getUserInfo():Promise<void>{
      setIsloading(true)
      if(!coffeeFilmUserId)return
      const result:ApiUserType | undefined = await getUser(coffeeFilmUserId)
      if(!result) throw new Error("the result of get user in dashboard page is undefined ")
      console.log(result)
      setUserData(result)
      timeoutId = setTimeout(()=>{setIsloading(false)},500) 

    }
getUserInfo()
return ()=>{
  clearTimeout(timeoutId)
}
  },[])

  return (
    <div className="dashboard">
      <Loading isLoading={isLoading} type="large">
      <div className="dashboard__welcome">
        <h2 className="dashboard-welcome__message">
          Welcome to CoffeeFilm, {userData?.userName}
        </h2>
      </div>
      <nav className="dashboard__nav">
        <ul className="dashboard-nav__list">
          <li>
            <NavLink to=".">Favorites</NavLink>
          </li>
          <li>
            <NavLink to="watch-later">Watch Later</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
      </Loading>

    </div>
  );
}

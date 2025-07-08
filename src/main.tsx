// react and css imports
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// component(pages) imports
import App from "./App";
import Search from "./Pages/Search.tsx";
import Login from "./Pages/Login.tsx";
import Dashboard from "./Layouts/Dashboard.tsx";
import Signup from "./Pages/Signup.tsx";
import Movie from "./Pages/Movie.tsx";
import ShowAll from "./Pages/ShowAll.tsx";
import WatchLater from "./Pages/WatchLater.tsx";
import Favorites from "./Pages/Favorites.tsx";

//react router and layout route imports
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layouts/Layout.tsx";
import SubPages from "./Layouts/SubPages.tsx";
import Auth from "./Pages/Auth.tsx";

const root = document.getElementById("root");
if (!root) throw new Error("html root element is null");

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route element={<SubPages />}>
            <Route path="search" element={<Search />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="m/:id" element={<Movie />} />
            <Route path="show-all/:genre/:page" element={<ShowAll />} />
            <Route element={<Auth />}>
              <Route path="dashboard" element={<Dashboard />}>
                <Route index element={<Favorites />} />
                <Route path="watch-later" element={<WatchLater />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

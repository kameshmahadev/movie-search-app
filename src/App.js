// src/App.jsx
import React, { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import Navbar from "./components/Navbar";

export const FavoritesContext = createContext();

const App = () => {
  const [favorites, setFavorites] = useState([]);

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/:id" element={<MovieDetailsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route
          path="*"
          element={<div className="text-center text-2xl mt-10">404 Page Not Found</div>}
        />
      </Routes>
    </FavoritesContext.Provider>
  );
};

export default App;

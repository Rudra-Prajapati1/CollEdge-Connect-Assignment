import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <main className="bg-gray-500 min-h-screen">
      <Navbar />
      <div className=" px-4 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </main>
  );
};

export default App;

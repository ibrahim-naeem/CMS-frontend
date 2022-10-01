import { FC, useState, useEffect } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import Home from "./Pages/Home";
import { isTokenPresent } from "./utils/utitlityMethods/utilityMethods";
import Verification from "./Pages/Verification";

const App: FC = (): JSX.Element => {
  return (
    <div className="App ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<p>404 - Page Not Found!</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

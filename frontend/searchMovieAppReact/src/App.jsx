import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Login } from "./Pages/Login";
import { Home } from "./Pages/Home";
import {Profile} from "./Pages/Profile";
import { Route, Routes } from "react-router-dom";
import {
  PrivateRoutes,
  ProtectedRouteAfterLogin,
} from "./routeHelpers/PrivateRoutes";

import { SignUp } from "./Pages/SignUp";
import { ForgetPassword } from "./Pages/ForgetPassword";
import { NotFound } from "./Pages/NotFound";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
    <main className="flex-grow">
      <Routes>
        <Route element={<ProtectedRouteAfterLogin />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile/>}/>
        </Route>
      </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

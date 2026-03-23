import React, { useState } from "react";
import Header from "./components/Header";
import Modes from "./components/Modes";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen min-w-screen  bg-[#FFAFCC]">
      <Header />
      <div className="flex flex-col-reverse sm:flex-row">
        <Modes />

        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;

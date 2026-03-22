import React from "react";
import Header from "./components/Header";
import Modes from "./components/Modes";

function App() {
  return (
    <div className="min-h-screen min-w-screen bg-[#FFAFCC]">
      <Header />
      <div className="block">
        <Modes />
      </div>
    </div>
  );
}

export default App;

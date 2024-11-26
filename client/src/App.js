import React from "react";
import "./App.css";
import Calender from "./Components/Calender";
import Summery from "./Components/Summery";
import { Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";


function App() {
  return (
    <div className="App">
  
      <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
 
      <Routes>
        <Route path="/" element={<Calender />} exact />
        <Route path="/summery" element={<Summery />} />
      </Routes>
   
  
     
    </div>
  );
}

export default App;

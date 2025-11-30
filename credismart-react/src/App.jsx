import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import "./styles/App.css";

import { Home } from "./pages/Home";
import  Simulador  from "./pages/Simulador";
import  Solicitar  from "./pages/Solicitar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/simulador" element={<Simulador />}/>
        <Route path="/solicitar" element={<Solicitar />}/>
      </Routes>

      <Footer />    
    </>
  );
}

export default App;
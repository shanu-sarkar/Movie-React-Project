import Readers from "./components/Readers";
import Cards from "./components/Cards";
import AddMovie from "./components/AddMovie";
import {Route, Routes } from "react-router-dom";
import Detai from "./components/Detai";
import { createContext, useEffect, useState } from "react";
import Login from './components/Login'
import Sign from './components/Sign'

const Appstate = createContext();

function App() {
const [login, setLogin] = useState(false);
const [userName, setUserName] = useState("");

  return (
    <Appstate.Provider value={{login, userName, setLogin, setUserName}}>
    <div className="App relative">
    <Readers />
    <Routes>
      <Route path="/" element={<Cards />}/>
      <Route path="/addmovie" element={<AddMovie />}/>
      <Route path="/detai/:id" element={<Detai />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/sign" element={<Sign />}/>
    </Routes>
    </div>
    </Appstate.Provider>
  )
}
export default App;
export {Appstate};

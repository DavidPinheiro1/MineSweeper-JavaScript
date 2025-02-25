import "./assets/css/App.css";
import React from "react";
import { useState, useEffect } from "react";
import {Panel, Header, Footer, GameZone} from "./components";

function App() {
  //const [gameStarted, setGameStarted] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState(0);
  const [vitoriaDerrota, setVitoriaDerrota] = useState(0); //0 parado ou a dar, 1 vitoria, 2 derrota
return (
  <div id="container">
    <Header/>
    <Panel
      gameStarted = {gameStarted}
      setGameStarted = {setGameStarted}
      level = {level}
      setLevel = {setLevel}
      setVitoriaDerrota = {setVitoriaDerrota}
      vitoriaDerrota = {vitoriaDerrota}
    />
    {gameStarted?<GameZone
      level = {level}
      gameStarted = {gameStarted}
      setVitoriaDerrota = {setVitoriaDerrota}
    />:""}
    
    <Footer/>
  </div>
);
}
export default App;

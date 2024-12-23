// src/App.js
import { useState, useEffect } from "react";
import "./App.css";
import TonKeypairManager from "./Components/KeypairManager/TonKeypairManager";
import Button from "./Components/Button/Button";

// Access Telegram WebApp from window.Telegram
const tele = window.Telegram?.WebApp || {};

function App() {
  useEffect(() => {
    tele.ready();
  });

  const onInitialize = () => {
    tele.MainButton.text = "Initialize Wallet";
    tele.MainButton.show();
  };

  return (
    <>
      <h1 className="heading">TON Wallet Manager</h1>
      <div className="container mx-auto px-4">
        <TonKeypairManager onInitialize={onInitialize} />
      </div>
    </>
  );
}

export default App;

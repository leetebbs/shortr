import React from "react";
import "./App.css";
import logo from "./images/logo.png";
import "typeface-aldrich";
import { useState, useEffect } from "react";
require("dotenv").config();

function App() {
  const myVar = "Bearer " + process.env.REACT_APP_TOKEN;

  useEffect(() => {
    document.querySelector("input").addEventListener("keydown", (event) => {
      if (event.code === "Enter") {
        const inpt = document.querySelector("input").value;
        if (inpt !== "");
        getShortUrl(inpt);
      }
    });
  }, []);

  const [shortenUrl, setShortenUrl] = useState();

  function getShortUrl(inpt) {
    fetch("https://api-ssl.bitly.com/v4/shorten", {
      method: "POST",
      headers: {
        Authorization: myVar,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        long_url: inpt,
        domain: "bit.ly",
      }),
    })
      .then((response) => response.json())
      .then((data) => setShortenUrl(data.link));
  }

  return (
    <>
      <div className="App">
        <img className="logo" src={logo} alt="logo"></img>
        <div>
          <input className="box"></input>
        </div>

        <div className="text">
          {shortenUrl ? (
            <p>
              Your Short URL is: {"  "}
              <a href={shortenUrl} target="_blank">
                {shortenUrl}
              </a>
            </p>
          ) : (
            <p>
              Enter A URL In the
              <br />
              Field Above And Press
              <br />
              Enter
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

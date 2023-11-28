"use client"
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import styles from "@styles/index.module.css";
import Image from "next/image";

const page = () => {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    generateQuote()
    const blob = document.getElementById("blob");

    window.onpointermove = event => { 
      const { clientX, clientY } = event;
      
      blob.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
      }, { duration: 3000, fill: "forwards" });
    }
  }, []);

  const [mode, setMode] = useState("dark")

  const changeMode = () => {
    if (mode === "dark") {
      document.body.classList.remove("dark")
      document.body.classList.add("light")
      localStorage.theme = "light"
      setMode("light")
    } else {
      document.body.classList.remove("light")
      document.body.classList.add("dark")
      localStorage.theme = "dark"
      setMode("dark")
    }
  }

  const [quote, setQuote] = useState()
  const [author, setAuthor] = useState()
  
  const generateQuote = async () => {
    const data = await fetch("https://api.themotivate365.com/stoic-quote", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())
    .then((data) =>{ 
      setQuote(data.quote)
      setAuthor(data.author)
    })}
    
  
  return (
    <div className={styles.mainContainer}>
        <div className="blob"> 
          <div id="blob"></div>
          <div id="blur"></div>
        </div>
      <div className={styles.buttonContainer}>
        <button
          type="button"
          className={"btn btn-primary " + styles.generateButton}
          onClick={() => generateQuote()}
        >

          Generate quote
        </button>
        <button className={"btn btn-secondary " + styles.darkButton} onClick={() => changeMode()}>
          {mode === "dark" ? <Image src="/dark-mode.png" width={20} height={20}></Image>:<Image src="/light-mode.png" width={20} height={20}></Image>}
        </button>
      </div>
        
      <h1 className={styles.quote}>{quote}</h1>
      <h2 className={styles.author}>{author}</h2>
    </div>
  )
}

export default page
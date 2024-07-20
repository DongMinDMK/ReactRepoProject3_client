import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";


function Test() {

    const [word, setWord] = useState("");

    useEffect(()=>{
        axios.get("/api/getWord")
        .then((result)=>{
            console.log(`result.data.word : `, result.data.word);
            setWord(result.data.word);
        })
        .catch((err)=>{
            console.error(err);
        })
    },[]
    )


  return (
    <h2>{word}</h2>
  )
}

export default Test
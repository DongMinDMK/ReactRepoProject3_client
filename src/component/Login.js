import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { useDispatch } from 'react-redux'; // **

import "../style/board.css";
import { loginAction } from "../store/userSlice";

function Login() {
    const [userid, setUserid] = useState("");
    const [pwd, setPwd] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch(); // 쓰기를 위한 함수 생성**

    const onsubmit = async()=>{
        if(userid === ""){
            return window.alert("아이디를 입력하세요");
        }
        if(pwd === ""){
            return window.alert("패스워드를 입력하세요");
        }

        try{
            const result = await axios.post("/api/members/login", {userid, pwd})
            if(result.data.message == "OK"){
            const res = await axios.get("/api/members/getLoginUser")
            dispatch(loginAction(res.data.loginUser))
            navigate("/main");
        }else{
            setMessage(result.data.message);
        }
        }catch(err){
            console.error(err);
        }
    };

  return (
    <div className="login">
      <form id="login-form">
        <div className="field">
            <label>USER ID</label>
            <input type="text" value={userid} onChange={(e)=>{
                setUserid(e.currentTarget.value)
            }}></input>
        </div>
        <div className="field">
            <label>PASSWORD</label>
            <input type="password" value={pwd} onChange={(e)=>{
                setPwd(e.currentTarget.value)
            }}></input>
        </div>
        <div className="btns">
            <input type="button" value="LOG IN" onClick={()=>{
                onsubmit();
            }}></input>
            <input type="button" value="JOIN" onClick={
                ()=>{navigate("/joinForm");}
            }></input>
        </div>
        <div>{message}</div>
      </form>
    </div>
  )
}

export default Login
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch } from "react-redux"
import { logoutAction } from '../../store/userSlice';
import '../../style/board.css';

function UserInfo() {
    // const [ loginUser, setLoginUser ] = useState({});
    let loginUser = useSelector(state=>state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch(); // 쓰기를 위한 함수 생성**

    useEffect(
        ()=>{
            // axios.get('/api/members/getLoginUser')
            // .then((result)=>{
            //     if( !result.data.loginUser ){
            //          alert('로그인이 필요한 서비스 입니다');
            //          navigate('/');
            //     }else{
            //          setLoginUser( result.data.loginUser );
            //     }
                
            // }).catch((err)=>{
            //     console.error(err);
            //     //navigate('/');
            // })

            if( !loginUser.userid ){
                alert('로그인이 필요한 서비스 입니다');
                navigate('/');
           }
        },[]
    );

    function onLogout(){
        dispatch(logoutAction());
        axios.get('/api/members/logout')
        .then(()=>{
            navigate('/');
        })
        .catch((err)=>{
            console.error(err);
        })
    }

  return (
    <div className='loginuser'>
        {
            (loginUser)?(
                <h3>{loginUser.userid}({loginUser.name})님 어서오세요 &nbsp;</h3>
            ):(null)
        }            
        <button onClick={ ()=>{ navigate('/memberupdate'); } }>회원정보수정</button>
        <button onClick={ ()=>{  onLogout();  } }>로그아웃</button>
        <button onClick={ ()=>{ navigate('/writeBoard'); }  }>게시글쓰기</button>
    </div>
  )
}

export default UserInfo
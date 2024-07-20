import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../store/userSlice';
import '../../style/board.css';

function WriteBoard() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [pass, setPass] = useState("");
    const [image, setImage] = useState("");
    const [savefilename, setSavefilename] = useState("");
    const [imgStyle, setImgStyle] = useState({display:'block'});
    const [imgSrc, setImgSrc] = useState('http://via.placeholder.com/200x150')
    const dispatch = useDispatch(); // 쓰기를 위한 함수 생성**
    const loginUser = useSelector(state=>state.user);
    const navigate = useNavigate();

    function onFileUpload(e){
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        axios.post("/api/boards/fileUpload", formData)
        .then((result)=>{
            setImgSrc(`http://localhost:8070/images/${result.data.savefilename}`);
            setImgStyle({width:"300px"});
            setImage(result.data.image);
            setSavefilename(result.data.savefilename);
        })
        .catch((err)=>{
            console.error(err);
        })
    }

    function onSubmit(){
        if(!pass){
             window.alert("비밀번호를 입력하세요");
        }

        if(!title){
             window.alert("게시글 제목을 입력하세요");
        }

        if(!content){
            window.alert("게시글 내용을 입력하세요");
        }

        axios.post("/api/boards/insertBoard", {userid:loginUser.userid, email:loginUser.email, pass:pass, title:title, content:content, image:image, savefilename:savefilename})
        .then(()=>{
            window.alert("게시글 등록이 정상적으로 완료되었습니다.");
            navigate("/main")
        })
        .catch((err)=>{
            console.error(err);
        })
        
    }

  return (
    <div className='writeBoard'>
            <h2>Board Write Form</h2>
            <div className='field'>
                <label>작성자</label><input type="text" value={loginUser.userid} readOnly/>
            </div>
            <div className='field'>
                <label>이메일</label><input type="text"  value={loginUser.email} readOnly/>
            </div>
            <div className='field'>
                <label>PASS</label><input type="password"  value={pass} onChange={
                    (e)=>{ setPass(e.currentTarget.value) }
                }/>
            </div>
            <div className='field'>
                <label>제목</label>
                <input type="text" value={title} onChange={
                    (e)=>{ setTitle( e.currentTarget.value ) }
                }/>
            </div>
            <div className='field'>
                <label>내용</label>
                <textarea rows="10" value={content} onChange={
                    (e)=>{ setContent( e.currentTarget.value ) }
                }></textarea>
            </div>
            <div className='field'>
                <label>이미지</label>
                <input type="file" onChange={(e)=>{ onFileUpload(e); }  }/>
                {/* e 를 전달인수로 전달해야 해당함수에서 방금 선택한 이미지를 인식할 수 있습니다. */}
            </div>
            <div className='field'>
                <label>이미지 미리보기</label>
                <div><img src={imgSrc} style={imgStyle} alt=""/></div>
            </div>
            <div className='btns'>
                <button onClick={ ()=>{ onSubmit() } }>작성완료</button>
                <button onClick={ ()=>{ navigate('/main') }}>돌아가기</button>
            </div>
        </div>
  )
}

export default WriteBoard
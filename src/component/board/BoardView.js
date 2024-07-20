import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../store/userSlice';

import '../../style/board.css';

function BoardView() {
    const [board, setBoard] = useState({});
    const dispatch = useDispatch(); // 쓰기를 위한 함수 생성**
    const loginUser = useSelector(state=>state.user);
    const navigate = useNavigate();
    const [replyList, setReplyList] = useState([]);
    const [curDateTime, setCurDataTime]=useState("");   // 07/11 10:45
    const [rContent, setRContent] = useState("");
    const {num} = useParams();

    useEffect(()=>{
        axios.get(`/api/boards/getBoard/${num}`)
        .then((result)=>{
            setBoard(result.data.board);
        })
        .catch((err)=>{
            console.error(err);
        })

        axios.get(`/api/boards/getReplyList/${num}`)
        .then((result)=>{
            setReplyList([...result.data.replyList]);
        })
        .catch((err)=>{
            console.error(err);
        })

        // 댓글 작성에 표시될 데이터(날짜) 생성
        const date = new Date();
        const months = String( date.getMonth()+1 ).padStart(2, '0');
        const days = String( date.getDate() ).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        setCurDataTime(`${months}/${days} ${hours}:${minutes}`);
    },[]
    )

    function deleteBoard(){

    }

    async function addReply(){
        // 댓글을 추가하고 
        // 다시 댓글을 조회
        try{
            await axios.post("/api/boards/addReply", {boardnum:num, userid:loginUser.userid, content:rContent})

            const result = await axios.get(`/api/boards/getReplyList/${num}`)
            setReplyList([...result.data.replyList]);
            
        }catch(err){
            console.error(err);
        }
        setRContent("");
    }

    async function deleteReply(replynum){
        try{
            await axios.get(`/api/boards/deleteReply/${replynum}`);

            const result = await axios.get(`/api/boards/getReplyList/${num}`);
            setReplyList([...result.data.replyList]);

        }catch(err){
            console.error(err);
        }
    }


  return (

    <div className='boardView'>
        <h2>Board View</h2>

            <div className='field'>

                <label>작성자</label><div>{board.userid}</div>

            </div>

            <div className='field'>

                <label>이메일</label><div>{board.email}</div>

            </div>

            <div className='field'>

                <label>조회수</label><div>{board.readcount}</div>

            </div>

            <div className='field'>

                <label>작성일자</label><div>{board.writedate}</div>

            </div>

            <div className='field'>

                <label>제목</label><div>{board.title}</div>

            </div>

            <div className='field'>

                <label>내용</label><div><pre>{board.content}</pre></div>

            </div>

            <div className='field'>

                <label>이미지</label>

                <div>

                    <img src={`http://localhost:8070/images/${board.savefilename}` } style={{width:"300px"}} />

                </div>

            </div>

            <div className='btns'>

                <button onClick={()=>{ navigate(`/updateBoard/${board.num}`) }}>수정</button>

                <button onClick={()=>{ deleteBoard( board.num ) }}>삭제</button>

                <button onClick={()=>{ navigate('/main') }}>돌아가기</button>

            </div><br /><br />

            <div className="head-row">

                <div className="head-col">작성일시</div><div className="head-col">작성자</div><div className="head-col">내용</div><div className="head-col"> </div>

            </div>

            <div className="new-reply-row">

                <div className="new-reply-col">{curDateTime}</div>

                <div className="new-reply-col">{loginUser.userid}</div>

                <div className="new-reply-col">

                    <input type="text" value={rContent} onChange={

                        (e)=>{ setRContent( e.currentTarget.value ) }

                    }/>

                </div>

                <div class="new-reply-col">

                    <button onClick={ ()=>{  addReply(); } }>댓글작성</button>

                </div>

            </div>

            {

                (replyList)?(

                    replyList.map((reply, idx)=>{

                        return (

                            <div key={idx} className="new-reply-row">

                                <div className="new-reply-col">{reply.writedate.substring(5,10)}</div>

                                <div className="new-reply-col">{reply.userid}</div>

                                <div className="new-reply-col">{reply.content}</div>

                                <div className="new-reply-col">

                                    {

                                        (loginUser.userid == reply.userid)?

                                        (<button onClick={()=>{deleteReply(reply.replynum)}}>삭제</button>):(null)

                                    }

                                </div>

                            </div>

                        )

                    })

                ):null

            }
        </div>
  )
}

export default BoardView
import './App.css';

import {  Routes, Route } from "react-router-dom";

import Login from './component/Login';
import Main from './component/Main';
import JoinForm from './component/member/JoinForm';
import MemberUpdate from './component/member/MemberUpdate.js';
import BoardView from './component/board/BoardView';
import WriteBoard from './component/board/WriteBoard';
// import UpdateBoard from './component/board/UpdateBoard';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/main" element={<Main />} />
            <Route path="/joinForm" element={<JoinForm />} />
            <Route path="/memberupdate" element={<MemberUpdate />} />
            <Route path="/boardView/:num" element={<BoardView />} />
            <Route path="/writeBoard" element={<WriteBoard />} />
            {/* <Route path="/updateBoard/:num" element={<UpdateBoard />} /> */}
            
        </Routes>
    );
}

export default App;
import React from 'react'
import UserInfo from './member/UserInfo';
import BoardList from "./board/BoardList";

function Main() {
  return (
    <div className='main'>
      <UserInfo />
      <BoardList></BoardList>
    </div>
  )
}

export default Main
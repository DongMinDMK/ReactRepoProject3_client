import {createSlice} from "@reduxjs/toolkit"
// slice 를 만들어 store에 담고 reducer(action) 로 store(slice) 의 상태를 업데이트합니다.
// 하나의 슬라이스에 여러 자료를 객체형식으로 담고, reducer 로 값을 관리합니다.
// reducer 안에는 여러가지 동작의 함수들이 담겨서 사용될 수 있습니다.

const initialState = { // loginUser에 관한 내용들
    userid:"",
    pwd:"",
    phone:"",
    email:"",
    name:"",
}

const userSlice = createSlice(
    {
        name : "user", // userSlice 안에 저장되는 저장객체의 이름
        initialState,
        reducers:{
            // state(user의 상태값) 값들을 변경할 수 있는 함수들
            loginAction : (state, action)=>{
                // 외부에서 전달되는 객체를 내부의 "user" 객체에 저장할건데
                // 외부에서 전달되는 객체를 이 안에서는 action 이라고 부르고,
                // "user" 객체는 state 라고 부릅니다.
                state.email = action.payload.email;
                state.pwd = action.payload.pwd;
                state.phone = action.payload.phone;
                state.userid = action.payload.userid;
                state.name = action.payload.name;
            },
            logoutAction : (state)=>{   
                state.userid = "";
                state.pwd = "";
                state.phone = "";
                state.email = "";
                state.name = "";
            },
        }
    }
);

export const {loginAction, logoutAction} = userSlice.actions;
export default userSlice;
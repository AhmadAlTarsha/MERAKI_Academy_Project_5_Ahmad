import { createSlice } from "@reduxjs/toolkit";



export const authSlice=createSlice({
    name:"auth",
    initialState:{
       token: null|| localStorage.getItem("token"),
       userId: null|| localStorage.getItem("userId"),
       isLoggedIn :localStorage.getItem("token")?true:false
    },
    reducers:{
        setLogin:(state,action)=>{
            state.token=action.payload
            state.isLoggedIn=true
            state.token=localStorage.setItem("token",action.payload)
          
        },
        setUserId:(state,action)=>{
            state.userId=action.payload
            state.userId=localStorage.setItem("userId",action.payload)
        },
        setLogout:(state)=>{
            state.token=null
            state.userId=null
            state.isLoggedIn=false
            localStorage.clear()

        },

    }


})


export const {setLogin,setLogout,setUserId}=authSlice.actions
export default authSlice.reducer
import { createSlice } from "@reduxjs/toolkit";
import { Registration } from "../../APIS/User/register";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      id: 0,
      fullName: "",
      nickName: "",
      token: "",
      email: "",
      image: "",
      role: 0,
      region: "",
    },
    localUser: {
      id: 0,
      token: "",
      isLoggedIn: false,
    },


   
  },
  reducers: {
    setLogin: (state, action) => {
      state.localUser = {
        id: action.payload.id,
        token: action.payload.token,
        isLoggedIn: true,
      };
      console.log("LOCAL USER ===> ", state.localUser);
      localStorage.setItem(
        "localUser",
        JSON.stringify({
          id: action.payload.id,
          token: action.payload.token,
          isLoggedIn: true,
        })
      );
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      state.user = {
        id: 0,
        fullName: "",
        nickName: "",
        token: "",
        email: "",
        image: "",
        role: 0,
        region: 0,
      };
      state.localUser = {
        token: "",
        id: 0,
        isLoggedIn: false,
      };
      localStorage.removeItem("localUser");
    },

    register: (state, action) => {
      console.log(action.payload);
      Registration(action.payload)
      .then((res) => {
      console.log("from redux",  res);
        
     
      
      })
    
      .catch((err) => {
        console.error("ERROR Register ==> ", err?.response?.data);
      });
    }
  },
});


export const { setLogin, setUser, setLogout, register } = authSlice.actions;
export default authSlice.reducer;

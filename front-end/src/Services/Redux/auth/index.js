import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const { setLogin, setUser, setLogout, setPosts } = authSlice.actions;
export default authSlice.reducer;

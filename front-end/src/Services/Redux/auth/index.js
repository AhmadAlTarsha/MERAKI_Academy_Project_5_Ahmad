import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Registration } from "../../APIS/User/register";
import { UserLogin } from "../../APIS/User/Login";
import { GetUser } from "../../APIS/User/GetUser";
import { UpdateUserAPI } from "../../APIS/User/UpdateUser";

export const registerUser = createAsyncThunk(
  "user/register",
  async (registration) => {
    return await Registration(registration);
  }
);

export const loginUser = createAsyncThunk("user/login", async (credentials) => {
  return await UserLogin(credentials);
});

export const getUser = createAsyncThunk("user/userInfo", async (id) => {
  return await GetUser(id);
});

export const updateUser = createAsyncThunk("user/userUpdate", async (data) => {
  return await UpdateUserAPI(data);
});

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
      role: 0,
    },
    errorMessage: {
      error: false,
      message: "",
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.errorMessage = {
          error: false,
          message: action.payload,
        };
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.errorMessage = {
          error: true,
          message: action.error,
        };
      })
      .addCase(loginUser.pending, (state) => {
        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.localUser = {
          id: action?.payload?.id,
          token: action?.payload?.token,
          isLoggedIn: true,
        };

        localStorage.setItem(
          "token",
          JSON.stringify({
            id: action?.payload?.id,
            token: action?.payload?.token,
          })
        );

        localStorage.setItem(
          "localUser",
          JSON.stringify({
            id: action?.payload?.id,
            token: action?.payload?.token,
            isLoggedIn: true,
          })
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.errorMessage = {
          error: true,
          message: "Email or Password is wrong",
        };
      })
      .addCase(getUser.pending, (state) => {
        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(getUser.fulfilled, (state, action) => {
        // console.log("GETTING USER ===> ", action.payload);
        state.user = {
          id: action?.payload?.user?.user_id,
          first_name: action?.payload?.user?.first_name,
          last_name: action?.payload?.user?.last_name,
          // fullName: `${action?.payload?.user?.first_name} ${action?.payload?.user?.last_name}`,
          nickName: action?.payload?.user?.nick_name,
          token: JSON.parse(localStorage?.getItem("token"))?.token,
          email: action?.payload?.user?.email,
          image: action?.payload?.user?.image,
          role: action?.payload?.user?.role_id,
          region: action?.payload?.user?.user_region,
        };
        localStorage.removeItem("localUser");
        localStorage.setItem(
          "localUser",
          JSON.stringify({
            id: action?.payload?.user?.user_id,
            token: JSON.parse(localStorage?.getItem("token"))?.token,
            isLoggedIn: true,
            role: action?.payload?.user?.role_id,
          })
        );
      })
      .addCase(getUser.rejected, (state, action) => {
        console.log("ERROR GETTING USER ===> ", action.payload);
        state.errorMessage = {
          error: true,
          message: "Something went wrong",
        };
      })
      .addCase(updateUser.pending, (state) => {
        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.errorMessage = {
          error: false,
          message: action.payload,
        };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.errorMessage = {
          error: true,
          message: action.payload,
        };
      });
  },
  reducers: {
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
        role: 0,
      };
      localStorage.removeItem("localUser");
    },
  },
});

export const { setLogout, setUser } = authSlice.actions;
export default authSlice.reducer;

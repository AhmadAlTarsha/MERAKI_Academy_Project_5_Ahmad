import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getChatsByConversation } from "../../APIS/Chats/Get_Chats";
import { sendMessage } from "../../APIS/Chats/Send_Message";
import { newConversation } from "../../APIS/Chats/AddConversation";
import { getConversations } from "../../APIS/Chats/Get_Conversations";

export const addConversationRedux = createAsyncThunk(
  "conversation",
  async (payload) => {
    return await newConversation(payload.providerId, payload.customerId);
  }
);

export const getConversationRedux = createAsyncThunk(
  "GetConversation",
  async (payload) => {
    return await getConversations();
  }
);

export const GetChatsByConversationId = createAsyncThunk(
  "all/chats",
  async (payload) => {
    return await getChatsByConversation(payload?.id);
  }
);

export const sendMessageRedux = createAsyncThunk(
  "sendmessage",
  async (payload) => {
    return await sendMessage(
      payload?.reciverId,
      payload?.message,
      payload?.conversationId
    );
  }
);

export const chatSlice = createSlice({
  name: "chats",
  initialState: {
    chats: [],
    conversations: [],
    conversation: {},
    errorMessage: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConversationRedux.pending, (state) => {
        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(getConversationRedux.fulfilled, (state, action) => {
        state.conversations = action.payload?.rows;
      })
      .addCase(getConversationRedux.rejected, (state, action) => {
        state.errorMessage = {
          error: true,
          message: action.payload,
        };
      });

    builder
      .addCase(addConversationRedux.pending, (state) => {
        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(addConversationRedux.fulfilled, (state, action) => {
        state.conversation = action.payload;
      })
      .addCase(addConversationRedux.rejected, (state, action) => {
        state.errorMessage = {
          error: true,
          message: action.payload,
        };
      });

    builder
      .addCase(GetChatsByConversationId.pending, (state) => {
        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(GetChatsByConversationId.fulfilled, (state, action) => {
        state.errorMessage = {
          error: false,
          message: "",
        };
        state.chats = action.payload;
      })
      .addCase(GetChatsByConversationId.rejected, (state, action) => {
        state.errorMessage = {
          error: true,
          message: action.error,
        };
      });

    builder
      .addCase(sendMessageRedux.pending, (state) => {
        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(sendMessageRedux.fulfilled, (state, action) => {
        state.errorMessage = {
          error: false,
          message: "Chat Sent",
        };
      })
      .addCase(sendMessageRedux.rejected, (state, action) => {
        state.errorMessage = {
          error: true,
          message: action.error,
        };
      });
  },
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
  },
});

export const { setChats } = chatSlice.actions;
export default chatSlice.reducer;

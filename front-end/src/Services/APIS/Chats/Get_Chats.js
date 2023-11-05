import axios from "axios";

export const getChatsByConversation = async (id) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.get(`https://tintin-bqtw.onrender.com/chats/${id}`, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
    });

    if (!result?.data?.error) {
      return result?.data?.messages;
    }
  } catch (err) {
    throw err;
  }
};

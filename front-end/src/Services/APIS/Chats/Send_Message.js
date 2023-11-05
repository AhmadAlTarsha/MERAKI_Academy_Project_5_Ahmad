import axios from "axios";

export const sendMessage = async (reciver_id, message, conversationId) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};

  try {
    const result = await axios.post(
      `http://95.179.236.103:8080/api/chats/${conversationId}`,
      {
        reciver_id,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token?.token}`,
        },
      }
    );

    if (!result?.data?.error) {
      return result?.data?.message;
    }
  } catch (err) {
    throw err;
  }
};

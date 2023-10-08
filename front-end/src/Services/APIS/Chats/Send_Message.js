import axios from "axios";

export const sendMessage = async (reciverId, message, conversationId) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};

  try {
    const result = await axios.post(
      `http://localhost:5000/chats/${conversationId}`,
      {
        reciverId,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token?.token}`,
        },
      }
    );

    if (!result?.data?.error) {
      return result?.data;
    }
  } catch (err) {
    throw err;
  }
};

import axios from "axios";

export const sendMessage = async (reciver_id, message, conversationId) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};

  try {
    const result = await axios.post(
      `http://18.189.43.98:5000/chats/${conversationId}`,
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

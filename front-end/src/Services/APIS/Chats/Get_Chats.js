import axios from "axios";

export const getChatsByConversation = async (id) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.get(`http://18.189.43.98:5000/chats/${id}`, {
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

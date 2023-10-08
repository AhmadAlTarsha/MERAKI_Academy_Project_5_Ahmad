import axios from "axios";

export const getChatsByConversation = async (id) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.get(`http://localhost:5000/chats/${id}`, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
    });

    if (!result?.data?.error) {
      return result?.data?.chats;
    }
  } catch (err) {
    throw err;
  }
};

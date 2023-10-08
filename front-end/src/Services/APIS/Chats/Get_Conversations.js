import axios from "axios";

export const getConversations = async () => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};

  try {
    const result = await axios.get("http://localhost:5000/chats", {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
    });

    if (!result?.data?.error) {
      return result?.data?.conversations;
    }
  } catch (err) {
    throw err;
  }
};

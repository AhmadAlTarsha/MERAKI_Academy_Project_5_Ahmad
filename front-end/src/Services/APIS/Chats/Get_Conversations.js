import axios from "axios";

export const getConversations = async () => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};

  try {
    const result = await axios.get(`http://18.189.43.98:5000/m/chats`, {
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

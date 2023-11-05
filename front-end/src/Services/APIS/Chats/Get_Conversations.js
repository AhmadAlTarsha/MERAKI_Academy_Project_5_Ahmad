import axios from "axios";

export const getConversations = async () => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};

  try {
    const result = await axios.get(`http://95.179.236.103:8080/api/chats`, {
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

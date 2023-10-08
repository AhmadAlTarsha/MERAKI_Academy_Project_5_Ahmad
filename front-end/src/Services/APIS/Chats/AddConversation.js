import axios from "axios";

export const newConversation = async (providerId, customerId) => {
  try {
    const result = await axios.post(`http://localhost:5000/chats`, {
      providerId,
      customerId,
    });

    if (!result?.data?.error) {
      return result?.data;
    }
  } catch (err) {
    console.log("ERROR ===> ", err);
    throw err;
  }
};

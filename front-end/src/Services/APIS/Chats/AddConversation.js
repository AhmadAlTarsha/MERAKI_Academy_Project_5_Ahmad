import axios from "axios";

export const newConversation = async (provider_id, customer_id) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.post(`http://95.179.236.103:8080/api/chats`, {
      provider_id,
      customer_id,
    }, {
      headers : {
        Authorization: `Bearer ${token?.token}`
      }
    });

    if (!result?.data?.error) {
      return result?.data;
    }
  } catch (err) {
    console.log("ERROR ===> ", err);
    throw err;
  }
};

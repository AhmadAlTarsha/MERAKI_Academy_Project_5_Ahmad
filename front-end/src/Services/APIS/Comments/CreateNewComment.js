import axios from "axios";
export const CreateNewComment = async (id, payload) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.post(
      `http://95.179.236.103:8080/api/comment/${id}`,
      payload,
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

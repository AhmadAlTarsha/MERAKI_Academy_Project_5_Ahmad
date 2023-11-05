import axios from "axios";

export const CreateNewPost = async (payload) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};

  try {
    const result = await axios.post(`https://tintin-bqtw.onrender.com/posts`, payload, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
        "Content-Type": "multipart/form-data"
      },
    });
    if (!result?.data?.error) {
      return result?.data?.message;
    }
  } catch (err) {
    throw err;
  }
};

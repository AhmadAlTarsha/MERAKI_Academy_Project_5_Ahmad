import axios from "axios";

export const UpdatePost = async (id, paylode) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.put(
      `https://tintin-bqtw.onrender.com/m/posts/${id}`,
      paylode,
      {
        headers: {
          Authorization: `Bearer ${token?.token}`,
        },
      }
    );

    if (!result.data?.error) {
      return result?.data?.message;
    }
  } catch (err) {
    throw err;
  }
};

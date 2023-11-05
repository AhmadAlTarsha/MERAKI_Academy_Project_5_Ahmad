import axios from "axios";

export const UpdatePost = async (id, paylode) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.put(
      `http://95.179.236.103:8080/api/posts/${id}`,
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

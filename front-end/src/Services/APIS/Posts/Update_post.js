import axios from "axios";

export const UpdatePost = async (id, paylpde) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    console.log("from Api", paylpde);
    const result = await axios.put(
      `http://localhost:5000/posts/${id}/?limit=3&offset=1&is_deleted=0`,
      paylpde,
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

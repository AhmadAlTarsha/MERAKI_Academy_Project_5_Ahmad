import axios from "axios";

export const DeleteRegion = async (id, is_deleted) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.delete(
      `https://tintin-bqtw.onrender.com/regions/${id}/${is_deleted}`,
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

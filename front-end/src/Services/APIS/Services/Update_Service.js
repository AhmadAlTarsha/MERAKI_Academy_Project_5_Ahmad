import axios from "axios";

export const UpdateServiceStatus = async (id, status) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.put(
      `https://tintin-bqtw.onrender.com/services/${id}/${status}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token?.token}`,
          "Content-Type": "multipart/form-data",
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

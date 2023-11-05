import axios from "axios";

export const UpdateServiceStatus = async (id, status) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.put(
      `http://95.179.236.103:8080/api/services/${id}/${status}`,
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

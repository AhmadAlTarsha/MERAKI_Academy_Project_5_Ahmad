import axios from "axios";

export const DeleteServices = async (id, is_deleted) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.delete(
      `http://95.179.236.103:8080/api/services/delete/${id}/${is_deleted}`,
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

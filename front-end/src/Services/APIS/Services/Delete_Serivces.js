import axios from "axios";

export const DeleteServices = async (id, is_deleted) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.delete(
      `http://localhost:5000/services/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token?.token}`,
        },
        data: {
          active: is_deleted,
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

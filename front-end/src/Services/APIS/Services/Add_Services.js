import axios from "axios";

export const addNewServices = async (payload) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.post(
      `http://95.179.236.103:8080/api/services`,
      {
        category_id: payload.category_id,
        sub_category_id: payload.sub_category_id,
        title: payload.title,
        description: payload.description,
        image: payload.image,
      },
      {
        headers: {
          Authorization: `Bearer ${token?.token}`,
          "Content-Type": "multipart/form-data",
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

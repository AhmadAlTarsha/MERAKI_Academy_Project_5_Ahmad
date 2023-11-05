import axios from "axios";
export const UpdateCategory = async (id, payload) => {
const token = JSON.parse(localStorage.getItem("token")) ?? {};

  try {
    const result = await axios.put(
      `http://95.179.236.103:8080/api/categories/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token?.token}`,
          "Content-Type": "multipart/form-data"
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

export const UpdateSubCategory = async (id, payload) => {
const token = JSON.parse(localStorage.getItem("token")) ?? {};

  try {
    const result = await axios.put(
      `http://95.179.236.103:8080/api/subcategories/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token?.token}`,
          "Content-Type": "multipart/form-data"
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

import axios from "axios";
export const UpdateCategory = async (id, payload) => {
const token = JSON.parse(localStorage.getItem("token")) ?? {};

  try {
    const result = await axios.put(
      `https://tintin-bqtw.onrender.com/categories/${id}`,
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
      `https://tintin-bqtw.onrender.com/subcategories/${id}`,
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

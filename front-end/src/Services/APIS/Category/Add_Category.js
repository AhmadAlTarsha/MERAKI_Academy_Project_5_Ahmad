import axios from "axios";

export const AddCategory = async (payload) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.post(
      `https://tintin-bqtw.onrender.com/categories`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token?.token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (!result.data?.error) {
      return result.data?.message;
    }
  } catch (err) {
    throw err;
  }
};

export const AddSubCategory = async (payload) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};

  try {
    const result = await axios.post(
      `https://tintin-bqtw.onrender.com/subcategories`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token?.token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (!result.data?.error) {
      return result.data?.message;
    }
  } catch (err) {
    throw err;
  }
};

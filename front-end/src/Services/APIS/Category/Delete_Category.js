import axios from "axios";

export const DeleteCategories = async (id, is_deleted) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.delete(
      `http://95.179.236.103:8080/api/categories/${id}/${is_deleted}`,
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

export const DeleteSubCategories = async (id, is_deleted) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.delete(
      `http://95.179.236.103:8080/api/subcategories/${id}/${is_deleted}`,
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

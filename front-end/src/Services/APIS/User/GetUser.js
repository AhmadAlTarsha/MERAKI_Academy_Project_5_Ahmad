import axios from "axios";

export const GetUser = async (id) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.get(`https://tintin-bqtw.onrender.com/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
    });

    return result?.data;

  } catch (err) {
    throw err;
  }
};

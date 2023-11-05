import axios from "axios";

export const GetUser = async (id) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.get(`http://95.179.236.103:8080/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
    });

    return result?.data;

  } catch (err) {
    throw err;
  }
};

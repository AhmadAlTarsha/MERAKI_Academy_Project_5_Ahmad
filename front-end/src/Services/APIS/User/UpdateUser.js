import axios from "axios";

export const UpdateUserAPI = async (payload) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.put(
      `https://tintin-bqtw.onrender.com/users/${payload?.id}`,
      {
        ...payload,
        nick_name: payload.nickName,
      },
      {
        headers: {
          Authorization: `Bearer ${token?.token}`,
        },
      }
    );

    if (result?.status === 200) {
      if (!result.data.error) {
        return result?.data?.message;
      }
    }
  } catch (err) {
    throw err;
  }
};

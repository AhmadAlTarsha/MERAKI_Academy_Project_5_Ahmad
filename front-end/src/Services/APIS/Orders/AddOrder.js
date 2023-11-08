import axios from "axios";

export const addOrderAPI = async (payload) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  let url = `http://18.189.43.98:5000/orders`;

  try {
    const result = await axios.post(
      url,
      {
        serverices_provider_id: payload.provider_id,
        sub_category_id: payload.sub_category_id,
        review: "REVIEW",
      },
      {
        headers: {
          Authorization: `Bearer ${token?.token}`,
        },
      }
    );

    if (!result.data?.error) {
      return result.data;
    }
  } catch (err) {
    throw err;
  }
};

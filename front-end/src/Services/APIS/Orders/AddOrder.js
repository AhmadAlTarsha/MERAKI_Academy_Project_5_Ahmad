import axios from "axios";

export const addOrderAPI = async (payload) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  let url = `http://3.134.111.211:5000/orders`;

  try {
    const result = await axios.post(
      url,
      {
        provider_id: payload.provider_id,
        service_id: payload.service_id,
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

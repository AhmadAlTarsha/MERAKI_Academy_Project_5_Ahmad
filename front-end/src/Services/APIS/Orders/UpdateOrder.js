import axios from "axios";

export const UpdateOrderStatus = async (id, status) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};

  let url = `http://3.134.111.211:5000/orders/${id}/${status}`;

  try {
    const result = await axios.put(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token?.token}`,
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

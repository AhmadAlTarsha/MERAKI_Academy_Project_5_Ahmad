import axios from "axios";

export const GetAllRegions = async (limit, offset) => {
  try {
    const result = await axios.get(
      `http://localhost:5000/regions?limit=${limit}&offset=${offset}`
    );
    if (!result?.data?.error) {
      return result?.data;
    }
  } catch (err) {
    throw err;
  }
};

import axios from "axios";

export const GetAllRegions = async (limit, offset) => {
  try {
    const result = await axios.get(
      `https://tintin-bqtw.onrender.com/regions?limit=${limit}&offset=${offset}`
    );
    if (!result?.data?.error) {
      return result?.data?.regions;
    }
  } catch (err) {
    throw err;
  }
};

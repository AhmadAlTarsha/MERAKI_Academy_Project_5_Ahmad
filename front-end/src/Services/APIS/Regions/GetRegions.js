import axios from "axios";

export const GetAllRegions = async (limit, offset) => {
  try {
    const result = await axios.get(
      `http://18.189.43.98:5000/regions?limit=${limit}&offset=${offset}`
    );
    if (!result?.data?.error) {
      return result?.data?.regions;
    }
  } catch (err) {
    throw err;
  }
};

import axios from "axios";

export const GetAllRegions = async (limit, offset) => {
  try {
    const result = await axios.get(
      `http://95.179.236.103:8080/api/regions?limit=${limit}&offset=${offset}`
    );
    if (!result?.data?.error) {
      return result?.data?.regions;
    }
  } catch (err) {
    throw err;
  }
};

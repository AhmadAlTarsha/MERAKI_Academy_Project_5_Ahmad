import axios from "axios";

export const Registration = async (payload) => {
  try {
    const result = await axios.post(
      `https://tintin-bqtw.onrender.com/users/register`,
      payload
    );
    console.log("from Api", result);

    if (result?.status === 200) {
      if (!result?.data?.error) {
        return result?.data;
      }
    }
  } catch (err) {
    console.log(err.response.data);
    throw err;
  }
};
export const GetAllRoles = async () => {
  try {
    const result = await axios.get(`https://tintin-bqtw.onrender.com/roles`);
    if (!result?.data?.error) {
        console.log(result);
      return result?.data;
    } 
    
  } catch (err) {
    throw err;
  }
};
import axios from "axios";
export const UserLogin = async (payload) => {

  try {
    const result = await axios.post(`http://localhost:5000/users/login`, {
      ...payload,
    });

    if (result?.status === 200) {
      if (!result.data.error) {
        return result.data;
      }
     
    }
  } catch (err) {
    throw err;
  }
};

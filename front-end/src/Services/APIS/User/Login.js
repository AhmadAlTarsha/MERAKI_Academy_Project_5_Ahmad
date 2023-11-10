import axios from "axios";
export const UserLogin = async (payload) => {

  try {
    const result = await axios.post(`http://3.134.111.211:5000/users/login`, {
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

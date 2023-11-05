import axios from "axios";
export const UserLogin = async (payload) => {

  try {
    const result = await axios.post(`http://95.179.236.103:8080/api/users/login`, {
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

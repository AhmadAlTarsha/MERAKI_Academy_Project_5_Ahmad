import axios from "axios";
const localUser = JSON.parse(localStorage.getItem("localUser")) ?? {};

export const GetUser = async (id) => {
  
  try {
    const result = await axios.get(`http://localhost:5000/users/${id}`, {
      headers: {
         Authorization: `Bearer ${localUser?.token}`,
      
      },
    });

    return result.data;
  } catch (err) {
    throw err;
  }
};


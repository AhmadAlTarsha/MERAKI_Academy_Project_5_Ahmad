import axios from "axios";

export const GetAllPosts = async (limit, offset, isDeleted) => {
  console.log(limit, offset, isDeleted);
  try {
    const result = await axios.get(
      `http://localhost:5000/posts/post/?limit=${limit}&offset=${offset}&is_deleted=${isDeleted}`
    );
    if (!result?.data?.error) {
      return result?.data?.posts;
    }
  } catch (err) {
    console.log("ERROR ==> ", err);
    throw err;
  }
};

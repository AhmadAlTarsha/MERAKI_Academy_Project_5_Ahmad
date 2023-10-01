import axios from "axios";

export const GetAllPosts = async () => {
  try {
    const result = await axios.get(`http://localhost:5000/posts/post/0`);
    if (!result.data.error) {
      return result.data.posts;
    } 
    
  } catch (err) {
    throw err;
  }
};

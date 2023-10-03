import axios from "axios";

export const GetAllPosts = async (limit, offset, isDeleted) => {
  let url = ``;
  if (!limit && !offset && !isDeleted) {
    url = `http://localhost:5000/posts/post/`;
  } else if (limit && offset && !isDeleted) {
    url = `http://localhost:5000/posts/post/?limit=${limit}&offset=${offset}`;
  } else if (limit && offset && isDeleted) {
    url = `http://localhost:5000/posts/post/?limit=${limit}&offset=${offset}&is_deleted=${isDeleted}`;
  }

  try {
    const result = await axios.get(url);
    if (!result?.data?.error) {
      return result?.data?.posts;
    }
  } catch (err) {
    console.log("ERROR ==> ", err);
    throw err;
  }
};

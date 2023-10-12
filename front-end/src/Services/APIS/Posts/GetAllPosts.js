import axios from "axios";
export const GetAllPosts = async (
  limit,
  offset,
  categoryId,
  subCategoryId,
  isDeleted
) => {
const token = JSON.parse(localStorage.getItem("token")) ?? {};

  //Admin
  let url = ``;
  //Admin

  // Webiste
  if (categoryId > 0) {
    url = `http://localhost:5000/posts/post/?limit=${limit}&offset=${offset}&is_deleted=0&category=${categoryId}`;
  } else if (subCategoryId > 0) {
    url = `http://localhost:5000/posts/post/?limit=${limit}&offset=${offset}&is_deleted=0&sub_category=${subCategoryId}`;
  } else if (isDeleted === 0) {
    url = `http://localhost:5000/posts/post/?limit=${limit}&offset=${offset}&is_deleted=0`;
  } else {
    url = `http://localhost:5000/posts/post/?limit=${limit}&offset=${offset}`;
  }

  console.log("URL ===> ", url);
  // Webiste

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

export const GetCommentsByPost = async (postId) => {
const token = JSON.parse(localStorage.getItem("token")) ?? {};

  let url = `http://localhost:5000/comment/${postId}`;

  try {
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
    });
    if (!result?.data?.error) {
      return result?.data?.comments;
    }
  } catch (err) {
    console.log("ERROR ==> ", err);
    throw err;
  }
};

export const GetPostsByUserId = async (limit, offset, active) => {
const token = JSON.parse(localStorage.getItem("token")) ?? {};

  let url = `http://localhost:5000/posts/${token.id}?limit=${limit}&offset=${offset}&active=${active}`;

  try {
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
    });

    if (!result?.data?.error) {
      return result?.data?.posts;
    }
  } catch (err) {
    throw err;
  }
};

export const GetPost = async (id) => {
const token = JSON.parse(localStorage.getItem("token")) ?? {};

  //Admin
  let url = `http://localhost:5000/posts/post/${id}`;

  try {
    const result = await axios.get(url);
    if (!result?.data?.error) {
      return result?.data?.post;
    }
  } catch (err) {
    console.log("ERROR ==> ", err);
    throw err;
  }
};

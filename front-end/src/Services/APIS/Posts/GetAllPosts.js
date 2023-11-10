import axios from "axios";
export const GetAllPosts = async (limit, offset, isDeleted) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};

  let url = ``;
  if (isDeleted === 0) {
    url = `http://3.134.111.211:5000/posts?limit=${limit}&offset=${offset}&is_deleted=0`;
  } else {
    url = `http://3.134.111.211:5000/posts?limit=${limit}&offset=${offset}`;
  }

  try {
    const result = await axios.get(url);
    if (!result?.data?.error) {
      return result?.data?.posts;
    }
  } catch (err) {
    throw err;
  }
};

export const GetAllPostsOnCategory = async (
  limit,
  offset,
  category_id,
  isDeleted
) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};

  let url = `http://3.134.111.211:5000/posts/category/${category_id}?limit=${limit}0&offset=${offset}&is_deleted=0`;

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

export const GetAllPostsOnSubCategory = async (
  limit,
  offset,
  category_id,
  isDeleted
) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};

  let url = `http://3.134.111.211:5000/posts/sub_category/${category_id}?limit=${limit}0&offset=${offset}&is_deleted=0`;

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

export const GetCommentsByPost = async (postId, limit, offset) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};

  let url = `http://3.134.111.211:5000/comment/${postId}?limit=${limit}&offset=${offset}&is_deleted=0`;

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
    throw err;
  }
};

export const GetPostsByUserId = async (limit, offset) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};

  let url = `http://3.134.111.211:5000/posts/user/${token.id}?limit=${limit}&offset=${offset}&is_deleted=0`;

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
    console.error(err);
    throw err;
  }
};

export const GetPost = async (id) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};

  //Admin
  let url = `http://3.134.111.211:5000/posts/${id}`;

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

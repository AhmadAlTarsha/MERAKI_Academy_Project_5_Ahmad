import axios from "axios";

export const GetAllPosts = async (
  limit,
  offset,
  categoryId,
  subCategoryId,
  isDeleted
) => {
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
  let url = `http://localhost:5000/comment/${postId}`;

  try {
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJyZWdpb25faWQiOjEsInJvbGVfaWQiOjEsImZpcnN0X25hbWUiOiJJYnJhaGltIiwibGFzdF9uYW1lIjoiSHVzaGtpIiwibmlja19uYW1lIjoiaWJvIiwiZW1haWwiOiJpYnJhaG9tQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHh6WEs3azFlS3RubkxNRDcvSVFieHV5Mk9HeTBpVVljMzVsRmVvaGNyMktWc0M1ZUg3Q1JtIiwiYWN0aXZlIjoxLCJpc19kZWxldGVkIjowLCJsb25ndGl0dWRlIjowLCJsYW5ndGl0dWRlIjowLCJpbWFnZSI6ImRlZmF1bHRVc2VyLnBuZyIsImNyZWF0ZWRfYXQiOiIyMDIzLTA5LTI1VDE1OjU2OjMyLjM3MVoiLCJyZWdpb24iOiJLSEFMREEiLCJwZXJtaXNzaW9ucyI6WyJVU0VSX0NPTlRST0wiLCJDT01NRU5UX0NPTlRST0wiLCJTRVJWSUNFX0NPTlRST0wiLCJQT1NUX0NPTlRST0wiLCJPUkRFUl9DT05UUk9MIiwiQ0FURUdPUllfQ09OVFJPTCJdfSwiaWF0IjoxNjk2Mjc3ODA3LCJleHAiOjE2OTY4ODI2MDd9.5Fs1TxfNpzDgqpj-vsmiUVuWWuejgkF1mxidksLhPLg`,
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

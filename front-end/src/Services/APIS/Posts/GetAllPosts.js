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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0MywicmVnaW9uX2lkIjo1LCJyb2xlX2lkIjozLCJmaXJzdF9uYW1lIjoicmFlZCIsImxhc3RfbmFtZSI6ImFkbmFuIiwibmlja19uYW1lIjoiYmhlcnkiLCJlbWFpbCI6IndAd3d3IiwicGFzc3dvcmQiOiIkMmIkMTAkMkpCU3VhVmFiMlUvZHRNcXUzN2VjT1Fxell0MTYzZWtzWklKUW52RC4vVUJzRUpReFhGdzIiLCJhY3RpdmUiOjEsImlzX2RlbGV0ZWQiOjAsImxvbmd0aXR1ZGUiOjAsImxhbmd0aXR1ZGUiOjAsImltYWdlIjoiZGVmYXVsdFVzZXIucG5nIiwiY3JlYXRlZF9hdCI6IjIwMjMtMTAtMDhUMTc6MDc6NDYuOTA5WiIsInJlZ2lvbiI6ImtoYWxkYSIsInBlcm1pc3Npb25zIjpbIlVTRVJfQ09OVFJPTCIsIkNPTU1FTlRfQ09OVFJPTCIsIlNFUlZJQ0VfQ09OVFJPTCIsIlBPU1RfQ09OVFJPTCIsIk9SREVSX0NPTlRST0wiLCJDQVRFR09SWV9DT05UUk9MIl19LCJpYXQiOjE2OTY3OTU4OTIsImV4cCI6MTY5NzQwMDY5Mn0.uHMS1HK2mDM3Nv77jhYYVS1-rVa8y6uKAyNp-nkCOD0`,
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

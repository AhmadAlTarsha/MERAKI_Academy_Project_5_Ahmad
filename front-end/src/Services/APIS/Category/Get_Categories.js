import axios from "axios";
/*  CATEGORIES */
export const GetCategories = async (limit, offset, is_deleted) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  let url = ``;

  //Admin

  //Admin

  //Website
  if (is_deleted === 0) {
    url = `http://localhost:5000/categories?limit=${limit}&offset=${offset}&is_deleted=${is_deleted}`;
  } else {
    url = `http://localhost:5000/categories?limit=${limit}&offset=${offset}`;
  }
  //Website

  try {
    const result = await axios.get(url);

    if (!result.data?.error) {
      return result.data;
    }
  } catch (err) {
    throw err;
  }
};

export const getCategory = async (id) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.get(`http://localhost:5000/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
    });

    if (!result.data?.error) {
      return result.data;
    }
  } catch (err) {
    throw err;
  }
};
/*  CATEGORIES */

/*  SUB CATEGORIES */

export const GetSubCategories = async (limit, offset, is_deleted) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  let url = ``;
  if (is_deleted === 0) {
    url = `http://localhost:5000/subcategories?limit=${limit}&offset=${offset}&is_deleted=${is_deleted}`;
  } else {
    url = `http://localhost:5000/subcategories?limit=${limit}&offset=${offset}`;
  }
  //Website
  try {
    const result = await axios.get(url);

    if (!result.data?.error) {
      return result.data;
    }
  } catch (err) {
    throw err;
  }
};

export const GetSubCategoriesOnCategory = async (id) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.get(`http://localhost:5000/subcategories/${id}`);

    if (!result?.data?.error) {
      return result.data;
    }
  } catch (err) {
    throw err;
  }
};

export const getSubCategory = async (id) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.get(
      `http://localhost:5000/subcategories/category/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token?.token}`,
        },
      }
    );

    if (!result?.data.error) {
      return result?.data;
    }
  } catch (err) {
    throw err;
  }
};
/*  SUB CATEGORIES */

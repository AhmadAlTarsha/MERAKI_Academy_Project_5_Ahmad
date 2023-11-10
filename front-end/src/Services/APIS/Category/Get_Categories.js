import axios from "axios";
/*  CATEGORIES */
export const GetCategories = async (limit, offset, is_deleted) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  let url = ``;

  if (is_deleted === 0) {
    url = `http://3.134.111.211:5000/categories?limit=${limit}&offset=${offset}&is_deleted=${is_deleted}`;
  } else {
    url = `http://3.134.111.211:5000/categories?limit=${limit}&offset=${offset}`;
  }

  try {
    const result = await axios.get(url);

    if (!result.data?.error) {

      return result?.data?.categories;
    }
  } catch (err) {
    throw err;
  }
};

export const getCategory = async (id) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.get(`http://3.134.111.211:5000/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
    });

    if (!result?.data?.error) {
      return result?.data?.Category;
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
    url = `http://3.134.111.211:5000/subcategories?limit=${limit}&offset=${offset}&is_deleted=${is_deleted}`;
  } else {
    url = `http://3.134.111.211:5000/subcategories?limit=${limit}&offset=${offset}`;
  }
  //Website
  try {
    const result = await axios.get(url);

    if (!result?.data?.error) {
      return result?.data?.subCategories;
    }
  } catch (err) {
    throw err;
  }
};

export const GetSubCategoriesOnCategory = async (
  limit,
  offset,
  category_id,
  isDeleted
) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.get(
      `http://3.134.111.211:5000/subcategories/category/?perPage=${limit}&currentPage=${offset}&is_deleted=0&category_id=${category_id}`
    );

    if (!result?.data?.error) {
      return result?.data?.subCategories;
    }
  } catch (err) {
    throw err;
  }
};

export const getSubCategory = async (id) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.get(
      `http://3.134.111.211:5000/subcategories/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token?.token}`,
        },
      }
    );

    if (!result?.data?.error) {
      return result?.data?.Category;
    }
  } catch (err) {
    throw err;
  }
};
/*  SUB CATEGORIES */

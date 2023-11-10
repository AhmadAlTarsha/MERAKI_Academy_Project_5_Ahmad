import axios from "axios";

export const getAllServices = async (limit, offset, isDeleted) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  let url = "";

  if (isDeleted === 0) {
    url = `http://3.134.111.211:5000/services?limit=${limit}&offset=${offset}&is_deleted=0`;
  } else {
    url = `http://3.134.111.211:5000/services?limit=${limit}&offset=${offset}`;
  }

  try {
    const result = await axios.get(url);

    if (!result?.data?.error) {
      return result?.data?.services;
    }
  } catch (err) {
    throw err;
  }
};

export const getAllServicesOnCategory = async (
  category_id,
  limit,
  offset,
  isDeleted
) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  let url = `http://3.134.111.211:5000/services/category/${category_id}?is_deleted=0&status_id=2&offset=${offset}&limit=${limit}`;
  // if (isDeleted === 0) {
  //   url += `?is_deleted=0&limit=${limit}&offset=${offset}`;
  // }

  // url += `?limit=${limit}&offset=${offset}`;

  try {
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
    });

    if (!result?.data?.error) {
      return result?.data?.services;
    }
  } catch (err) {
    throw err;
  }
};

export const getAllServicesOnSubCategory = async (
  category_id,
  limit,
  offset,
  isDeleted
) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  let url = `http://3.134.111.211:5000/services/subcategory/${category_id}?is_deleted=0&status_id=2&offset=${offset}&limit=${limit}`;
  // if (isDeleted === 0) {
  //   url += `?is_deleted=0&limit=${limit}&offset=${offset}`;
  // }

  // url += `?limit=${limit}&offset=${offset}`;

  try {
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
    });

    if (!result?.data?.error) {
      return result?.data?.services;
    }
  } catch (err) {
    throw err;
  }
};

export const getServicesOnUser = async (limit, offset) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.get(
      `http://3.134.111.211:5000/services/provider/${token?.id}?limit=${limit}&offset=${offset}&is_deleted=0`,
      {
        headers: {
          Authorization: `Bearer ${token?.token}`,
        },
      }
    );

    if (!result?.data?.error) {
      return result?.data?.services;
    }
  } catch (err) {
    throw err;
  }
};

export const getSerivce = async (id) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.get(`http://3.134.111.211:5000/services/${id}`, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
    });

    if (!result?.data?.error) {
      return result?.data?.serverices;
    }
  } catch (err) {
    throw err;
  }
};

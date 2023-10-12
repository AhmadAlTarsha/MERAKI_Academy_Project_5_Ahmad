import axios from "axios";

export const getAllServices = async (limit, offset, isDeleted) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  let url = "";

  if (!isDeleted && !limit && !offset) {
    url = "http://localhost:5000/services";
  } else if (!isDeleted && limit && offset) {
    url = `http://localhost:5000/services?limit=${limit}&offset=${offset}`;
  } else if (isDeleted && limit && offset) {
    url = `http://localhost:5000/services?is_deleted=${isDeleted}&limit=${limit}&offset=${offset}`;
  }

  try {
    const result = await axios.get(url);

    if (!result?.data?.error) {
      return result?.data?.serverices;
    }
  } catch (err) {
    throw err;
  }
};

export const getAllServicesOnCategory = async (isDeleted, limit, offset) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  let url = "http://localhost:5000/services";
  if (isDeleted === 0) {
    url += `?is_deleted=0&limit=${limit}&offset=${offset}`;
  }

  url += `?limit=${limit}&offset=${offset}`;

  try {
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
    });

    if (!result?.data?.error) {
      return result?.serverices;
    }
  } catch (err) {
    throw err;
  }
};

export const getAllServicesOnSubCategory = async (isDeleted, limit, offset) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  let url = "http://localhost:5000/services";
  if (isDeleted === 0) {
    url += `?is_deleted=0&limit=${limit}&offset=${offset}`;
  }

  url += `?limit=${limit}&offset=${offset}`;

  try {
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
    });

    if (!result?.data?.error) {
      return result?.serverices;
    }
  } catch (err) {
    throw err;
  }
};

export const getServicesOnUser = async (limit, offset) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.get(
      `http://localhost:5000/services/services/${token.id}?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${token?.token}`,
        },
      }
    );

    if (!result?.data?.error) {
      return result?.data?.serverices;
    }
  } catch (err) {
    throw err;
  }
};

export const getSerivce = async (id) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  try {
    const result = await axios.get(`http://localhost:5000/services/${id}`, {
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

import axios from "axios";

/*  CATEGORIES */
export const GetCategories = async (limit, offset, is_deleted) => {
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
  try {
    const result = await axios.get(`http://localhost:5000/categories/${id}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozOSwicmVnaW9uX2lkIjozLCJyb2xlX2lkIjozLCJmaXJzdF9uYW1lIjoicmFlZCIsImxhc3RfbmFtZSI6ImFkbmFuIiwibmlja19uYW1lIjoiYmhlcnkiLCJlbWFpbCI6InJlYWRAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkRW9kd1lWN0IwYVJZV0ZQR0w4c3pXLmEyUkNTWXFTbWliYk1SS3lGQTVYaUozZFI5VHlkaC4iLCJhY3RpdmUiOjEsImlzX2RlbGV0ZWQiOjAsImxvbmd0aXR1ZGUiOjAsImxhbmd0aXR1ZGUiOjAsImltYWdlIjoiZGVmYXVsdFVzZXIucG5nIiwiY3JlYXRlZF9hdCI6IjIwMjMtMTAtMDdUMTM6MDA6MjguNDU1WiIsInJlZ2lvbiI6ImFidSBuc2VlciIsInBlcm1pc3Npb25zIjpbIlVTRVJfQ09OVFJPTCIsIkNPTU1FTlRfQ09OVFJPTCIsIlNFUlZJQ0VfQ09OVFJPTCIsIlBPU1RfQ09OVFJPTCIsIk9SREVSX0NPTlRST0wiLCJDQVRFR09SWV9DT05UUk9MIl19LCJpYXQiOjE2OTY4MDcwODUsImV4cCI6MTY5NzQxMTg4NX0.U1F1_omcA2V9PfW-ObPtkC9HK9WUvHn3onhRclciGIw`,
        "Content-Type": "multipart/form-data",
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
  try {
    const result = await axios.get(
      `http://localhost:5000/subcategories/category/${id}`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJyZWdpb25faWQiOjEsInJvbGVfaWQiOjEsImZpcnN0X25hbWUiOiJJYnJhaGltIiwibGFzdF9uYW1lIjoiSHVzaGtpIiwibmlja19uYW1lIjoiaWJvIiwiZW1haWwiOiJpYnJhaG9tQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHh6WEs3azFlS3RubkxNRDcvSVFieHV5Mk9HeTBpVVljMzVsRmVvaGNyMktWc0M1ZUg3Q1JtIiwiYWN0aXZlIjoxLCJpc19kZWxldGVkIjowLCJsb25ndGl0dWRlIjowLCJsYW5ndGl0dWRlIjowLCJpbWFnZSI6ImRlZmF1bHRVc2VyLnBuZyIsImNyZWF0ZWRfYXQiOiIyMDIzLTA5LTI1VDE1OjU2OjMyLjM3MVoiLCJyZWdpb24iOiJLSEFMREEiLCJwZXJtaXNzaW9ucyI6WyJVU0VSX0NPTlRST0wiLCJDT01NRU5UX0NPTlRST0wiLCJTRVJWSUNFX0NPTlRST0wiLCJQT1NUX0NPTlRST0wiLCJPUkRFUl9DT05UUk9MIiwiQ0FURUdPUllfQ09OVFJPTCJdfSwiaWF0IjoxNjk2MDg1ODk0LCJleHAiOjE2OTY2OTA2OTR9.MadPa1eXRKr0yT4Ap03P_n60PNUUDOdGwf2sCD9FgQI`,
          "Content-Type": "multipart/form-data",
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

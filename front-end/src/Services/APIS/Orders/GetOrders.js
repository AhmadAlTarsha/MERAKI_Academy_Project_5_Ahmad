import axios from "axios";


export const GetOrders = async (limit, offset, status) => {
  let url = ``;
  if (limit === 0 && offset === 0 && status === 0) {
    url = `http://localhost:5000/orders`;
  } else if (limit !== 0 && offset !== 0 && status === 0) {
    url = `http://localhost:5000/orders?limit=${limit}&offset=${offset}`;
  } else if (limit !== 0 && offset !== 0 && status !== 0) {
    url = `http://localhost:5000/orders?limit=${limit}&offset=${offset}&stauts=${status}`;
  }
  try {
    const result = await axios.get(url, {
        headers : {
            Authorization : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJyZWdpb25faWQiOjEsInJvbGVfaWQiOjEsImZpcnN0X25hbWUiOiJJYnJhaGltIiwibGFzdF9uYW1lIjoiSHVzaGtpIiwibmlja19uYW1lIjoiaWJvIiwiZW1haWwiOiJpYnJhaG9tQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHh6WEs3azFlS3RubkxNRDcvSVFieHV5Mk9HeTBpVVljMzVsRmVvaGNyMktWc0M1ZUg3Q1JtIiwiYWN0aXZlIjoxLCJpc19kZWxldGVkIjowLCJsb25ndGl0dWRlIjowLCJsYW5ndGl0dWRlIjowLCJpbWFnZSI6ImRlZmF1bHRVc2VyLnBuZyIsImNyZWF0ZWRfYXQiOiIyMDIzLTA5LTI1VDE1OjU2OjMyLjM3MVoiLCJyZWdpb24iOiJLSEFMREEiLCJwZXJtaXNzaW9ucyI6WyJVU0VSX0NPTlRST0wiLCJDT01NRU5UX0NPTlRST0wiLCJTRVJWSUNFX0NPTlRST0wiLCJQT1NUX0NPTlRST0wiLCJPUkRFUl9DT05UUk9MIiwiQ0FURUdPUllfQ09OVFJPTCJdfSwiaWF0IjoxNjk2Mjc3NjgwLCJleHAiOjE2OTY4ODI0ODB9.mCN-Pp7nDHd7LIjdaRmoZZrMGBt20o8EywosZsHLlSU`
        }
    });

    if (!result.data?.error) {
      return result.data;
    }
  } catch (err) {
    throw err;
  }
};
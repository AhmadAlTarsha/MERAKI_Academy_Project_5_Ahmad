import axios from "axios";

export const CreateNewComment = async (id, payload) => {
  try {
    const result = await axios.post(
      `http://localhost:5000/comment/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJyZWdpb25faWQiOjEsInJvbGVfaWQiOjEsImZpcnN0X25hbWUiOiJJYnJhaGltIiwibGFzdF9uYW1lIjoiSHVzaGtpIiwibmlja19uYW1lIjoiaWJvIiwiZW1haWwiOiJpYnJhaG9tQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHh6WEs3azFlS3RubkxNRDcvSVFieHV5Mk9HeTBpVVljMzVsRmVvaGNyMktWc0M1ZUg3Q1JtIiwiYWN0aXZlIjoxLCJpc19kZWxldGVkIjowLCJsb25ndGl0dWRlIjowLCJsYW5ndGl0dWRlIjowLCJpbWFnZSI6ImRlZmF1bHRVc2VyLnBuZyIsImNyZWF0ZWRfYXQiOiIyMDIzLTA5LTI1VDE1OjU2OjMyLjM3MVoiLCJyZWdpb24iOiJLSEFMREEiLCJwZXJtaXNzaW9ucyI6WyJVU0VSX0NPTlRST0wiLCJDT01NRU5UX0NPTlRST0wiLCJTRVJWSUNFX0NPTlRST0wiLCJQT1NUX0NPTlRST0wiLCJPUkRFUl9DT05UUk9MIiwiQ0FURUdPUllfQ09OVFJPTCJdfSwiaWF0IjoxNjk2MDg1ODk0LCJleHAiOjE2OTY2OTA2OTR9.MadPa1eXRKr0yT4Ap03P_n60PNUUDOdGwf2sCD9FgQI`,
        },
      }
    );
    if (!result?.data?.error) {
      return result?.data?.message;
    }
  } catch (err) {
    throw err;
  }
};

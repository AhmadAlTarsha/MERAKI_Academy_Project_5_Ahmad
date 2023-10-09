import axios from "axios";

export const CreateNewPost = async (payload) => {
  console.log("mm",payload);
  try {
    const result = await axios.post(`http://localhost:5000/posts`, payload, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0MywicmVnaW9uX2lkIjo1LCJyb2xlX2lkIjozLCJmaXJzdF9uYW1lIjoicmFlZCIsImxhc3RfbmFtZSI6ImFkbmFuIiwibmlja19uYW1lIjoiYmhlcnkiLCJlbWFpbCI6IndAd3d3IiwicGFzc3dvcmQiOiIkMmIkMTAkMkpCU3VhVmFiMlUvZHRNcXUzN2VjT1Fxell0MTYzZWtzWklKUW52RC4vVUJzRUpReFhGdzIiLCJhY3RpdmUiOjEsImlzX2RlbGV0ZWQiOjAsImxvbmd0aXR1ZGUiOjAsImxhbmd0aXR1ZGUiOjAsImltYWdlIjoiZGVmYXVsdFVzZXIucG5nIiwiY3JlYXRlZF9hdCI6IjIwMjMtMTAtMDhUMTc6MDc6NDYuOTA5WiIsInJlZ2lvbiI6ImtoYWxkYSIsInBlcm1pc3Npb25zIjpbIlVTRVJfQ09OVFJPTCIsIkNPTU1FTlRfQ09OVFJPTCIsIlNFUlZJQ0VfQ09OVFJPTCIsIlBPU1RfQ09OVFJPTCIsIk9SREVSX0NPTlRST0wiLCJDQVRFR09SWV9DT05UUk9MIl19LCJpYXQiOjE2OTY4NjM4NjUsImV4cCI6MTY5NzQ2ODY2NX0.DljM1rp8jiAeKFuc7XAKRaaq-yJO0Dnkz2xYehONyVY`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (!result?.data?.error) {
      return result?.data?.message;
    }
  } catch (err) {
    throw err;
  }
};

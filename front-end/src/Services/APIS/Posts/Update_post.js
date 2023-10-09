import axios from "axios";






export const UpdatePost = async (id,paylpde) => {
  try {
    console.log("from Api",paylpde);
    const result = await axios.put(
      `http://localhost:5000/posts/${id}/?limit=3&offset=1&is_deleted=0`,
      paylpde,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0MywicmVnaW9uX2lkIjo1LCJyb2xlX2lkIjozLCJmaXJzdF9uYW1lIjoicmFlZCIsImxhc3RfbmFtZSI6ImFkbmFuIiwibmlja19uYW1lIjoiYmhlcnkiLCJlbWFpbCI6IndAd3d3IiwicGFzc3dvcmQiOiIkMmIkMTAkMkpCU3VhVmFiMlUvZHRNcXUzN2VjT1Fxell0MTYzZWtzWklKUW52RC4vVUJzRUpReFhGdzIiLCJhY3RpdmUiOjEsImlzX2RlbGV0ZWQiOjAsImxvbmd0aXR1ZGUiOjAsImxhbmd0aXR1ZGUiOjAsImltYWdlIjoiZGVmYXVsdFVzZXIucG5nIiwiY3JlYXRlZF9hdCI6IjIwMjMtMTAtMDhUMTc6MDc6NDYuOTA5WiIsInJlZ2lvbiI6ImtoYWxkYSIsInBlcm1pc3Npb25zIjpbIlVTRVJfQ09OVFJPTCIsIkNPTU1FTlRfQ09OVFJPTCIsIlNFUlZJQ0VfQ09OVFJPTCIsIlBPU1RfQ09OVFJPTCIsIk9SREVSX0NPTlRST0wiLCJDQVRFR09SWV9DT05UUk9MIl19LCJpYXQiOjE2OTY3OTU4OTIsImV4cCI6MTY5NzQwMDY5Mn0.uHMS1HK2mDM3Nv77jhYYVS1-rVa8y6uKAyNp-nkCOD0`,
        },
      }
    );

    if (!result.data?.error) {
      return result?.data?.message;
    }
  } catch (err) {
    throw err;
  }
};
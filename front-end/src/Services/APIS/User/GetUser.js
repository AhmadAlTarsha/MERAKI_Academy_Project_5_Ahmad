import axios from "axios";
const localUser = JSON.parse(localStorage.getItem("localUser")) ?? {};

export const GetUser = async (id) => {
  try {
    const result = await axios.get(`http://localhost:5000/users/${id}`, {
      headers: {
        // Authorization: `Bearer ${localUser?.token}`,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJyZWdpb25faWQiOjEsInJvbGVfaWQiOjEsImZpcnRfbmFtZSI6IklicmFoaW0iLCJsYXN0X25hbWUiOiJodXNoa2kiLCJuaWNrX25hbWUiOiJpYm8iLCJlbWFpbCI6ImlicmFoaW1odXNAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkbWdJTUV0L3VYTmNNczhZZHE1ZTJDdWVlRE0vdkM1QnJxREFuTVVNUy9tM0JLRzI2MjZMeS4iLCJhY3RpdmUiOjEsImlzX2RlbGV0ZWQiOjAsImxvbmd0aXR1ZGUiOiIwIiwiaW1hZ2UiOiJpbWFnZSIsImNyZWF0ZWRfYXQiOiIyMDIzLTA5LTIxIDIyOjU2OjMxLjgxMzQ1OSswMCIsInJlZ2lvbiI6IktoYWxkYSIsInBlcm1pc3Npb25zIjpbIkRFTEVURS1QT1NUIiwiVklFVy1QT1NUIiwiU0VSVklDRS1BUFBST1ZBTCIsIkRFTEVURS1TRVJWSUNFIiwiVVNFUi1DT05UUk9MIiwiQ09NTUVOVC1DT05UUk9MIiwiU0VSVklDRS1DT05UUk9MIiwiUE9TVC1DT05UUk9MIiwiT1JERVItQ09OVFJPTCIsIkNBVEVHT1JZLUNPTlRST0wiXX0sImlhdCI6MTY5NTM5MDYzMywiZXhwIjoxNjk1OTk1NDMzfQ.DWQ1nZ1UXF6BavWZZbzznFZAN2rT425C-Coeuqif0TY`,
      },
    });

    return result.data;
  } catch (err) {
    throw err;
  }
};

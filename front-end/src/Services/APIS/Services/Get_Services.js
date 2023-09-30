import axios from "axios";

let url = "http://localhost:5000/services";

export const getAllServices = async (isDeleted, limit, offset) => {
  if (isDeleted === 0) {
    url += `?is_deleted=0&limit=${limit}&offset=${offset}`;
  }

  url += `?limit=${limit}&offset=${offset}`;

  try {
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJyZWdpb25faWQiOjEsInJvbGVfaWQiOjEsImZpcnRfbmFtZSI6IklicmFoaW0iLCJsYXN0X25hbWUiOiJodXNoa2kiLCJuaWNrX25hbWUiOiJpYm8iLCJlbWFpbCI6ImlicmFoaW1odXNAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkbWdJTUV0L3VYTmNNczhZZHE1ZTJDdWVlRE0vdkM1QnJxREFuTVVNUy9tM0JLRzI2MjZMeS4iLCJhY3RpdmUiOjEsImlzX2RlbGV0ZWQiOjEsImxvbmd0aXR1ZGUiOiIwIiwibGFuZ3RpdHVkZSI6IjAiLCJpbWFnZSI6ImltYWdlIiwiY3JlYXRlZF9hdCI6IjIwMjMtMDktMjEgMjI6NTY6MzEuODEzNDU5KzAwIiwicmVnaW9uIjoiS2hhbGRhIiwicGVybWlzc2lvbnMiOlsiREVMRVRFLVBPU1QiLCJWSUVXLVBPU1QiLCJTRVJWSUNFLUFQUFJPVkFMIiwiREVMRVRFLVNFUlZJQ0UiLCJVU0VSLUNPTlRST0wiLCJDT01NRU5ULUNPTlRST0wiLCJTRVJWSUNFLUNPTlRST0wiLCJQT1NULUNPTlRST0wiLCJPUkRFUi1DT05UUk9MIiwiQ0FURUdPUlktQ09OVFJPTCJdfSwiaWF0IjoxNjk1NDI1Njc4LCJleHAiOjE2OTYwMzA0Nzh9.2UsUamYgqyA5jsblvlbsfg_TDaWJAqU0g99Dboz4dYQ`,
      },
    });

    if (!result?.data?.error) {
      return result?.data?.serverices;
    }
  } catch (err) {
    throw err;
  }
};

export const getAllServicesOnCategory = async (isDeleted, limit, offset) => {
  if (isDeleted === 0) {
    url += `?is_deleted=0&limit=${limit}&offset=${offset}`;
  }

  url += `?limit=${limit}&offset=${offset}`;

  try {
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJyZWdpb25faWQiOjEsInJvbGVfaWQiOjEsImZpcnRfbmFtZSI6IklicmFoaW0iLCJsYXN0X25hbWUiOiJodXNoa2kiLCJuaWNrX25hbWUiOiJpYm8iLCJlbWFpbCI6ImlicmFoaW1odXNAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkbWdJTUV0L3VYTmNNczhZZHE1ZTJDdWVlRE0vdkM1QnJxREFuTVVNUy9tM0JLRzI2MjZMeS4iLCJhY3RpdmUiOjEsImlzX2RlbGV0ZWQiOjEsImxvbmd0aXR1ZGUiOiIwIiwibGFuZ3RpdHVkZSI6IjAiLCJpbWFnZSI6ImltYWdlIiwiY3JlYXRlZF9hdCI6IjIwMjMtMDktMjEgMjI6NTY6MzEuODEzNDU5KzAwIiwicmVnaW9uIjoiS2hhbGRhIiwicGVybWlzc2lvbnMiOlsiREVMRVRFLVBPU1QiLCJWSUVXLVBPU1QiLCJTRVJWSUNFLUFQUFJPVkFMIiwiREVMRVRFLVNFUlZJQ0UiLCJVU0VSLUNPTlRST0wiLCJDT01NRU5ULUNPTlRST0wiLCJTRVJWSUNFLUNPTlRST0wiLCJQT1NULUNPTlRST0wiLCJPUkRFUi1DT05UUk9MIiwiQ0FURUdPUlktQ09OVFJPTCJdfSwiaWF0IjoxNjk1NDI1Njc4LCJleHAiOjE2OTYwMzA0Nzh9.2UsUamYgqyA5jsblvlbsfg_TDaWJAqU0g99Dboz4dYQ`,
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
  if (isDeleted === 0) {
    url += `?is_deleted=0&limit=${limit}&offset=${offset}`;
  }

  url += `?limit=${limit}&offset=${offset}`;
  
  try {
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJyZWdpb25faWQiOjEsInJvbGVfaWQiOjEsImZpcnRfbmFtZSI6IklicmFoaW0iLCJsYXN0X25hbWUiOiJodXNoa2kiLCJuaWNrX25hbWUiOiJpYm8iLCJlbWFpbCI6ImlicmFoaW1odXNAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkbWdJTUV0L3VYTmNNczhZZHE1ZTJDdWVlRE0vdkM1QnJxREFuTVVNUy9tM0JLRzI2MjZMeS4iLCJhY3RpdmUiOjEsImlzX2RlbGV0ZWQiOjEsImxvbmd0aXR1ZGUiOiIwIiwibGFuZ3RpdHVkZSI6IjAiLCJpbWFnZSI6ImltYWdlIiwiY3JlYXRlZF9hdCI6IjIwMjMtMDktMjEgMjI6NTY6MzEuODEzNDU5KzAwIiwicmVnaW9uIjoiS2hhbGRhIiwicGVybWlzc2lvbnMiOlsiREVMRVRFLVBPU1QiLCJWSUVXLVBPU1QiLCJTRVJWSUNFLUFQUFJPVkFMIiwiREVMRVRFLVNFUlZJQ0UiLCJVU0VSLUNPTlRST0wiLCJDT01NRU5ULUNPTlRST0wiLCJTRVJWSUNFLUNPTlRST0wiLCJQT1NULUNPTlRST0wiLCJPUkRFUi1DT05UUk9MIiwiQ0FURUdPUlktQ09OVFJPTCJdfSwiaWF0IjoxNjk1NDI1Njc4LCJleHAiOjE2OTYwMzA0Nzh9.2UsUamYgqyA5jsblvlbsfg_TDaWJAqU0g99Dboz4dYQ`,
      },
    });

    if (!result?.data?.error) {
      return result?.serverices;
    }
  } catch (err) {
    throw err;
  }
};

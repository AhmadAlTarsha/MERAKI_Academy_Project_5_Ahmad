import axios from "axios";

export const CreateNewPost = async (payload) => {
  console.log("mm",payload);
  try {
    const result = await axios.post(`http://localhost:5000/posts`, payload, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0MCwicmVnaW9uX2lkIjozLCJyb2xlX2lkIjozLCJmaXJzdF9uYW1lIjoieHgiLCJsYXN0X25hbWUiOiJ4eCIsIm5pY2tfbmFtZSI6Inh4IiwiZW1haWwiOiJ4QHgiLCJwYXNzd29yZCI6IiQyYiQxMCQ0TllxMWRvbVdHT3c4UkN5dy5rdnouTjdWWHljUjk4UFFPSmFCQTF0cVp4WUg0NElqWHI4ZSIsImFjdGl2ZSI6MSwiaXNfZGVsZXRlZCI6MCwibG9uZ3RpdHVkZSI6MCwibGFuZ3RpdHVkZSI6MCwiaW1hZ2UiOiJkZWZhdWx0VXNlci5wbmciLCJjcmVhdGVkX2F0IjoiMjAyMy0xMC0wN1QxNDo0ODoyNC4zNjZaIiwicmVnaW9uIjoiYWJ1IG5zZWVyIiwicGVybWlzc2lvbnMiOlsiVVNFUl9DT05UUk9MIiwiQ09NTUVOVF9DT05UUk9MIiwiU0VSVklDRV9DT05UUk9MIiwiUE9TVF9DT05UUk9MIiwiT1JERVJfQ09OVFJPTCIsIkNBVEVHT1JZX0NPTlRST0wiXX0sImlhdCI6MTY5NjcwMDkyNywiZXhwIjoxNjk3MzA1NzI3fQ.9l99sC30n4Zw4FnoFZqoiWMKmVkUtZdSXB9qxLHYrAY

        `,
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

import React, { useEffect, useState } from "react";
import Tables from "../../../components/Table/Tables";

const AdminPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const rows = ["ID", "Author", "Post", "Comments", "Actions"];
  const columns = {
    posts: [
      {
        id: 1,
        author: "Lambert",
        post: "Post 1",
        comments: 3,
      },
      { id: 2, author: "Arel", post: "Post 2", comments: 9 },
      { id: 3, author: "Tracey", post: "Post 3", comments: 12 },
      { id: 4, author: "Audry", post: "Post 4", comments: 7 },
      {
        id: 5,
        author: "Serena",
        post: "Post 5",
        comments: 8,
      },
    ],
  };

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Tables rows={rows} cols={columns} />
    </div>
  );
};

export default AdminPosts;

import React from "react";
import Button from "../Button/Button";

const PostsTs = ({ postsArray }) => {
  return postsArray?.map((post) => (
    <tr
      key={post.id}
      className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {post?.id}
      </th>

      <td className="px-6 py-4">{post.author}</td>
      <td className="px-6 py-4">{post.post}</td>
      <td className="px-6 py-4">{post.comments}</td>
      <td className="px-6 py-4">
        <Button
          buttonName={"Delete"}
          buttonClassName={
            "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          }
        />
      </td>
    </tr>
  ));
};

export default PostsTs;

import React from "react";
import Button from "../Button/Button";
import { DeletePost } from "../../Services/APIS/Posts/DeletePost";
import { GetAllPosts } from "../../Services/APIS/Posts/GetAllPosts";

const PostsTs = ({
  postsArray,
  limit,
  offset,
  dispatch,
  setPosts,
  setError,
  setLoading,
}) => {
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

      <td className="px-6 py-4">{post?.user?.fullName}</td>
      <td className="px-6 py-4">{post?.description}</td>
      <td className="px-6 py-4">{post?.comments?.length}</td>
      <td className="px-6 py-4">{post?.is_deleted}</td>
      <td className="px-6 py-4">
        <Button
          buttonName={post?.is_deleted === 0 ? "Delete" : "Activate"}
          buttonClassName={`focus:outline-none text-white bg-${
            post?.is_deleted === 0 ? "red" : "green"
          }-700 hover:bg-${
            post?.is_deleted === 0 ? "red" : "green"
          }-800 focus:ring-4 focus:ring-${
            post?.is_deleted === 0 ? "red" : "green"
          }-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-${
            post?.is_deleted === 0 ? "red" : "green"
          }-600 dark:hover:bg-${
            post?.is_deleted === 0 ? "red" : "green"
          }-700 dark:focus:ring-${
            post?.is_deleted === 0 ? "red" : "green"
          }-900`}
          onClick={() => {
            DeletePost(post?.id, post?.is_deleted === 0 ? 1 : 0)
              .then((result) => {
                return GetAllPosts(limit, offset, 0, 0, 1);
              })
              .then((result2) => {
                dispatch(setPosts(result2));
              })
              .catch((err) => {
                setError(true);
              })
              .finally(() => {
                setLoading(false);
              });
          }}
        />
      </td>
    </tr>
  ));
};

export default PostsTs;

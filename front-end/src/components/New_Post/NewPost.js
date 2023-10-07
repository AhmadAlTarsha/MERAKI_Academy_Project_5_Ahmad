import React from "react";
import Button from "../Button/Button";
import { CreateNewPost } from "../../Services/APIS/Posts/CreateNewPost";
import { GetAllPosts } from "../../Services/APIS/Posts/GetAllPosts";
import { setPosts } from "../../Services/Redux/Posts";

function NewPost({
  postBody,
  description,
  images,
  category_id,
  sub_category_id,
  cancelButtonOnClick,
  dispatch,
  setError,
  setLoading,
}) {
  const handleNewPost = async () => {
    CreateNewPost(description, images, category_id, sub_category_id)
      .then((res) => {})
      .catch((err) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
        New Post
      </div>

      <style>body</style>
      <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
        <div>
          <label for="category">Category</label>
          <select name="category">
            <option value="plumbing">Plumbing</option>
            <option value="electricity">Electricity</option>
          </select>
        </div>
        <div>
          <label for="Subcategory">Subcategory</label>
          <select name="Subcategory">
            <option value="plumbing">Plumbing</option>
            <option value="electricity">Electricity</option>
          </select>
        </div>

        <textarea
          className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none mt-2"
          spellcheck="false"
          placeholder="Write your post here"
        >
          {postBody}
        </textarea>
        <div class="icons flex text-gray-500 m-2">
          <svg
            class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
        </div>
        <div className="buttons flex">
          <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
            <Button
              onClick={cancelButtonOnClick}
              buttonName={"Cancel"}
            ></Button>
          </div>
          <div className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">
            <Button onClick={handleNewPost} buttonName={"Post"}></Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewPost;

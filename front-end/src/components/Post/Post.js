import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import Button from "../Button/Button";
import { CreateNewComment } from "../../Services/APIS/Comments/CreateNewComment";
import { GetCommentsByPost } from "../../Services/APIS/Posts/GetAllPosts";
import { setComments } from "../../Services/Redux/Posts";
import { addOrder } from "../../Services/Redux/Orders";

function Post({
  imageSrc,
  altName,
  userImageClassName,
  bodyDivClassName,
  postDivClassName,
  userName,
  bodyClassName,
  body,
  userDivClassName,
  postImage,
  comments,
  numberOfComments,
  commentDivClassName,
  isShowComments,
  buttonsDivClass,
  postId,
  dispatch,
  postComments,
  title,
  isServices,
  subCategoryId,
  providerId,
  isShowButtons,
  setError,
  setLoading,
  userNameClassName,
}) {
  const [comment, setComment] = useState("");
  const [textValue, setTextValue] = useState("");
  const localUser = JSON?.parse(localStorage?.getItem("localUser")) ?? {};

  const handlePostComment = async () => {
    console.log("Adding comment ERROR");
    CreateNewComment(postId, { comment })
      .then((res) => {
        return GetCommentsByPost(postId);
      })
      .then((comments) => {
        postComments[`post_${postId}`] = comments;
        dispatch(setComments(postComments));
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => {
        setTextValue("");
        setLoading(false);
      });
  };

  const handleAddingOrder = async (sub_category_id, provider_id) => {
    dispatch(addOrder({ provider_id, sub_category_id }))
      .then((res) => {
        if (!res?.payload?.err) {
          console.log("Adding ORDER Error ===> ", res?.payload?.message);
        }
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={postDivClassName}>
      <div className={`${userDivClassName}`}>
        <div className="w-1/4">
          <img src={imageSrc} alt={altName} className={userImageClassName} />
        </div>
        <h3 className={userNameClassName}>{userName}</h3>
      </div>

      {isShowButtons && localUser?.isLoggedIn && (
        <div className={buttonsDivClass}>
          <Button
            buttonName={"Edit"}
            onClick={() => {
              console.log("Edit");
            }}
          />
          <Button
            buttonName={"Delete"}
            onClick={() => {
              console.log("Delete");
            }}
          />
        </div>
      )}

      {isServices && localUser?.isLoggedIn && (
        <Button
          buttonName={"Set Order"}
          onClick={() => handleAddingOrder(subCategoryId, providerId)}
        />
      )}

      <div className={bodyDivClassName}>
        {title && <h3>{title}</h3>}
        <p className={bodyClassName}>{body}</p>
        <img src={postImage} />
      </div>

      {isShowComments && (
        <div className="w-full px-4 pt-16">
          <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <span>Comments ({numberOfComments})</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className={commentDivClassName}>
                    {comments}
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                      <textarea
                        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                        placeholder="Write comment"
                      ></textarea>
                    </div>
                    <Button
                      buttonClassName={
                        "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      }
                      buttonName={"Post"}
                    />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      )}

      {!title && (
        <div className="w-full px-4 pt-16">
          <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <span>Comments ({numberOfComments})</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className={commentDivClassName}>
                    {comments}
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                      <textarea
                        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                        placeholder="Write comment"
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <Button
                      buttonClassName={
                        "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      }
                      buttonName={"Post"}
                      onClick={handlePostComment}
                    />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;

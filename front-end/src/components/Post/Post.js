import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

function Post({
  imageSrc,
  altName,
  width,
  height,
  bodyDivClassName,
  postDivClassName,
  userName,
  bodyClassName,
  body,
  userDivClassName,
  postImage,
  images,
  comments,
  numberOfComments,
  commentDivClassName,
}) {
  return (
    <div className={postDivClassName}>
      <div className={`${userDivClassName}`}>
        <div className="bg-green-500 w-1/4">
          <img src={imageSrc} alt={altName} width={width} height={height} />
        </div>
        <h3>{userName}</h3>
      </div>
      <div className={bodyDivClassName}>
        <p className={bodyClassName}>{body}</p>
        <img src={postImage} />
      </div>

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
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
      
    </div>
  );
}

export default Post;

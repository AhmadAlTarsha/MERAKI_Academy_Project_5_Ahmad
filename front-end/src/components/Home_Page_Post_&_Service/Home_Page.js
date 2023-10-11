import React from "react";
import Post from "../Post/Post";
import Comment from "../Comment/Comment";
import Pagination from "../Pagination/Pagination";

const Home_Page = ({
  postsArray,
  servicesArray,
  toggle,
  setError,
  setLoading,
  dispatch,
  postComments,
  commentsArray,
  handlePage,
  limit,
  offset,
  setOffset,
}) => {
  return (
    <>
      {toggle
        ? postsArray?.map((newPost) => {
            return (
              <>
                <Post
                  isShowComments={true}
                  key={newPost?.id}
                  userAndPosterDivClassName={"border-b-[2px] pb-4"}
                  setError={setError}
                  setLoading={setLoading}
                  isShowButtons={false}
                  dispatch={dispatch}
                  postComments={postComments}
                  postId={newPost?.id}
                  userName={newPost?.user?.fullName}
                  body={newPost?.description}
                  userDivClassName={"flex flex-row"}
                  postDivClassName={
                    "border-slate-900 border mx-4 my-6 px-2 py-4 rounded-lg"
                  }
                  imageSrc={newPost?.user?.userImage}
                  postImage={newPost?.main_image}
                  commentDivClassName={
                    "border-slate-900 border mx-4 my-6 px-2 py-4 rounded-lg"
                  }
                  userNameClassName={"text-base font-bold text-sky-700"}
                  userImageClassName={
                    "rounded-full h-20 w-20 md:h-28 md:w-28 border-[6px] border-white bg-white"
                  }
                  numberOfComments={commentsArray[`post_${newPost.id}`]?.length}
                  comments={commentsArray[`post_${newPost.id}`]?.map(
                    (comment) => {
                      return (
                        <>
                          <Comment
                            key={comment.id}
                            fullCommentDivClassName={
                              "border-slate-900 my-6 px-2 py-4 bg-[#F2F2F2] rounded-lg"
                            }
                            commenterImage={comment?.commenter.userImage}
                            commenterFullName={comment.commenter.fullName}
                            createdAt={comment.created_at}
                            comment={comment.comment}
                          />
                        </>
                      );
                    }
                  )}
                />
              </>
            );
          })
        : servicesArray?.map((service) => {
            return (
              <>
                <Post
                  key={service?.id}
                  setError={setError}
                  setLoading={setLoading}
                  isServices={true}
                  title={service?.title}
                  userName={service?.provider?.fullName}
                  body={service?.description}
                  postDivClassName={
                    "border-slate-900 border-4 mx-4 my-6 px-2 py-4"
                  }
                  imageSrc={service?.provider?.image}
                  postImage={service?.default_image}
                  isShowComments={false}
                  subCategoryId={service?.sub_category_id}
                  postId={service?.id}
                  providerId={service?.provider?.id}
                  dispatch={dispatch}
                />
              </>
            );
          })}
      {postsArray?.length !== 0 && (
        <Pagination
          handlePage={handlePage}
          limit={limit}
          offset={offset}
          setOffset={setOffset}
        />
      )}
    </>
  );
};

export default Home_Page;

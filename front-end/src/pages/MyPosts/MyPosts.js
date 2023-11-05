import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostsByUser } from "../../Services/Redux/Posts";
import Loader from "../../components/Loader/Loader";
import Post from "../../components/Post/Post";
import Pagination from "../../components/Pagination/Pagination";
import Pop_up from "../../components/Dialog_Modal/Pop-up";

const MyPosts = () => {
  const limit = 3;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [offset, setOffset] = useState(1);
  const dispatch = useDispatch();
  const postsSelector = useSelector((state) => {
    return {
      posts: state.post.post,
    };
  });

  useEffect(() => {
    dispatch(
      getAllPostsByUser({
        limit: limit,
        offset: offset,
      })
    )
      .then((res) => {})
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handlePage = (li, off) => {
    dispatch(
      getAllPostsByUser({
        limit: limit,
        offset: offset,
      })
    )
      .then((res) => {})
      .catch((err) => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });

    window.scrollTo({ top: 0 });
  };

  const handleCloseModal = () => {
    setError(false);
  };

  console.log(isLoading);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          {error ? (
            <Pop_up message={""} onClose={handleCloseModal} />
          ) : (
            <div className="flex flex-col items-center">
              {postsSelector?.posts?.rows?.map((post) => (
                <Post
                  setLoading={setIsLoading}
                  userAndPosterDivClassName={"border-b-[2px] pb-4"}
                  userDivClassName={"flex flex-row"}
                  post={post}
                  postDivClassName={
                    "border-slate-900 border mx-4 my-6 px-2 py-4 rounded-lg w-1/2 bg-[#FFFFFF]"
                  }
                  userNameClassName={"text-base font-bold text-sky-700"}
                  userImageClassName={
                    "rounded-full h-20 w-20 md:h-28 md:w-28 border-[6px] border-white bg-white"
                  }
                  bodyDivClassName={"my-4"}
                  key={post?.id}
                  userName={post?.user?.nick_name}
                  body={post?.description}
                  imageSrc={post?.user?.image}
                  postImage={post?.main_image}
                  isShowButtons={true}
                  buttonsDivClass={"flex justify-center gap-10"}
                  limit={limit}
                  offset={offset}
                  dispatch={dispatch}
                  isShowComments={false}
                />
              ))}
              {postsSelector?.posts?.rows?.length <
                postsSelector?.posts?.count && (
                <Pagination
                  handlePage={handlePage}
                  limit={limit}
                  offset={offset}
                  setOffset={setOffset}
                />
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MyPosts;

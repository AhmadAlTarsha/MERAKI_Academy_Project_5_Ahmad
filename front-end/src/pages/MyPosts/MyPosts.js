import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostsByUser } from "../../Services/Redux/Posts";
import Loader from "../../components/Loader/Loader";
import Post from "../../components/Post/Post";
import Pagination from "../../components/Pagination/Pagination";
import Pop_up from "../../components/Dialog_Modal/Pop-up";

const MyPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const limit = 3;
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
        active: 0,
      })
    )
      .then((res) => {})
      .catch((err) => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handlePage = (li, off) => {
    dispatch(
      getAllPostsByUser({
        limit: li,
        offset: off,
        active: 0,
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

  const handleButtonClick = () => {
    setError("An error occurred.");
  };

  const handleCloseModal = () => {
    setError(false);
  };

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
            <>
              {postsSelector?.posts?.map((post) => (
                <Post post={post}
                  postDivClassName={
                    "border-slate-900 border-4 mx-4 my-6 px-2 py-4"
                  }
                  key={post?.id}
                  userName={post?.user?.fullName}
                  body={post?.description}
                  imageSrc={post?.user?.userImage}
                  postImage={post?.main_image}
                  isShowButtons={true}
                  buttonsDivClass={"bg-green-500 flex justify-center gap-10"}
                  limit={limit}
                  offset={offset}
                  dispatch={dispatch}
                />
              ))}
              {postsSelector?.posts.length !== 0 && (
                <Pagination
                  handlePage={handlePage}
                  limit={limit}
                  offset={offset}
                  setOffset={setOffset}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default MyPosts;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostsByUser } from "../../Services/Redux/Posts";
import Loader from "../../components/Loader/Loader";
import Post from "../../components/Post/Post";
import Pagination from "../../components/Pagination/Pagination";

const MyPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
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
      .then((res) => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("MY POSTS ERROR ===> ", err);
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
      .then((res) => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("MY POSTS ERROR ===> ", err);
      });

    window.scrollTo({ top: 0 });
  };
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          {postsSelector?.posts?.map((post) => (
            <Post
              postDivClassName={"border-slate-900 border-4 mx-4 my-6 px-2 py-4"}
              key={post?.id}
              userName={post?.user?.fullName}
              body={post?.description}
              imageSrc={post?.user?.userImage}
              postImage={post?.main_image}
              isShowComments={false}
              buttonsDivClass={"bg-green-500 flex justify-center gap-10"}
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
  );
};

export default MyPosts;

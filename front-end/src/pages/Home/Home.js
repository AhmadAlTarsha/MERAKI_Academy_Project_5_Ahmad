import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../../components/Post/Post";
import Pagination from "../../components/Pagination/Pagination";
import { GetAllPosts } from "../../Services/APIS/Posts/GetAllPosts";
import { setPosts } from "../../Services/Redux/Posts/index";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import Comment from "../../components/Comment/Comment";

const Home = () => {
  const limit = 10;
  const [offset, setOffset] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const select = useSelector((state) => {
    return {
      post: state.post.post,
    };
  });

  useEffect(() => {
    GetAllPosts(limit, offset, 0)
      .then((res) => {
        dispatch(setPosts(res));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePage = (li, off) => {
    GetAllPosts(li, off, 0)
      .then((result) => {
        dispatch(setPosts(result));
        setLoading(false);
        window.scrollTo({ top: 0 });
      })
      .catch((err) => {
        console.log("POST ERROR ==> ", err);
      });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {select?.post.map((newPost) => {
            return (
              <>
                <Post
                  userName={newPost.user.fullName}
                  body={newPost.description}
                  postDivClassName={
                    "border-slate-900 border-4 mx-4 my-6 px-2 py-4"
                  }
                  commentDivClassName={"border-slate-900 border-2 mx-4 my-6 px-2 py-4"}
                  numberOfComments={newPost.comments.length}
                  comments={newPost.comments.map((comment) => {
                    return (
                      <>
                        <Comment
                          fullCommentDivClassName={
                            "border-slate-900 border-2 mx-4 my-6 px-2 py-4"
                          }
                          commenterImage={comment.image}
                          commenterFullName={comment.commenterFullName}
                          createdAt={comment.createdAt}
                          comment={comment.comment}
                        />
                      </>
                    );
                  })}
                />
              </>
            );
          })}
          <Pagination
            handlePage={handlePage}
            limit={limit}
            offset={offset}
            setOffset={setOffset}
          />
        </>
      )}
    </>
  );
  // <div>
  //   {/* <p className="text-3xl font-bold underline">
  //     Lorem Ipsum is simply dummy text of the printing and typesetting
  //     industry. Lorem Ipsum has been the industry's standard dummy text ever
  //     since the 1500s, when an unknown printer took a galley of type and
  //     scrambled it to make a type specimen book. It has survived not only five
  //     centuries, but also the leap into electronic typesetting, remaining
  //     essentially unchanged. It was popularised in the 1960s with the release
  //     of Letraset sheets containing Lorem Ipsum passages, and more recently
  //     with desktop publishing software like Aldus PageMaker including versions
  //     of Lorem Ipsum.
  //   </p> */}

  // </div>
};

export default Home;

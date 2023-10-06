import React from "react";
import openSocket from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import Post from "../../components/Post/Post";
import Pagination from "../../components/Pagination/Pagination";
import {
  GetAllPosts,
  GetCommentsByPost,
} from "../../Services/APIS/Posts/GetAllPosts";
import { setComments, setPosts } from "../../Services/Redux/Posts/index";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import Comment from "../../components/Comment/Comment";
import { GetCategories } from "../../Services/APIS/Category/Get_Categories";
import { setCategories } from "../../Services/Redux/Category";
import { setSubCategories } from "../../Services/Redux/Sub_Categories";
import Categories from "../../components/Home_Categories/Categories";
import Sub_Categories from "../../components/Home_Categories/Sub_Categories";
import NewPost from "../../components/New_Post/NewPost";

const Home = () => {
  const limit = 10;
  const [offset, setOffset] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isCategoryClicked, setIsCategoryClicked] = useState(false);
  const dispatch = useDispatch();
  const select = useSelector((state) => {
    return {
      post: state.post.post,
      comments: state.post.comments,
      categories: state.categories.categories,
      subCategories: state.subCategories.subCategories,
    };
  });

  let postComments = {};
  useEffect(() => {
    GetAllPosts(limit, offset, 0, 0, 0)
      .then((res) => {
        dispatch(setPosts(res));
        res?.forEach((el) => {
          GetCommentsByPost(el.id)
            .then((comments) => {
              postComments[`post_${el?.id}`] = comments;
              dispatch(setComments(postComments));
            })
            .catch((err) => {
              console.log("ERROR GETTING COMMENTS ===> ", err);
            });
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    GetCategories(0, 0, 0)
      .then((result) => {
        dispatch(setCategories(result));
      })
      .catch((err) => {
        console.error("ERROR GETING CATEGORIES ===> ".err);
      });

    const socket = openSocket("http://localhost:5000");
    socket.on("posts", (data) => {
      if (data.action === "create") {
        GetAllPosts(limit, offset, 0, 0, 0)
          .then((res) => {
            dispatch(setPosts(res));
            res?.forEach((el) => {
              GetCommentsByPost(el.id)
                .then((comments) => {
                  postComments[`post_${el?.id}`] = comments;
                  dispatch(setComments(postComments));
                })
                .catch((err) => {
                  console.log("ERROR GETTING COMMENTS ===> ", err);
                });
            });
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }, []);

  const handlePage = (li, off) => {
    GetAllPosts(li, off, 0, 0, 0)
      .then((result) => {
        dispatch(setPosts(result));
        result?.forEach((el) => {
          GetCommentsByPost(el.id)
            .then((comments) => {
              postComments[`post_${el?.id}`] = comments;
              dispatch(setComments(postComments));
            })
            .catch((err) => {
              console.log("ERROR GETTING COMMENTS ===> ", err);
            });
        });
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
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <Categories
            categories={select?.categories?.categories}
            dispatch={dispatch}
            setIsCategoryClicked={setIsCategoryClicked}
            setSubCategories={setSubCategories}
            limit={limit}
            offset={offset}
            setPosts={setPosts}
            postComments={postComments}
            setComments={setComments}
            setLoading={setLoading}
          />

          {isCategoryClicked && (
            <Sub_Categories
              subCategories={select?.subCategories}
              GetCommentsByPost={GetCommentsByPost}
              dispatch={dispatch}
              postComments={postComments}
              setComments={setComments}
              setLoading={setLoading}
              setPosts={setPosts}
              limit={limit}
              offset={offset}
            />
          )}
          <NewPost />

          {select?.post.map((newPost) => {
            return (
              <>
                <Post
                  postComments={postComments}
                  dispatch={dispatch}
                  postId={newPost.id}
                  key={newPost?.id}
                  userName={newPost?.user?.fullName}
                  body={newPost?.description}
                  postDivClassName={
                    "border-slate-900 border-4 mx-4 my-6 px-2 py-4"
                  }
                  imageSrc={newPost?.user?.userImage}
                  postImage={newPost?.main_image}
                  commentDivClassName={
                    "border-slate-900 border-2 mx-4 my-6 px-2 py-4"
                  }
                  numberOfComments={
                    select?.comments[`post_${newPost.id}`]?.length
                  }
                  comments={select?.comments[`post_${newPost.id}`]?.map(
                    (comment) => {
                      return (
                        <>
                          <Comment
                            key={comment.id}
                            fullCommentDivClassName={
                              "border-slate-900 border-2 mx-4 my-6 px-2 py-4"
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
          })}
          {select?.post.length !== 0 && (
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

export default Home;

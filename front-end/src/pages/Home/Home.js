import React from "react";
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

const Home = () => {
  const limit = 10;
  const [offset, setOffset] = useState(1);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const select = useSelector((state) => {
    return {
      post: state.post.post,
      comments: state.post.comments,
    };
  });

  let postComments = {};
  useEffect(() => {
    GetAllPosts(limit, offset, 0)
      .then((res) => {
        dispatch(setPosts(res));
        res?.forEach((el) => {
          GetCommentsByPost(el.id)
            .then((comments) => {
              postComments[`post_${el?.id}`] = comments;
              dispatch(setComments(postComments));
              setLoading(false);
            })
            .catch((err) => {
              console.log("ERROR GETTING COMMENTS ===> ", err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePage = (li, off) => {
    GetAllPosts(li, off, 0)
      .then((result) => {
        dispatch(setPosts(result));
        result?.forEach((el) => {
          GetCommentsByPost(el.id)
            .then((comments) => {
              postComments[`post_${el?.id}`] = comments;
              dispatch(setComments(postComments));
              setLoading(false);
            })
            .catch((err) => {
              console.log("ERROR GETTING COMMENTS ===> ", err);
            });
        });
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
          {select?.post.map((newPost) => {
            return (
              <>
                <Post
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

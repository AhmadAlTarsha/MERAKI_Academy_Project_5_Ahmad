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
import { setServices } from "../../Services/Redux/services";
import Categories from "../../components/Home_Categories/Categories";
import Sub_Categories from "../../components/Home_Categories/Sub_Categories";
import Pop_up from "../../components/Dialog_Modal/Pop-up";
import NewPost from "../../components/New_Post/NewPost";
import TAP from "../allservices/Tap";
import Servicepage from "../allservices/servicepage";
import Button from "../../components/Button/Button";
import { getAllServices } from "../../Services/APIS/Services/Get_Services";

const Home = () => {
  const dispatch=useDispatch()
  const limit = 10;
  const [offset, setOffset] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isCategoryClicked, setIsCategoryClicked] = useState(false);

  const [toggle, setToggle] = useState(true);


  const select = useSelector((state) => {
    return {
      post: state.post.post,
      comments: state.post.comments,
      categories: state.categories.categories,
      subCategories: state.subCategories.subCategories,
    };
  });
  const servicessSelector = useSelector((state) => {
    return {
      services: state.services.services,
      service: state.services.service,
    };
  });

  let postComments = {};
  useEffect(() => {
    if (toggle) {
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
    } else {
      getAllServices(limit, offset, 0)
        .then((res) => {
          console.log(res);
          dispatch(setServices(res));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [toggle]);

  useEffect(() => {
    GetCategories(0, 0, 0)
      .then((result) => {
        dispatch(setCategories(result));
      })
      .catch((err) => {
        console.error("ERROR GETING CATEGORIES ===> ".err);
      });
  }, []);

  useEffect(() => {
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

  const handleButtonClick = () => {
    setError("An error occurred.");
  };

  const handleCloseModal = () => {
    setError(false);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          {error ? (
            <>
              <Pop_up message={error} onClose={handleCloseModal} />
            </>
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
                isCategoriesPages={false}
              />
              {/* <TAP></TAP> */}

              {/* <Servicepage/> */}
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

              <div>
                <ul
                  class="mb-4 flex list-none flex-row flex-wrap border-b-0 pl-0"
                  id="tabs-tab3"
                  role="tablist"
                  data-te-nav-ref
                >
                  <div>
                    <li role="presentation">
                      <Button
                        buttonName={"services"}
                        buttonClassName={
                          "my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                        }
                        onClick={() => {
                          setToggle(false);
                          console.log(servicessSelector.services);
                        }}
                      ></Button>
                    </li>
                  </div>

                  <li role="presentation">
                    <Button
                      buttonName={"AllPosts"}
                      buttonClassName={
                        "my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                      }
                      onClick={() => {
                        setToggle(true);
                      }}
                    ></Button>
                  </li>
                </ul>

                <div></div>
              </div>

              <NewPost toggle={toggle} isCategoryClicked={isCategoryClicked} dispatch={dispatch} />

              {toggle
                ? select?.post.map((newPost) => {
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
                                    commenterImage={
                                      comment?.commenter.userImage
                                    }
                                    commenterFullName={
                                      comment.commenter.fullName
                                    }
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
                : servicessSelector?.services.map((service, i) => {
                   
                    return (
                      <>
                        <Post
                          title={service?.title}
                          userName={service?.provider?.fullName}
                          body={service?.description}
                          postDivClassName={
                            "border-slate-900 border-4 mx-4 my-6 px-2 py-4"
                          }
                          imageSrc={service?.provider?.image}
                          postImage={service?.default_image}
                          isShowComments={true}
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
      )}
    </>
  );
};

export default Home;

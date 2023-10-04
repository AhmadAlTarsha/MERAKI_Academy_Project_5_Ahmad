import React from "react";
import Card from "../Card/Card";
import { GetAllPosts } from "../../Services/APIS/Posts/GetAllPosts";

const Sub_Categories = ({
  subCategories,
  dispatch,
  setPosts,
  setLoading,
  GetCommentsByPost,
  postComments,
  setComments,
  limit,
  offset,
}) => {
  return (
    <div className="bg-green-400 mb-7 flex flex-col justify-center items-center">
      <h2>Categories</h2>
      <div className="mt-3 flex items-center justify-center gap-10 flex-wrap">
        {subCategories?.map((category) => (
          <Card
            imageSrc={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/8-step-process.png/220px-8-step-process.png"
            }
            cardName={category.name}
            onClick={() => {
              GetAllPosts(limit, offset, 0, category?.id, 0)
                .then((posts) => {
                  dispatch(setPosts(posts));
                  posts?.forEach((el) => {
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
                  console.error("ERROR GETTING SUB CATEGORY ===> ", err);
                });
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Sub_Categories;

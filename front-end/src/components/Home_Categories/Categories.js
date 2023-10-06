import React from "react";
import Card from "../Card/Card";
import { GetSubCategoriesOnCategory } from "../../Services/APIS/Category/Get_Categories";
import {
  GetAllPosts,
  GetCommentsByPost,
} from "../../Services/APIS/Posts/GetAllPosts";

const Categories = ({
  categories,
  dispatch,
  setIsCategoryClicked,
  setSubCategories,
  limit,
  offset,
  setPosts,
  postComments,
  setComments,
  setLoading,
}) => {
  return (
    <div className="bg-green-400 mb-7 flex flex-col justify-center items-center">
      <h2>Categories</h2>
      <div className="mt-3 flex items-center justify-center gap-10 flex-wrap">
        {categories?.map((category) => (
          <Card
            altName={"category Image"}
            height={"300px"}
            width={"300px"}
            imageSrc={category?.image}
            cardName={category.name}
            onClick={() => {
              // GetSubCategoriesOnCategory(category?.id)
              //   .then((result) => {
              //     dispatch(setSubCategories(result.subCategories));
              //     return GetAllPosts(limit, offset, category?.id, 0, 0);
              //   })
              //   .then((posts) => {
              //     dispatch(setPosts(posts));
              //     posts?.forEach((el) => {
              //       GetCommentsByPost(el.id)
              //         .then((comments) => {
              //           postComments[`post_${el?.id}`] = comments;
              //           dispatch(setComments(postComments));
              //           setIsCategoryClicked(true);
              //         })
              //         .catch((err) => {
              //           console.log("ERROR GETTING COMMENTS ===> ", err);
              //         });
              //     });
              //     setLoading(false);
              //   })
              //   .catch((err) => {
              //     console.error("ERROR GETTING SUB CATEGORY ===> ", err);
              //   });
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;

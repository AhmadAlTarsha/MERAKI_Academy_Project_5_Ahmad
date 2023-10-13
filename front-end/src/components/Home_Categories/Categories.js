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
  setError,
}) => {
  return (
    <div className="bg-primary-5 mb-7 flex flex-col justify-center items-center mx-10 rounded-lg">
      <h2 className="text-white mt-3 text-2xl">Categories</h2>
      <div className="mt-3 flex items-center justify-center gap-10 flex-wrap">
        {categories?.map((category) => (
          <Card
            key={category?.id}
            altName={"category Image"}
            imageSrc={category?.image}
            cardName={category.name}
            onClick={() => {
              GetSubCategoriesOnCategory(category?.id)
                .then((result) => {
                  dispatch(setSubCategories(result.subCategories));
                  return GetAllPosts(limit, offset, category?.id, 0, 0);
                })
                .then((posts) => {
                  dispatch(setPosts(posts));
                  posts?.forEach((el) => {
                    GetCommentsByPost(el.id)
                      .then((comments) => {
                        postComments[`post_${el?.id}`] = comments;
                        dispatch(setComments(postComments));
                        setIsCategoryClicked(true);
                      })
                      .catch((err) => {});
                  });
                })
                .catch((err) => {
                  setError(true);
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;

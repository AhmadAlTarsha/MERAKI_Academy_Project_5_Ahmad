import React from "react";
import Card from "../Card/Card";
import { GetSubCategoriesOnCategory } from "../../Services/APIS/Category/Get_Categories";
import {
  GetAllPostsOnCategory,
  GetCommentsByPost,
} from "../../Services/APIS/Posts/GetAllPosts";
import { getAllServicesOnCategory } from "../../Services/APIS/Services/Get_Services";

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
  toggle,
  setServices,
}) => {
  return (
    <div className="bg-primary-5 mb-7 flex flex-col justify-center items-center mx-10 rounded-lg">
      <h2 className="text-white mt-3 text-2xl">Categories</h2>
      <div className="mt-3 flex items-center justify-center gap-10 flex-wrap">
        {categories?.map((category) => (
          <Card
            categoryId={category?.id}
            key={category?.id}
            altName={"category Image"}
            imageSrc={category?.image}
            cardName={category.name}
            onClick={() => {
              if (toggle) {
                GetSubCategoriesOnCategory(15, 1, category?.id, 0)
                  .then((result) => {
                    dispatch(setSubCategories(result));
                    setIsCategoryClicked(true);
                    return GetAllPostsOnCategory(
                      limit,
                      offset,
                      category?.id,
                      0
                    );
                  })
                  .then((posts) => {
                    dispatch(setPosts(posts));
                    posts?.rows.forEach((el) => {
                      GetCommentsByPost(el.id, 15, 1)
                        .then((comments) => {
                          postComments[`post_${el?.id}`] = comments;
                          dispatch(setComments(postComments));
                        })
                        .catch((err) => {})
                        .finally(() => {});
                    });
                  })
                  .catch((err) => {
                    setError("Sorry, You Need To Login");
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              } else {
                GetSubCategoriesOnCategory(15, 1, category?.id, 0)
                  .then((result) => {
                    dispatch(setSubCategories(result));
                    setIsCategoryClicked(true);
                    return getAllServicesOnCategory(
                      category?.id,
                      limit,
                      offset,
                      0
                    );
                  })
                  .then((services) => {
                    dispatch(setServices(services));
                  })
                  .catch((err) => {
                    console.log(err);
                    setError(true);
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;

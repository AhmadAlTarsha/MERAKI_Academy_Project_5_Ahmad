import React from "react";
import Card from "../Card/Card";
import {
  GetAllPosts,
  GetAllPostsOnSubCategory,
} from "../../Services/APIS/Posts/GetAllPosts";
import { getAllServicesOnSubCategory } from "../../Services/APIS/Services/Get_Services";

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
  setError,
  toggle,
  setServices,
}) => {
  return (
    <div className="bg-primary-5 mb-7 flex flex-col justify-center items-center rounded-lg mx-10">
      <h2 className="text-white mt-3 text-2xl">Sub Categories</h2>
      <div className="mt-3 flex items-center justify-center gap-10 flex-wrap">
        {subCategories?.map((category) => (
          <Card
            imageSrc={category.image}
            cardName={category.name}
            onClick={() => {
              if (toggle) {
                GetAllPostsOnSubCategory(limit, offset, category?.id, 0)
                  .then((posts) => {
                    dispatch(setPosts(posts));
                    posts?.rows?.forEach((el) => {
                      GetCommentsByPost(el?.id, 15, 1)
                        .then((comments) => {
                          postComments[`post_${el?.id}`] = comments;
                          dispatch(setComments(postComments));
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
              } else {
                getAllServicesOnSubCategory(category?.id, limit, offset, 0)
                  .then((services) => {
                    dispatch(setServices(services));
                  })
                  .catch((err) => {
                    setError(err);
                  });
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Sub_Categories;

import React from "react";
import Card from "../Card/Card";
import { GetSubCategoriesOnCategory } from "../../Services/APIS/Category/Get_Categories";

const Categories = ({ categories, dispatch, setIsCategoryClicked, setSubCategories }) => {
  return (
    <div className="bg-green-400 mb-7 flex flex-col justify-center items-center">
      <h2>Categories</h2>
      <div className="mt-3 flex items-center justify-center gap-10 flex-wrap">
        {categories?.map((category) => (
          <Card
            imageSrc={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/8-step-process.png/220px-8-step-process.png"
            }
            cardName={category.name}
            onClick={() => {
              GetSubCategoriesOnCategory(category?.id)
                .then((result) => {
                  dispatch(setSubCategories(result.subCategories));
                  setIsCategoryClicked(true);
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

export default Categories;

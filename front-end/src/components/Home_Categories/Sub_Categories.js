import React from "react";
import Card from "../Card/Card";

const Sub_Categories = ({ subCategories }) => {
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
              console.log("CATEGORY " + category.id);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Sub_Categories;

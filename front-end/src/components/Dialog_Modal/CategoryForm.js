import React from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";

const CategoryForm = ({ handleSubmit, category, setCategory }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className=" w-1/2">
        <Input
          divClassName={"flex flex-col mb-2"}
          labelDivClassname={"self-start"}
          labelClassName={""}
          labelName={`Category Name`}
          inputDiv={"mt-2"}
          inputClassName={
            "block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          }
          type={""}
          name={""}
          placeHolder={"Category Name"}
          value={category.name}
          onChange={(e) =>
            setCategory({
              name: e.target.value,
              image: category.image,
            })
          }
        />

        <Input
          divClassName={"flex flex-col"}
          labelDivClassname={"self-start"}
          labelClassName={""}
          labelName={`Category Image`}
          inputDiv={"mt-2"}
          inputClassName={`block w-full text-sm text-gray-900 border border-gray-300 
      rounded-lg cursor-pointer 
      bg-gray-50 dark:text-gray-400 
      focus:outline-none dark:bg-gray-700 
      dark:border-gray-600 dark:placeholder-gray-400`}
          type={"file"}
          name={""}
          onChange={(e) =>
            setCategory({
              name: category.name,
              image: e.target.files[0],
            })
          }
        />

        <Button
          buttonClassName={
            "w-full m-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
          }
          buttonName={"Add Category"}
          divClassName={""}
          onClick={(e) => {}}
        />
      </form>
    </div>
  );
};

export default CategoryForm;

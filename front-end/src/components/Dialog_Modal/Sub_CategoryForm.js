import React from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useSelector } from "react-redux";

const Sub_CategoryForm = ({ handleSubmit, subCategory, setSubCategory }) => {
  const categorySelect = useSelector((state) => {
    return {
      categories: state.categories.categories,
    };
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className="w-1/2">
        <Input
          divClassName={"flex flex-col mb-2"}
          labelDivClassname={"self-start"}
          labelClassName={""}
          labelName={`Sub Category Name`}
          inputDiv={"mt-2"}
          inputClassName={
            "block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          }
          type={""}
          name={""}
          placeHolder={"Sub Category Name"}
          value={subCategory.name}
          onChange={(e) =>
            setSubCategory({
              name: e.target.value,
              category_id: subCategory.category_id,
              image: setSubCategory.image,
            })
          }
        />

        <div className="flex flex-col">
          <div className="self-start">
            <label for="countries" className="">
              Select an option
            </label>
          </div>
          <select
            onChange={(e) =>
              setSubCategory({
                name: subCategory.name,
                category_id: e.target.value,
                image: setSubCategory.image,
              })
            }
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected disabled>
              {"Category "}
            </option>
            {categorySelect?.categories?.categories?.map((category) => (
              <option value={category?.id}>{category?.name}</option>
            ))}
          </select>
        </div>

        <Input
          divClassName={"flex flex-col"}
          labelDivClassname={"self-start"}
          labelClassName={""}
          labelName={`Sub Category Image`}
          inputDiv={""}
          inputClassName={`block w-full text-sm text-gray-900 border border-gray-300 
      rounded-lg cursor-pointer 
      bg-gray-50 dark:text-gray-400 
      focus:outline-none dark:bg-gray-700 
      dark:border-gray-600 dark:placeholder-gray-400`}
          type={"file"}
          name={""}
          onChange={(e) =>
            setSubCategory({
              name: subCategory.name,
              category_id: subCategory.category_id,
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

export default Sub_CategoryForm;

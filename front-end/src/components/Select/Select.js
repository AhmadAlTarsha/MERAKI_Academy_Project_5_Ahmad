import React from "react";

const Select = ({setSubCategory, subCategory, categoryArray}) => {
  return (
    <div className="flex flex-col mb-2">
      <div className="self-start mb-2">
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
        {categorySelect?.categories?.categories?.map((category) => (
          <option value={category?.id}>{category?.name}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;

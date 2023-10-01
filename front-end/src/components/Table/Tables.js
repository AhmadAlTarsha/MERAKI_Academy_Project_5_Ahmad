import React from "react";
import CategoryTr from "./CategoryTr";
import PostsTs from "./PostsTs";
import ServicesTr from "./ServicesTr";

const Tables = ({ rows, cols, dispatch, setCategories, limit, offset, handleSelectCategory }) => {
  return (
    <div className="w-full relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-center text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {rows &&
              rows?.map((row, i) => (
                <th key={i} scope="col" className="px-6 py-3">
                  {row}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {cols?.categories ? (
            <CategoryTr
              categoriesArray={cols?.categories}
              dispatch={dispatch}
              setCategories={setCategories}
              limit={limit}
              offset={offset}
              handleSelectCategory={handleSelectCategory}
            />
          ) : cols?.posts ? (
            <PostsTs postsArray={cols?.posts} />
          ) : cols?.services ? (
            <ServicesTr servicesArray={cols?.services} />
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tables;

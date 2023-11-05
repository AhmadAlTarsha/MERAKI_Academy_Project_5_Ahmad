import React from "react";
import CategoryTr from "./CategoryTr";
import PostsTs from "./PostsTs";
import ServicesTr from "./ServicesTr";
import Sub_CategoryTr from "./Sub_CategoryTr";
import RegionsTr from "./RegionsTr";

const Tables = ({
  rows,
  cols,
  dispatch,
  setCategories,
  setSubCategories,
  setRegions,
  setPosts,
  setServices,
  limit,
  offset,
  setError,
  setLoading,
}) => {
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
              categoriesArray={cols?.categories?.rows}
              dispatch={dispatch}
              setCategories={setCategories}
              limit={limit}
              offset={offset}
              setError={setError}
              setLoading={setLoading}
            />
          ) : cols?.posts ? (
            <PostsTs
              postsArray={cols?.posts.rows}
              dispatch={dispatch}
              limit={limit}
              offset={offset}
              setPosts={setPosts}
              setError={setError}
              setLoading={setLoading}
            />
          ) : cols?.services ? (
            <ServicesTr
              servicesArray={cols?.services.rows}
              dispatch={dispatch}
              limit={limit}
              offset={offset}
              setServices={setServices}
              setError={setError}
              setLoading={setLoading}
            />
          ) : cols?.subCategories ? (
            <Sub_CategoryTr
              subCategoriesArray={cols?.subCategories?.rows}
              dispatch={dispatch}
              setSubCategories={setSubCategories}
              limit={limit}
              offset={offset}
              setError={setError}
              setLoading={setLoading}
            />
          ) : cols?.rows ? (
            <RegionsTr
              dispatch={dispatch}
              limit={limit}
              offset={offset}
              regionsArray={cols?.rows}
              setRegions={setRegions}
              setError={setError}
              setLoading={setLoading}
            />
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tables;

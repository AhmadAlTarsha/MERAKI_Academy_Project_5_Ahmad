import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { DeleteCategories } from "../../Services/APIS/Category/Delete_Category";
import { GetCategories } from "../../Services/APIS/Category/Get_Categories";

const CategoryTr = ({
  categoriesArray,
  dispatch,
  setCategories,
  limit,
  offset,
  setError,
  setLoading,
}) => {
  const navigate = useNavigate();
  console.log(categoriesArray);
  return categoriesArray?.map((category) => (
    <tr
      key={category.id}
      className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {category?.id}
      </th>

      <td className="px-6 py-4">
        <img
          src={category?.image}
          className="mx-auto object-fill w-40"
          alt="img"
        />
      </td>

      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {category?.name}
      </td>

      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {category?.is_deleted}
      </td>

      <td className="px-6 py-4">
        <Button
          buttonName={category?.is_deleted === 0 ? "Delete" : "Activate"}
          buttonClassName={`focus:outline-none text-white bg-${
            category?.is_deleted === 0 ? "red" : "green"
          }-700 hover:bg-${
            category?.is_deleted === 0 ? "red" : "green"
          }-800 focus:ring-4 focus:ring-${
            category?.is_deleted === 0 ? "red" : "green"
          }-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-${
            category?.is_deleted === 0 ? "red" : "green"
          }-600 dark:hover:bg-${
            category?.is_deleted === 0 ? "red" : "green"
          }-700 dark:focus:ring-${
            category?.is_deleted === 0 ? "red" : "green"
          }-900`}
          onClick={() => {
            DeleteCategories(category?.id, category?.is_deleted === 0 ? 1 : 0)
              .then((result) => {
                return GetCategories(limit, offset, 1);
              })
              .then((result2) => {
                dispatch(setCategories(result2));
              })
              .catch((err) => {
                setError(true);
              })
              .finally(() => {
                setLoading(false);
              });
          }}
        />

        <Button
          divClassName={""}
          buttonClassName={`focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800
            ${category.is_deleted !== 0 && "cursor-not-allowed"}`}
          buttonName={"Edit"}
          onClick={() => navigate(`/Admin/categories/${category?.id}`)}
          is_disabled={category?.is_deleted === 0 ? false : true}
        />
      </td>
    </tr>
  ));
};

export default CategoryTr;

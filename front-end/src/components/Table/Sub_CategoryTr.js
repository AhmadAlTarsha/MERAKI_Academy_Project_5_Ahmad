import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { DeleteSubCategories } from "../../Services/APIS/Category/Delete_Category";
import { GetSubCategories } from "../../Services/APIS/Category/Get_Categories";

const Sub_CategoryTr = ({
  subCategoriesArray,
  dispatch,
  setSubCategories,
  limit,
  offset,
  setError,
  setLoading
}) => {
  const navigate = useNavigate();
  return subCategoriesArray?.map((subcategory) => (
    <tr
      key={subcategory.id}
      className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {subcategory?.id}
      </th>

      <td className="px-6 py-4">
        <img
          src={subcategory?.image}
          className="mx-auto object-fill w-40"
          alt="img"
        />
      </td>

      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {subcategory?.name}
      </td>

      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {subcategory?.category_name}
      </td>

      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {subcategory?.is_deleted}
      </td>

      <td className="px-6 py-4">
        <Button
          buttonName={subcategory?.is_deleted === 0 ? "Delete" : "Activate"}
          buttonClassName={`focus:outline-none text-white bg-${
            subcategory?.is_deleted === 0 ? "red" : "green"
          }-700 hover:bg-${
            subcategory?.is_deleted === 0 ? "red" : "green"
          }-800 focus:ring-4 focus:ring-${
            subcategory?.is_deleted === 0 ? "red" : "green"
          }-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-${
            subcategory?.is_deleted === 0 ? "red" : "green"
          }-600 dark:hover:bg-${
            subcategory?.is_deleted === 0 ? "red" : "green"
          }-700 dark:focus:ring-${
            subcategory?.is_deleted === 0 ? "red" : "green"
          }-900`}
          onClick={() => {
            DeleteSubCategories(
              subcategory?.id,
              subcategory?.is_deleted === 0 ? 1 : 0
            )
              .then((result) => {
                return GetSubCategories(limit, offset, 1);
              })
              .then((result2) => {
                dispatch(setSubCategories(result2));
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
            ${subcategory.is_deleted !== 0 && "cursor-not-allowed"}`}
          buttonName={"Edit"}
          onClick={() => navigate(`/Admin/sub-categories/${subcategory?.id}`)}
          is_disabled={subcategory?.is_deleted === 0 ? false : true}
        />
      </td>
    </tr>
  ));
};

export default Sub_CategoryTr;

import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

const Sub_CategoryTr = ({
  subCategoriesArray,
  dispatch,
  setSubCategories,
  limit,
  offset,
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
            // DeleteCategories(subcategory?.id, subcategory?.is_deleted === 0 ? 1 : 0)
            //   .then((result) => {
            //     return GetCategories(limit, offset);
            //   })
            //   .then((result2) => {
            //     dispatch(setCategories(result2));
            //   })
            //   .catch((err) => {
            //     console.log("ERROR DELETE Category ===> ", err.response.data);
            //   });
          }}
        />

        <Button
          divClassName={""}
          buttonClassName={
            "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          }
          buttonName={"Edit"}
          onClick={() => navigate(`/Admin/categories/${subcategory?.id}`)}
        />
      </td>
    </tr>
  ));
};

export default Sub_CategoryTr;

import React from "react";
import Button from "../Button/Button";
import { DeleteRegion } from "../../Services/APIS/Regions/DeleteRegions";
import { GetAllRegions } from "../../Services/APIS/Regions/GetRegions";

const RegionsTr = ({ regionsArray, dispatch, setRegions, limit, offset }) => {
  return regionsArray?.map((region) => (
    <tr
      key={region.id}
      className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {region?.id}
      </th>

      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {region?.region}
      </td>

      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {region?.is_deleted}
      </td>

      <td className="px-6 py-4">
        <Button
          buttonName={region?.is_deleted === 0 ? "Delete" : "Activate"}
          buttonClassName={`focus:outline-none text-white bg-${
            region?.is_deleted === 0 ? "red" : "green"
          }-700 hover:bg-${
            region?.is_deleted === 0 ? "red" : "green"
          }-800 focus:ring-4 focus:ring-${
            region?.is_deleted === 0 ? "red" : "green"
          }-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-${
            region?.is_deleted === 0 ? "red" : "green"
          }-600 dark:hover:bg-${
            region?.is_deleted === 0 ? "red" : "green"
          }-700 dark:focus:ring-${
            region?.is_deleted === 0 ? "red" : "green"
          }-900`}
          onClick={() => {
            DeleteRegion(region?.id, region?.is_deleted === 0 ? 1 : 0)
              .then((result) => {
                return GetAllRegions(limit, offset);
              })
              .then((result2) => {
                dispatch(setRegions(result2));
              })
              .catch((err) => {
                console.log("ERROR DELETE region ===> ", err.response.data);
              });
          }}
        />
      </td>
    </tr>
  ));
};

export default RegionsTr;

import React from "react";
import Button from "../Button/Button";
import { UpdateServiceStatus } from "../../Services/APIS/Services/Update_Service";
import { getAllServices } from "../../Services/APIS/Services/Get_Services";
import { DeleteServices } from "../../Services/APIS/Services/Delete_Serivces";

const ServicesTr = ({
  servicesArray,
  dispatch,
  setServices,
  limit,
  offset,
}) => {
  return servicesArray?.map((service) => (
    <tr
      key={service?.id}
      className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {service?.id}
      </th>
      <td className="px-6 py-4">
        <img
          src={service?.default_image}
          alt="img"
          className="mx-auto object-fill w-40"
        />
      </td>
      <td className="px-6 py-4">{service?.category_name}</td>
      <td className="px-6 py-4">{service?.sub_categories_name}</td>
      <td className="px-6 py-4">{service?.provider?.full_name}</td>
      <td className="px-6 py-4">{service?.title}</td>
      <td className="px-6 py-4">{service?.status_name}</td>
      <td className="px-6 py-4">{service?.is_deleted}</td>
      <td className="px-6 py-4">
        {service?.status_id === 1 ? (
          <>
            <Button
              buttonName={"Accept"}
              buttonClassName={
                "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              }
              onClick={() => {
                UpdateServiceStatus(service?.id, 2)
                  .then((result) => {
                    return getAllServices(limit, offset);
                  })
                  .then((result2) => {
                    dispatch(setServices(result2));
                  })
                  .catch((err) => {
                    console.error("ERROR UPDATE STATUS SERVICE ====> ", err);
                  });
              }}
            />
            <Button
              buttonName={"Reject"}
              buttonClassName={
                "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              }
              onClick={() => {
                UpdateServiceStatus(service?.id, 3)
                  .then((result) => {
                    return getAllServices(limit, offset);
                  })
                  .then((result2) => {
                    dispatch(setServices(result2));
                  })
                  .catch((err) => {
                    console.error("ERROR UPDATE STATUS SERVICE ====> ", err);
                  });
              }}
            />
          </>
        ) : (
          <>
            <Button
              buttonName={service?.is_deleted === 0 ? "Delete" : "Activate"}
              buttonClassName={`focus:outline-none text-white bg-${
                service?.is_deleted === 0 ? "red" : "green"
              }-700 hover:bg-${
                service?.is_deleted === 0 ? "red" : "green"
              }-800 focus:ring-4 focus:ring-${
                service?.is_deleted === 0 ? "red" : "green"
              }-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-${
                service?.is_deleted === 0 ? "red" : "green"
              }-600 dark:hover:bg-${
                service?.is_deleted === 0 ? "red" : "green"
              }-700 dark:focus:ring-${
                service?.is_deleted === 0 ? "red" : "green"
              }-900`}
              onClick={() => {
                DeleteServices(service?.id, service?.is_deleted === 0 ? 1 : 0)
                  .then((result) => {
                    return getAllServices(limit, offset);
                  })
                  .then((result2) => {
                    dispatch(setServices(result2));
                  })
                  .catch((err) => {
                    console.log(
                      "ERROR DELETE SERVICE ===> ",
                      err.response.data
                    );
                  });
              }}
            />
          </>
        )}
      </td>
    </tr>
  ));
};

export default ServicesTr;

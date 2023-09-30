import React from "react";
import Button from "../Button/Button";

const ServicesTr = ({ servicesArray }) => {
  return servicesArray?.map((service) => (
    <tr
      key={service.id}
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
      <td className="px-6 py-4">
        {service?.status_id === 1 ? (
          <>
            <Button
              buttonName={"Accept"}
              buttonClassName={
                "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              }
            />
            <Button
              buttonName={"Reject"}
              buttonClassName={
                "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              }
            />
          </>
        ) : (
          <>
            <Button
              buttonName={"Delete"}
              buttonClassName={
                "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              }
            />
          </>
        )}
      </td>
    </tr>
  ));
};

export default ServicesTr;

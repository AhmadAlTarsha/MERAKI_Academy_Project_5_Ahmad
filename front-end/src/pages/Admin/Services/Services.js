import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tables from "../../../components/Table/Tables";
import { getAllServices } from "../../../Services/APIS/Services/Get_Services";
import { setServices } from "../../../Services/Redux/Services";

const AdminServices = () => {
  const servicesDispatch = useDispatch();
  const servicessSelector = useSelector((state) => {
    return {
      services: state.services.services,
    };
  });
  const rows = [
    "ID",
    "Image",
    "Category",
    "Sub Category",
    "Provider",
    "Title",
    "Status",
    "Actions",
  ];

  useEffect(() => {
    getAllServices()
      .then((services) => {
        servicesDispatch(setServices(services));
      })
      .catch((err) => {
        console.error("SERVICE ERROR ====> ", err);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Tables rows={rows} cols={{ services: servicessSelector?.services }} />
    </div>
  );
};

export default AdminServices;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tables from "../../../components/Table/Tables";
import { getAllServices } from "../../../Services/APIS/Services/Get_Services";
import { setServices } from "../../../Services/Redux/Services";
import Pagination from "../../../components/Pagination/Pagination";

const AdminServices = () => {
  const [limit, setLimit] = useState(3);
  const [offset, setOffset] = useState(1);
  const servicesDispatch = useDispatch();
  const servicessSelector = useSelector((state) => {
    return {
      services: state.services.services,
    };
  });

  const handlePage = (li, off) => {
    getAllServices(1, li, off)
      .then((services) => {
        servicesDispatch(setServices(services));
      })
      .catch((err) => {
        console.error("SERVICE ERROR ====> ", err);
      });
  };

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
    return () => {
      getAllServices(1, limit, offset)
        .then((services) => {
          servicesDispatch(setServices(services));
        })
        .catch((err) => {
          console.error("SERVICE ERROR ====> ", err);
        });
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Tables rows={rows} cols={{ services: servicessSelector?.services }} />
      {servicessSelector?.services.length !== 0 && (
        <Pagination
          handlePage={handlePage}
          limit={limit}
          offset={offset}
          setOffset={setOffset}
        />
      )}
    </div>
  );
};

export default AdminServices;

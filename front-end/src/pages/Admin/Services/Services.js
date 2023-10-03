import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tables from "../../../components/Table/Tables";
import { getAllServices } from "../../../Services/APIS/Services/Get_Services";
import { setServices } from "../../../Services/Redux/Services";
import Pagination from "../../../components/Pagination/Pagination";
import Loader from "../../../components/Loader/Loader";

const AdminServices = () => {
  const [limit, setLimit] = useState(3);
  const [offset, setOffset] = useState(1);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const servicessSelector = useSelector((state) => {
    return {
      services: state.services.services,
    };
  });

  const handlePage = (li, off) => {
    getAllServices(1, li, off)
      .then((services) => {
        dispatch(setServices(services));
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
    "Is Deleted",
    "Actions",
  ];

  useEffect(() => {
    return () => {
      getAllServices(limit, offset)
        .then((services) => {
          dispatch(setServices(services));
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("SERVICE ERROR ====> ", err);
        });
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Tables
            rows={rows}
            cols={{ services: servicessSelector?.services }}
            dispatch={dispatch}
            limit={limit}
            offset={offset}
            setServices={setServices}

          />
          {servicessSelector?.services.length !== 0 && (
            <Pagination
              handlePage={handlePage}
              limit={limit}
              offset={offset}
              setOffset={setOffset}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AdminServices;

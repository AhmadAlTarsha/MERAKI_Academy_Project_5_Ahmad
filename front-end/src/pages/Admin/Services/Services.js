import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tables from "../../../components/Table/Tables";
import { getAllServices } from "../../../Services/APIS/Services/Get_Services";
import { setServices } from "../../../Services/Redux/Services";
import Pagination from "../../../components/Pagination/Pagination";
import Loader from "../../../components/Loader/Loader";
import Pop_up from "../../../components/Dialog_Modal/Pop-up";

const AdminServices = () => {
  const limit = 3;
  const [offset, setOffset] = useState(1);
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const servicessSelector = useSelector((state) => {
    return {
      services: state.services.services,
    };
  });

  const handlePage = (li, off) => {
    getAllServices(li, off, 1)
      .then((services) => {
        dispatch(setServices(services));
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
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
    (() => {
      getAllServices(limit, offset, 1)
        .then((services) => {
          dispatch(setServices(services));
        })
        .catch((err) => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
      })();
  }, []);

  const handleCloseModal = () => {
    setIsError(false);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isError ? (
            <Pop_up message={""} onClose={handleCloseModal} />
          ) : (
            <>
              <Tables
                rows={rows}
                cols={servicessSelector}
                dispatch={dispatch}
                limit={limit}
                offset={offset}
                setServices={setServices}
                setError={setIsError}
                setLoading={setIsLoading}
              />
              {servicessSelector?.services?.rows?.length <
                servicessSelector?.services.count && (
                <Pagination
                  handlePage={handlePage}
                  limit={limit}
                  offset={offset}
                  setOffset={setOffset}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AdminServices;

import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader/Loader";
import Dialog_Modal from "../../../components/Dialog_Modal/Dialog_Modal";
import Button from "../../../components/Button/Button";
import Tables from "../../../components/Table/Tables";
import { useDispatch, useSelector } from "react-redux";
import { GetSubCategories } from "../../../Services/APIS/Category/Get_Categories";
import { setSubCategories } from "../../../Services/Redux/Sub_Categories";
import Pagination from "../../../components/Pagination/Pagination";
import Pop_up from "../../../components/Dialog_Modal/Pop-up";

const AdminSub_Categories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(3);
  const [offset, setOffset] = useState(1);

  const selectSubCategories = useSelector((state) => {
    return {
      subCategories: state.subCategories.subCategories,
    };
  });
  const dispatch = useDispatch();

  const handlePage = (li, off) => {
    GetSubCategories(li, off, 1)
      .then((result) => {
        if (!result.error) {
          dispatch(setSubCategories(result));
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log("CATEGORY ERROR ==> ", err?.response?.data);
      });
  };

  const rows = ["ID", "Image", "Name", "Category Name", "Is deleted", "Action"];

  useEffect(() => {
    return () => {
      GetSubCategories(limit, offset, 1)
        .then((result) => {
          if (!result?.error) {
            dispatch(setSubCategories(result));
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log("SUB CATEGORIES ERROR ===> ", err);
        });
    };
  }, []);

  const handleCloseModal = () => {
    setIsError(false);
  };

  return (
    <div className="overflow-auto flex flex-col justify-center items-center w-full h-full">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isError ? (
            <Pop_up message={""} onClose={handleCloseModal} />
          ) : (
            <>
              {isOpen && (
                <Dialog_Modal
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  isForm={true}
                  buttonClassName={`w-1/2 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium 
            text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3`}
                  buttonDivClassName={`w-5/6 self-center`}
                  dialogPanelClassName={
                    "rounded h-1/2 w-1/2 flex flex-col bg-gray-800 text-white py-8 px-4 text-center"
                  }
                  title={""}
                  isSubCategory={true}
                  limit={limit}
                  offset={offset}
                  setIsError={setIsError}
                  setIsLoading={setIsLoading}
                />
              )}
              <Button
                divClassName={"self-start mb-2"}
                buttonName={"Add Sub Category"}
                buttonClassName={
                  "items-start focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                }
                onClick={() => setIsOpen(!isOpen)}
              />
              <Tables
                rows={rows}
                cols={selectSubCategories.subCategories}
                dispatch={dispatch}
                setSubCategories={setSubCategories}
                limit={limit}
                offset={offset}
                setError={setIsError}
                setLoading={setIsLoading}
              />
              {selectSubCategories.subCategories.subCategories.length !== 0 && (
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

export default AdminSub_Categories;

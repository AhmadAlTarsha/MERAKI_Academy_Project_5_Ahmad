import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tables from "../../../components/Table/Tables";
import Button from "../../../components/Button/Button";
import Dialog_Modal from "../../../components/Dialog_Modal/Dialog_Modal";
import { GetCategories } from "../../../Services/APIS/Category/Get_Categories";
import { setCategories } from "../../../Services/Redux/Category";
import Pagination from "../../../components/Pagination/Pagination";
import Loader from "../../../components/Loader/Loader";
import Pop_up from "../../../components/Dialog_Modal/Pop-up";

const AdminCategories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(3);
  const [offset, setOffset] = useState(1);
  const selectCategories = useSelector((state) => {
    return {
      categories: state.categories.categories,
    };
  });
  const dispatch = useDispatch();
  const rows = ["ID", "Image", "Name", "Is deleted", "Action"];

  const handlePage = (li, off) => {
    GetCategories(li, off, 0)
      .then((result) => {
        if (!result.error) {
          dispatch(setCategories(result));
        }
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    (() => {
      GetCategories(limit, offset, 1)
        .then((result) => {
          if (!result.error) {
            dispatch(setCategories(result));
          }
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
                  title={"Category Form"}
                  isCategory={true}
                  limit={limit}
                  offset={offset}
                  setIsError={setIsError}
                  setIsLoading={setIsLoading}
                />
              )}
              <Button
                divClassName={"self-start mb-2"}
                buttonName={"Add Category"}
                buttonClassName={
                  "items-start focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                }
                onClick={() => setIsOpen(!isOpen)}
              />
              <Tables
                rows={rows}
                cols={selectCategories}
                dispatch={dispatch}
                setCategories={setCategories}
                limit={limit}
                offset={offset}
                setError={setIsError}
                setLoading={setIsLoading}
              />
              {selectCategories?.categories?.rows?.length <
                selectCategories?.categories?.count && (
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

export default AdminCategories;

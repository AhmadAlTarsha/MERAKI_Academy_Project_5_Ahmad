import React, { useEffect, useState } from "react";
import Dialog_Modal from "../../../components/Dialog_Modal/Dialog_Modal";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import {
  GetCategories,
  getSubCategory,
} from "../../../Services/APIS/Category/Get_Categories";
import { useDispatch, useSelector } from "react-redux";
import { UpdateSubCategory } from "../../../Services/APIS/Category/Update_Category";
import { setCategories } from "../../../Services/Redux/Category";
import Loader from "../../../components/Loader/Loader";
import Pop_up from "../../../components/Dialog_Modal/Pop-up";

const AdminSub_Category = () => {
  const navigate = useNavigate();
  const [subCategoryData, setSubCategoryData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  let { id } = useParams();

  const categorySelect = useSelector((state) => {
    return {
      categories: state.categories.categories,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    getSubCategory(id)
      .then((result) => {
        setSubCategoryData({
          id: result?.id,
          name: result?.name,
          image: `http://3.134.111.211:5000/${result?.image}`,
          category_name: result?.Category?.name,
          category_id: result?.Category?.id,
        });
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    (() => {
      GetCategories(15, 1, 0)
        .then((result) => {
          dispatch(setCategories(result));
        })
        .catch((err) => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
      })();
  }, []);

  const handleChange = (e) => {
    setSubCategoryData({
      ...subCategoryData,
      [e.target.name]:
        e.target.name === "image" ? e.target.files[0] : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UpdateSubCategory(subCategoryData.id, subCategoryData)
      .then((result) => {
        if (result.includes("Sub Category Updated Successfully")) {
          setIsOpen(!isOpen);
        }
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center mt-4">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isError ? (
            <Pop_up message={""} />
          ) : (
            <>
              <Dialog_Modal
                isForm={false}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title={"Sub Category Updated Successfully"}
                dialogPanelClassName={
                  "rounded h-1/4 w-1/4 flex flex-col bg-gray-800 text-white py-8 px-4 text-center"
                }
                buttonClassName={`w-1/2 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium 
      text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3`}
                buttonDivClassName={"mt-2.5 w-5/6 self-center"}
                navigate={navigate}
                isUpdateSubCategory={true}
              />
              <form
                onSubmit={handleSubmit}
                className="w-1/2 flex flex-col justify-center space-y-4 md:space-y-6"
                action="#"
              >
                <img
                  src={`${subCategoryData.image}`}
                  alt="img"
                  height={"150px"}
                  width={"150px"}
                />

                <Input
                  divClassName={"flex items-center gap-3"}
                  labelDivClassname={
                    "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  }
                  labelClassName={""}
                  labelName={"Category Image"}
                  inputDiv={"ml-8 w-1/2"}
                  inputClassName={
                    "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  }
                  type={"file"}
                  name={"image"}
                  onChange={(e) => handleChange(e)}
                />

                <Input
                  divClassName={"flex items-center gap-3"}
                  labelDivClassname={
                    "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  }
                  labelClassName={""}
                  labelName={"Category Name"}
                  inputDiv={"ml-8 w-1/2"}
                  inputClassName={
                    "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  }
                  type={"text"}
                  name={"name"}
                  placeHolder={"Category Name"}
                  value={subCategoryData.name}
                  onChange={(e) => handleChange(e)}
                />

                <div className="flex flex-col mb-2">
                  <div className="self-start mb-2">
                    <label for="countries" className="">
                      Select an option
                    </label>
                  </div>
                  <select
                    onChange={(e) => handleChange(e)}
                    name="category_id"
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value={subCategoryData?.category_id} disabled>
                      {subCategoryData?.category_name}
                    </option>
                    {categorySelect?.categories?.rows
                      ?.filter(
                        (category) =>
                          category.id !== subCategoryData.category_id
                      )
                      .map((category) => (
                        <option value={category.id}>{category.name}</option>
                      ))}
                  </select>
                </div>

                <Button
                  divClassName={"self-end"}
                  buttonClassName={
                    "text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  }
                  buttonName={"Submit"}
                  onClick={() => {}}
                />
              </form>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AdminSub_Category;

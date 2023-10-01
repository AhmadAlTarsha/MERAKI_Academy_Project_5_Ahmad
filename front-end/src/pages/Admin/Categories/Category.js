import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategory } from "../../../Services/APIS/Category/Get_Categories";
import { setCategory } from "../../../Services/Redux/Category";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { UpdateCategory } from "../../../Services/APIS/Category/Update_Category";
import Dialog_Modal from "../../../components/Dialog_Modal/Dialog_Modal";

const AdminCategory = () => {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  let { id } = useParams();
  //   const categorySelect = useSelector((state) => {
  //     return {
  //       category: state.categories.category,
  //     };
  //   });
  //   const dispatch = useDispatch();

  useEffect(() => {
    getCategory(id)
      .then((result) => {
        if (!result?.error) {
          //   dispatch(setCategory(result.category));
          setCategoryData({
            id: result.category.id,
            name: result.category.name,
            image: `http://localhost:5000/${result.category.image}`,
          });
        }
      })
      .catch((err) => {
        console.log("ERROR ADMIN CATEGORY GET ID ====> ", err.response.data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    UpdateCategory(categoryData.id, categoryData)
      .then((result) => {
        setIsOpen(!isOpen);
        console.log("UPDATE CATEGORY ====>", result);
      })
      .catch((err) => {
        console.log("ERROR UPDATE CATEGORY ====> ", err?.response?.data);
      });
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <Dialog_Modal
        isForm={false}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Category Updated Successfully"}
        dialogPanelClassName={
          "rounded h-1/4 w-1/4 flex flex-col bg-gray-800 text-white py-8 px-4 text-center"
        }
        buttonClassName={`w-1/2 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium 
        text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3`}
        buttonDivClassName={"mt-2.5 w-5/6 self-center"}
        navigate={navigate}
        isUpdateCategory={true}
      />
      <form
        onSubmit={handleSubmit}
        className="w-1/2 flex flex-col justify-center space-y-4 md:space-y-6"
        action="#"
      >
        <img src={`${categoryData.image}`} alt="img" />

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
          name={""}
          onChange={(e) => {
            setCategoryData({
              id: categoryData.id,
              image: e.target.files[0],
              name: categoryData.name,
            });
          }}
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
          name={""}
          placeHolder={"Category Name"}
          value={categoryData.name}
          onChange={(e) => {
            setCategoryData({
              id: categoryData.id,
              image: categoryData.image,
              name: e.target.value,
            });
          }}
        />

        <Button
          divClassName={"self-end"}
          buttonClassName={
            "text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          }
          buttonName={"Submit"}
          onClick={() => {}}
        />
      </form>
    </div>
  );
};

export default AdminCategory;

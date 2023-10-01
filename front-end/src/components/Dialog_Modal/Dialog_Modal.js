import { useState } from "react";
import { useDispatch } from "react-redux";
import { Dialog } from "@headlessui/react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {
  AddCategory,
  AddSubCategory,
} from "../../Services/APIS/Category/Add_Category";
import {
  GetCategories,
  GetSubCategories,
} from "../../Services/APIS/Category/Get_Categories";
import { setCategories } from "../../Services/Redux/Category";
import { setSubCategories } from "../../Services/Redux/Sub_Categories";
import CategoryForm from "./CategoryForm";
import Sub_CategoryForm from "./Sub_CategoryForm";
// import { addCategory } from "../../Services/Redux/Category";

const Dialog_Modal = ({
  isOpen,
  setIsOpen,
  isForm,
  title,
  dialogPanelClassName,
  buttonClassName,
  buttonDivClassName,
  navigate,
  isUpdateCategory,
  isSubCategory,
  isCategory,
  limit,
  offset,
}) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState({
    name: "",
    image: "",
  });

  const [subCategory, setSubCategory] = useState({
    name: "",
    category_id: 0,
    image: "",
  });

  const [isAdded, setIsAdded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isCategory) {
      AddCategory(category)
        .then((result) => {
          if (result?.includes("Category Added succefully")) {
            setIsAdded(true);
          }
        })
        .catch((err) => {
          console.log("CATEGORY ERROR ====> ", err?.response?.data);
        });
    } else {
      // console.log("SUB CATEGORY ===> ", subCategory);
      AddSubCategory(subCategory)
        .then((result) => {
          if (result?.includes("Sub Category Added succefully")) {
            setIsAdded(true);
          }
        })
        .catch((err) => {
          console.log("SUB CATEGORY ERROR ====> ", err?.response?.data);
        });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      className={
        "fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
      }
    >
      {/* "rounded h-1/2 w-1/2 flex flex-col bg-gray-800 text-white py-8 px-4 text-center" */}
      <Dialog.Panel className={dialogPanelClassName}>
        <Dialog.Title
          className={`text-${isForm ? "red" : "white"}-500 text-3xl`}
        >
          {isForm
            ? isSubCategory
              ? `Sub Category Form`
              : `Category Form`
            : `${title}`}
        </Dialog.Title>

        {isForm &&
          (isCategory ? (
            <CategoryForm
              category={category}
              handleSubmit={handleSubmit}
              setCategory={setCategory}
            />
          ) : isSubCategory ? (
            <Sub_CategoryForm
              subCategory={subCategory}
              handleSubmit={handleSubmit}
              setSubCategory={setSubCategory}
            />
          ) : (
            <></>
          ))}

        {isAdded && <h3>Added Succefully</h3>}

        {/* buttonClassName : w-1/2 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium 
            text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 */}

        {/*divClassName : w-5/6 self-center */}
        <Button
          buttonClassName={buttonClassName}
          buttonName={`${isForm ? "Cancel" : "Done"}`}
          divClassName={buttonDivClassName}
          onClick={() => {
            if (isForm) {
              if (isCategory) {
                GetCategories(limit, offset)
                  .then((result) => {
                    dispatch(setCategories(result));
                    setIsOpen(!isOpen);
                  })
                  .catch((err) => {
                    console.log(
                      "MODEL CATEGORY ERROR ===> ",
                      err.response.data
                    );
                  });
              } else if (isSubCategory) {
                GetSubCategories(limit,offset)
                .then(result => {
                  dispatch(setSubCategories(result));
                  setIsOpen(!isOpen);
                })
                .catch(err => {
                  console.log(
                    "MODEL SUB CATEGORY ERROR ===> ",
                    err?.response?.data
                  );
                })
              }
            } else if (isUpdateCategory) {
              navigate("/Admin/categories");
            }
          }}
        />
      </Dialog.Panel>
    </Dialog>
  );
};

export default Dialog_Modal;

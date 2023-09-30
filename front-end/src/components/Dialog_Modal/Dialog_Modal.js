import { useState } from "react";
import { useDispatch } from "react-redux";
import { Dialog } from "@headlessui/react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { AddCategory } from "../../Services/APIS/Category/Add_Category";
import { GetCategories } from "../../Services/APIS/Category/Get_Categories";
import { setCategories } from "../../Services/Redux/Category";
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
}) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState({
    name: "",
    image: "",
  });
  const [isAdded, setIsAdded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    AddCategory(category)
      .then((result) => {
        if (result?.includes("Category Added succefully")) {
          setIsAdded(true);
        }
      })
      .catch((err) => {
        console.log("CATEGORY ERROR ====> ", err?.response?.data);
      });
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
          {isForm ? `Category Form` : `${title}`}
        </Dialog.Title>

        {isForm && (
          <div className="h-4/6 flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit} className=" w-1/2 h-1/2">
              <Input
                divClassName={"flex flex-col mb-2"}
                labelDivClassname={"self-start"}
                labelClassName={""}
                labelName={"Category Name"}
                inputDiv={"mt-2"}
                inputClassName={
                  "block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                }
                type={""}
                name={""}
                placeHolder={"Category Name"}
                value={category.name}
                onChange={(e) =>
                  setCategory({
                    name: e.target.value,
                    image: category.image,
                  })
                }
              />

              <Input
                divClassName={"flex flex-col"}
                labelDivClassname={"self-start"}
                labelClassName={""}
                labelName={"Category Image"}
                inputDiv={"mt-2"}
                inputClassName={`block w-full text-sm text-gray-900 border border-gray-300 
                rounded-lg cursor-pointer 
                bg-gray-50 dark:text-gray-400 
                focus:outline-none dark:bg-gray-700 
                dark:border-gray-600 dark:placeholder-gray-400`}
                type={"file"}
                name={""}
                placeHolder={"Category Image"}
                onChange={(e) =>
                  setCategory({
                    name: category.name,
                    image: e.target.files[0],
                  })
                }
              />

              <Button
                buttonClassName={
                  "w-full m-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                }
                buttonName={"Add Category"}
                divClassName={""}
                onClick={(e) => {}}
              />
            </form>
          </div>
        )}

        {isAdded && <h3>Added Succefully</h3>}

        {/* buttonClassName : w-1/2 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium 
            text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 */}

        {/*divClassName : w-5/6 self-center */}
        <Button
          buttonClassName={buttonClassName}
          buttonName={`${isForm ? "Cancel" : "Done"}`}
          divClassName={buttonDivClassName}
          onClick={() =>
            isForm
              ? GetCategories()
                  .then((result) => {
                    dispatch(setCategories(result));
                    setIsOpen(!isOpen);
                  })
                  .catch((err) => {
                    console.log(
                      "MODEL CATEGORY ERROR ===> ",
                      err.response.data
                    );
                  })
              : isUpdateCategory
              ? navigate("/Admin/categories")
              : {}
          }
        />
      </Dialog.Panel>
    </Dialog>
  );
};

export default Dialog_Modal;

import { useState } from "react";
import Tables from "../../../components/Table/Tables";
import Button from "../../../components/Button/Button";
import Dialog_Modal from "../../../components/Dialog_Modal/Dialog_Modal";

const AdminCategories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const rows = ["ID", "Image", "Name", "Action"];
  const cols = {
    categories: [
      {
        id: 1,
        name: "Category 1",
        image:
          "https://www.wpbeginner.com/wp-content/uploads/2019/12/What-is-Category.png",
      },
      {
        id: 2,
        name: "Category 1",
        image:
          "https://www.wpbeginner.com/wp-content/uploads/2019/12/What-is-Category.png",
      },
    ],
  };
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      {isOpen && <Dialog_Modal isOpen={isOpen} setIsOpen={setIsOpen} />}
      <Button
        divClassName={"self-start mb-2"}
        buttonName={"Add Category"}
        buttonClassName={
          "items-start focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        }
        onClick={() => setIsOpen(!isOpen)}
      />
      <Tables rows={rows} cols={cols} />
    </div>
  );
};

export default AdminCategories;

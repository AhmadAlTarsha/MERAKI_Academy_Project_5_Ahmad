import React from "react";
import Button from "../Button/Button";

const Pagination = ({ offset, setOffset, handlePage, limit }) => {

    const nextOffset = () => {
        const newOffset = offset + 1;
        setOffset(newOffset);
        handlePage(limit, newOffset);
      };
    
      const prevOffSet = () => {
        const newOffset = offset - 1;
        setOffset(newOffset);
        handlePage(limit, newOffset);
      };

  return (
    <div className="mt-2 w-full flex justify-center">
      <Button
        buttonClassName={
          "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        }
        buttonName={"Previous"}
        onClick={prevOffSet}
        is_disabled={offset <= 1 ? true : false}
      />

      <Button
        buttonClassName={
          "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        }
        buttonName={"Next"}
        onClick={nextOffset}
        is_disabled={false}
      />
    </div>
  );
};

export default Pagination;

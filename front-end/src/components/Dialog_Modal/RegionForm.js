import React from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";

const RegionForm = ({ handleSubmit, region, setRegion }) => {
  return (
    <div className="h-4/6 flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className=" w-1/2 h-1/2">
        <Input
          divClassName={"flex flex-col mb-2"}
          labelDivClassname={"self-start"}
          labelClassName={""}
          labelName={`Region Name`}
          inputDiv={"mt-2"}
          inputClassName={
            "block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          }
          type={""}
          name={""}
          placeHolder={"Region Name"}
          value={region.region}
          onChange={(e) =>
            setRegion({
              region: e.target.value,
            })
          }
        />

        <Button
          buttonClassName={
            "w-full m-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
          }
          buttonName={"Add Region"}
          divClassName={""}
          onClick={(e) => {}}
        />
      </form>
    </div>
  );
};

export default RegionForm;

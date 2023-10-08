import React from 'react'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input/Input'
const className =
"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

const UpdatemyPost = () => {
  const navigate=useNavigate()
  return (
    <div><Input  labelName={" description"}
    labelClassName={
      "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    }
    divClassName={""}
    name={"description"}
    type={"text"}
    inputClassName={className}
    placeHolder={"updeat your description "}/>
    <Input  labelName={"current category"}
                          labelClassName={
                            "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          }
                          divClassName={""}
                          name={"category"}
                          type={"text"}
                          inputClassName={className}
                          placeHolder={"update category"}/>
    <Input labelName={"current sup_category"}
                          labelClassName={
                            "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          }
                          divClassName={""}
                          name={"sup_category"}
                          type={"text"}
                          inputClassName={className}
                          placeHolder={" sup_category "}/>
      <Button buttonName={"update"} onClick={()=>{
      ;
       // navigate("/")
      }

      }/>
    </div>
  )
}

export default UpdatemyPost
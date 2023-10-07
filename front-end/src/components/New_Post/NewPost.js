import React from "react";
import Button from "../Button/Button";
import { useState } from "react";
import { CreateNewPost } from "../../Services/APIS/Posts/CreateNewPost";
import { addNewServices } from "../../Services/APIS/Services/Add_Services";
import { useSelector } from "react-redux/";
import { GetSubCategoriesOnCategory } from "../../Services/APIS/Category/Get_Categories";
import { setSubCategories } from "../../Services/Redux/Sub_Categories";
import Input from "../Input/Input";
const className =
  "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";



function NewPost({
  postBody,
  description,
  images,
  category_id,
  sub_category_id,
  cancelButtonOnClick,
  dispatch,
  //
  toggle,
  title,
  service_provider_id,
  default_image,

}) {
  const [newService, setNewService] = useState({});

  const handleChange = (e) => {
    console.log(newService);
    setNewService({
      ...newService,

      [e.target.name]: e.target.name === "image" ? e.target.files[0] : e.target.value

    });
  };
  const handleNewService = (e) => {
    e.preventDefault();
    // console.log("SERIVE NEW ===> ", newService);
    addNewServices(newService)
      .then((result) => {
        console.log(result);

      })
      .catch((err) => {
        console.log("ERROR service PAGE ====> ", err);
      });
  };
  const selectcategory = useSelector((state) => {
    return {
      categories: state?.categories?.categories?.categories,
      subcategories: state?.subCategories.subCategories
    };
  });

  const handleNewPost = async () => {




    if (toggle) {
      CreateNewPost(description, images, category_id, sub_category_id)
        .then((res) => { })
        .catch((err) => {
          console.log(err);
        });
    } else { addNewServices(description, images, category_id, sub_category_id,) }


  };

  return (
    <>
      {toggle ? <><div className="heading text-center font-bold text-2xl m-5 text-gray-800">
        New Post
      </div>

        <style>body</style>
        <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
          <div>
            <label for="category">Category</label>
            <select name="category">
              <option value="plumbing">Plumbing</option>
              <option value="electricity">Electricity</option>
            </select>
          </div>
          <div>
            <label for="Subcategory">Subcategory</label>
            <select name="Subcategory">
              <option value="plumbing">Plumbing</option>
              <option value="electricity">Electricity</option>
            </select>
          </div>

          <textarea
            className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none mt-2"
            spellcheck="false"
            placeholder="Write your post here"
          >
            {postBody}
          </textarea>
          <div class="icons flex text-gray-500 m-2">
            <svg
              class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </div>
          <div className="buttons flex">
            <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
              <Button
                onClick={cancelButtonOnClick}
                buttonName={"Cancel"}
              ></Button>
            </div>
            <div className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">
              <Button onClick={handleNewPost} buttonName={"Post"}></Button>
            </div>
          </div>
        </div></> : <><div className="heading text-center font-bold text-2xl m-5 text-gray-800">
          Add New  Services
        </div>

        <style>body</style>
        <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
          <div>
            <label for="category">category</label>
            <select onChange={(e) => {
              handleChange(e)

              GetSubCategoriesOnCategory(e?.target?.value)
                .then((result) => {
                  // console.log(result);
                  dispatch(setSubCategories(result));

                }).catch((err) => {
                  console.log(err);
                })

            }} name="category_id">
              <option value="" disabled selected>
                Select categories
              </option>
              {selectcategory.categories.map((cat, i) => {
                return <option key={i} value={cat.id}>{cat.name}</option>
              })}

              {/* 
            <option value="electricity">Electricity</option> */}
            </select>
          </div>
          <div>
            <label for="Subcategory">Sub_category</label>
            <select onChange={(e) => {
              handleChange(e)
            }} name="sub_category_id">
              <option disabled value="">select sub_category</option>
              {selectcategory?.subcategories?.subCategories?.map((sub_cat, i) => {
                return <option key={i} value={sub_cat.id}>{sub_cat.name}</option>
              })}
            </select>
          </div>
          <Input
            labelName={"title"}
            labelClassName={
              "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            }
            divClassName={""}
            name={"title"}
            type={"text"}
            inputClassName={className}
            placeHolder={"title"}
            onChange={(e) => handleChange(e)}
          />
          <textarea name="description"
            onChange={(e) => {
              handleChange(e)
            }}
            className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none mt-2"
            spellcheck="false"
            placeholder="write Description about your services"
          >
            {postBody}
          </textarea>
          {/* <div class="icons flex text-gray-500 m-2">
            <svg
              class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </div> */}
          <input
            onChange={(e) => {
              console.log(e.target.files[0]);
              handleChange(e)
            }}
            type="file"
            name="image"
            id="profile-image"
            accept="image/*"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
          />
          <div className="buttons flex">
            <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
              <Button
                onClick={() => {

                  console.log(selectcategory.categories

                  );

                  //   console.log(selectcategory.subcategories);
                }}
                buttonName={"Cancel"}
              ></Button>
            </div>
            <div className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">
              <Button onClick={handleNewService} buttonName={"Add"}></Button>
            </div>
          </div>
        </div></>}
    </>
  );
}

export default NewPost;

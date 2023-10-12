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
  setError,
  setLoading,
  toggle,
  title,
  service_provider_id,
  default_image,
}) {
  const [newService, setNewService] = useState({});
  const [newPost, setNewPost] = useState({});
  const [isCategoryClicked, setIsCategoryClicked] = useState(false);

  const handleCategoryClicked = (id) => {
    if (isCategoryClicked) {
      GetSubCategoriesOnCategory(id)
        .then((result) => {
          dispatch(setSubCategories(result));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChange = (e) => {
    !toggle
      ? setNewService({
          ...newService,
          [e.target.name]:
            e.target.name === "image" ? e.target.files[0] : e.target.value,
        })
      : setNewPost({
          ...newPost,
          [e.target.name]:
            e.target.name === "image" ? e.target.files[0] : e.target.value,
        });
  };
  const handleNewServiceOrPOST = (e) => {
    e.preventDefault();
    if (toggle) {
      CreateNewPost(newPost)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      addNewServices(newService)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  const selectcategory = useSelector((state) => {
    return {
      categories: state?.categories?.categories?.categories,
      subcategories: state?.subCategories.subCategories,
    };
  });

  return (
    <>
      {toggle ? (
        <>
          <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
            New Post
          </div>

          <style>body</style>

          <div className="editor bg-[#FFFFFF] mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl rounded-lg mb-6">
            <div className="flex flex-col mb-3">
              <div className="mb-2">
                <label htmlFor="category">Category</label>
              </div>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onClick={(e) => {
                  handleChange(e);
                  setIsCategoryClicked(true);
                  handleCategoryClicked(e.target.value);
                }}
                name="category_id"
              >
                <option defaultValue="" disabled selected>
                  Select category
                </option>
                {selectcategory?.categories?.map((cat, i) => {
                  return (
                    <option key={i} value={cat.id}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
            </div>

            {isCategoryClicked && (
              <div className="flex flex-col mb-3">
                <div className="mb-2">
                  <label htmlFor="Subcategory">Sub Category</label>
                </div>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onClick={(e) => handleChange(e)}
                  name="sub_category_id"
                >
                  <option disabled defaultValue="">
                    select Sub Category
                  </option>
                  {selectcategory?.subcategories?.subCategories?.map(
                    (sub_cat, i) => {
                      return (
                        <option key={i} value={sub_cat?.id}>
                          {sub_cat.name}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
            )}

            <textarea
              className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none mt-2 rounded-lg mb-3"
              onChange={(e) => handleChange(e)}
              spellcheck="false"
              placeholder="Write your post here"
              name="description"
            >
              {postBody}
            </textarea>

            <input
              onChange={(e) => {
                handleChange(e);
              }}
              type="file"
              name="image"
              id="profile-image"
              accept="image/*"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3"
              required=""
            />

            <div className="buttons flex">
              <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
                <Button
                  // onClick={cancelButtonOnClick}
                  buttonName={"Cancel"}
                ></Button>
              </div>
              <div className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">
                <Button
                  onClick={(e) => {
                    console.log(newPost);
                    handleNewServiceOrPOST(e);
                  }}
                  buttonName={"Post"}
                ></Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
            Add New Service
          </div>

          <style>body</style>
          <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl bg-[#FFFFFF]">
            <div className="flex flex-col mb-2">
              <div className="mb-2">
                <label htmlFor="category">Category</label>
              </div>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => {
                  handleChange(e);

                  GetSubCategoriesOnCategory(e?.target?.value)
                    .then((result) => {
                      dispatch(setSubCategories(result));
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
                name="category_id"
              >
                <option value="" disabled selected>
                  Select categories
                </option>
                {selectcategory?.categories?.map((cat, i) => {
                  return (
                    <option key={i} value={cat?.id}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col mb-2">
              <div className="mb-2">
                <label htmlFor="Subcategory">Sub Category</label>
              </div>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onClick={(e) => {
                  handleChange(e);
                  // console.log(e.target.value);
                }}
                name="sub_category_id"
              >
                <option disabled defaultValue="">
                  select sub_category
                </option>
                {selectcategory?.subcategories?.subCategories?.map(
                  (sub_cat, i) => {
                    return (
                      <option key={i} value={sub_cat?.id}>
                        {sub_cat.name}
                      </option>
                    );
                  }
                )}
              </select>
            </div>
            <Input
              labelName={"Title"}
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
            <textarea
              name="description"
              onChange={(e) => handleChange(e)}
              className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none mt-2 rounded-lg mb-3"
              spellcheck="false"
              placeholder="write Description about your services"
            >
              {"postBody"}
            </textarea>
            <input
              onChange={(e) => handleChange(e)}
              type="file"
              name="image"
              id="profile-image"
              accept="image/*"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3"
              required=""
            />
            <div className="buttons flex">
              <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
                <Button onClick={() => {}} buttonName={"Cancel"} />
              </div>
              <div className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">
                <Button
                  onClick={(e) => handleNewServiceOrPOST(e)}
                  buttonName={"Add"}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default NewPost;

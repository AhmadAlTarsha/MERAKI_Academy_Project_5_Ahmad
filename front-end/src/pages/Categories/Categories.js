import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCategories } from "../../Services/APIS/Category/Get_Categories";
import { setCategories } from "../../Services/Redux/Category";
import Loader from "../../components/Loader/Loader";
import Categories from "../../components/Home_Categories/Categories";

const CategoriesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const limit = 3;
  const [offset, setOffset] = useState(1);
  const [isCategoryClicked, setIsCategoryClicked] = useState(false);
  const dispatch = useDispatch();
  const categoriesSelector = useSelector((state) => {
    return {
      categories: state.categories.categories,
    };
  });

  useEffect(() => {
    return () => {
      GetCategories(limit, offset, 0)
        .then((result) => {
          if (!result.error) {
            dispatch(setCategories(result));
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log("CATEGORY ERROR ==> ", err?.response?.data);
        });
      console.log("CATEGORIES ==> ", categoriesSelector.categories.categories);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <Categories
            categories={categoriesSelector?.categories?.categories}
            dispatch={dispatch}
            setIsCategoryClicked={setIsCategoryClicked}
            // setSubCategories={setSubCategories}
            limit={limit}
            offset={offset}
            setLoading={setIsLoading}
            isCategoriesPages={true}
          />
        </>
      )}
    </>
  );
};

export default CategoriesPage;

import React, { useEffect, useState } from "react";
import Tables from "../../../components/Table/Tables";
import { useDispatch, useSelector } from "react-redux";
import { GetAllPosts } from "../../../Services/APIS/Posts/GetAllPosts";
import { setPosts } from "../../../Services/Redux/Posts";
import Loader from "../../../components/Loader/Loader";
import Pagination from "../../../components/Pagination/Pagination";

const AdminPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(3);
  const [offset, setOffset] = useState(1);

  const selectPosts = useSelector((state) => {
    return {
      posts: state.post.post,
    };
  });
  const dispatch = useDispatch();

  const rows = ["ID", "Author", "Post", "Comments", "Is Deleted", "Actions"];

  const handlePage = (li, off) => {
    GetAllPosts(li, off)
      .then((result) => {
        if (!result.error) {
          dispatch(setPosts(result));
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log("CATEGORY ERROR ==> ", err?.response?.data);
      });
  };

  useEffect(() => {
    return () => {
      GetAllPosts(limit, offset, 0)
        .then((result) => {
          dispatch(setPosts(result));
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("CATEGORY ERROR ==> ", err?.response?.data);
        });
    };
  }, []);

  return (
    <div className="overflow-auto flex flex-col justify-center items-center w-full h-full">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Tables
            rows={rows}
            cols={selectPosts}
            dispatch={dispatch}
            setPosts={setPosts}
            limit={limit}
            offset={offset}
          />
          {selectPosts.posts.length !== 0 && (
            <Pagination
              handlePage={handlePage}
              limit={limit}
              offset={offset}
              setOffset={setOffset}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AdminPosts;

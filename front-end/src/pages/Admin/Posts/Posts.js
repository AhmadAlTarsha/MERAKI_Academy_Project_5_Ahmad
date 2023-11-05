import React, { useEffect, useState } from "react";
import Tables from "../../../components/Table/Tables";
import { useDispatch, useSelector } from "react-redux";
import { GetAllPosts } from "../../../Services/APIS/Posts/GetAllPosts";
import { setPosts } from "../../../Services/Redux/Posts";
import Loader from "../../../components/Loader/Loader";
import Pagination from "../../../components/Pagination/Pagination";
import Pop_up from "../../../components/Dialog_Modal/Pop-up";

const AdminPosts = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(3);
  const [offset, setOffset] = useState(1);

  const selectPosts = useSelector((state) => {
    return {
      posts: state.post.post,
    };
  });
  const dispatch = useDispatch();

  const rows = ["ID", "Author", "Post", "Is Deleted", "Actions"];

  const handlePage = (li, off) => {
    GetAllPosts(li, off, 1)
      .then((result) => {
        dispatch(setPosts(result));
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    return () => {
      GetAllPosts(limit, offset, 1)
        .then((result) => {
          dispatch(setPosts(result));
        })
        .catch((err) => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
  }, []);

  const handleCloseModal = () => {
    setIsError(false);
  };

  console.log(selectPosts);

  return (
    <div className="overflow-auto flex flex-col justify-center items-center w-full h-full">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isError ? (
            <Pop_up message={""} onClose={handleCloseModal} />
          ) : (
            <>
              <Tables
                rows={rows}
                cols={selectPosts}
                dispatch={dispatch}
                setPosts={setPosts}
                limit={limit}
                offset={offset}
                setError={setIsError}
                setLoading={setIsLoading}
              />
              {selectPosts.posts.rows.length < selectPosts.posts.count && (
                <Pagination
                  handlePage={handlePage}
                  limit={limit}
                  offset={offset}
                  setOffset={setOffset}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AdminPosts;

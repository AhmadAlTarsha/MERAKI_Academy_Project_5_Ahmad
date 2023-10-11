import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserServices } from "../../Services/Redux/Services";
import Loader from "../../components/Loader/Loader";
import Pop_up from "../../components/Dialog_Modal/Pop-up";
import Post from "../../components/Post/Post";

const MyServices = () => {
  const limit = 3;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [offset, setOffset] = useState(1);
  const dispatch = useDispatch();
  const servicesSelector = useSelector((state) => {
    return {
      services: state.services.services,
    };
  });

  useEffect(() => {
    dispatch(getUserServices({ limit, offset }))
      .then((result) => {})
      .catch((err) => {
        console.log("ERROR ===> ", err);
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handlePage = (li, off) => {
    dispatch(
      getUserServices({
        limit: li,
        offset: off,
      })
    )
      .then((res) => {})
      .catch((err) => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });

    window.scrollTo({ top: 0 });
  };

  const handleCloseModal = () => {
    setError(false);
  };

  // console.log(servicesSelector.services);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          {error ? (
            <Pop_up message={""} onClose={handleCloseModal} />
          ) : (
            <>
              {servicesSelector.services?.map((service) => (
                <Post
                  userAndPosterDivClassName={"border-b-[2px] pb-4"}
                  userDivClassName={"flex flex-row"}
                  post={service}
                  postDivClassName={
                    "border-slate-900 border mx-4 my-6 px-2 py-4 rounded-lg"
                  }
                  userNameClassName={"text-base font-bold text-sky-700"}
                  userImageClassName={
                    "rounded-full h-20 w-20 md:h-28 md:w-28 border-[6px] border-white bg-white"
                  }
                  key={service?.id}
                  userName={service?.provider?.full_name}
                  title={service?.title}
                  body={service?.description}
                  imageSrc={service?.provider?.image}
                  postImage={service?.default_image}
                  isShowButtons={true}
                  buttonsDivClass={"flex justify-center gap-10"}
                  limit={limit}
                  offset={offset}
                  dispatch={dispatch}
                  isShowComments={false}
                />
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

export default MyServices;

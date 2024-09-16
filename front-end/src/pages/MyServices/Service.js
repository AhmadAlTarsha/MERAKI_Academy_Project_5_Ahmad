import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getUserService } from "../../Services/Redux/Services";
import Loader from "../../components/Loader/Loader";
import Pop_up from "../../components/Dialog_Modal/Pop-up";

const Service = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateOk, setIsUpdateOk] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const select2 = useSelector((state) => {
    return {
      service: state.services.service,
      // user: state.auth.user,
    };
  });

  useEffect(() => {
    dispatch(getUserService({ id }))
      .then((result) => {
        console.log("RESULT ===> ", result?.payload);
      })
      .catch((err) => {
        console.log("ERROR ===> ", err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleCloseModal = () => {
    setIsError(false);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          {isError ? <Pop_up message={""} onClose={handleCloseModal} /> : <></>}
        </>
      )}
    </>
  );
};

export default Service;

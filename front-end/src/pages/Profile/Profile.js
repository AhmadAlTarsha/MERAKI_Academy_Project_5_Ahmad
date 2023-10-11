import React, { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import { getUser, setUser, updateUser } from "../../Services/Redux/auth";
import Loader from "../../components/Loader/Loader";
import { GetAllRegions } from "../../Services/APIS/Regions/GetRegions";
import { setRegions } from "../../Services/Redux/regions/regions";
import Pop_up from "../../components/Dialog_Modal/Pop-up";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateOk, setIsUpdateOk] = useState(false);
  const [isError, setIsError] = useState(false);
  const localUser = JSON.parse(localStorage.getItem("localUser")) ?? {};
  const dispatch = useDispatch();
  const select2 = useSelector((state) => {
    return {
      regions: state.regions.regions,
      user: state.auth.user,
    };
  });

  const handleChange = (e) => {
    dispatch(
      setUser({
        ...select2?.user,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(select2.user))
      .then((res) => {
        setIsUpdateOk(!isUpdateOk);
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    dispatch(getUser(localUser?.id))
      .then((res) => {
        console.log("IDDDD 2222 ===> ", localUser?.id);
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });

    GetAllRegions()
      .then((res) => {
        dispatch(setRegions(res.regions));
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleCloseModal = () => {
    setIsError(false);
  };

  const className =
    "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          {isError ? (
            <Pop_up message={""} onClose={handleCloseModal} />
          ) : (
            <>
              <section className="bg-gray-50 dark:bg-gray-900">
                <div className="bg-white-500 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                  <div className="bg-white-500 rounded-lg shadow dark:border md:mt-0 sm:w-3/4 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Update Account
                      </h1>
                      <form
                        onSubmit={handleSubmit}
                        className="space-y-4 md:space-y-6"
                        action="#"
                      >
                        <div className="full_name">
                          <Input
                            labelName={"First Name"}
                            labelClassName={
                              "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            }
                            divClassName={""}
                            name={"first_name"}
                            type={"text"}
                            inputClassName={className}
                            placeHolder={"Your Name"}
                            value={select2?.user?.first_name}
                            onChange={(e) => handleChange(e)}
                          />
                          <Input
                            labelName={"last Name"}
                            labelClassName={
                              "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            }
                            divClassName={""}
                            name={"last_name"}
                            type={"text"}
                            inputClassName={className}
                            placeHolder={"Last Name"}
                            value={select2?.user?.last_name}
                            onChange={(e) => handleChange(e)}
                          />
                          <Input
                            labelName={"Nick Name"}
                            labelClassName={
                              "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            }
                            divClassName={""}
                            name={"nickName"}
                            type={"text"}
                            inputClassName={className}
                            placeHolder={"Your Nick Name "}
                            value={select2?.user?.nickName}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>

                        <div>
                          <label
                            for="region"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Region
                          </label>
                          <select
                            onChange={(e) => handleChange(e)}
                            name="region_id"
                            id="region"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required=""
                          >
                            <option
                              value={
                                select2.regions.filter(
                                  (region) =>
                                    region.region === select2?.user?.region
                                )[0].id
                              }
                              disabled
                              selected
                            >
                              {
                                select2.regions.filter(
                                  (region) =>
                                    region.region === select2?.user?.region
                                )[0].region
                              }
                            </option>
                            {select2?.regions.map((region) => {
                              return (
                                <option value={region?.id}>
                                  {region.region}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div>
                          <Input
                            labelName={"Your email"}
                            labelClassName={
                              "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            }
                            divClassName={""}
                            name={"email"}
                            type={"email"}
                            inputClassName={className}
                            placeHolder={"name@company.com"}
                            value={select2?.user?.email}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        <div>
                          <Input
                            divClassName={""}
                            name={"password"}
                            type={"password"}
                            inputClassName={className}
                            placeHolder={"••••••••"}
                            labelName={"Password"}
                            labelClassName={
                              "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            }
                            onChange={(e) => handleChange(e)}
                          />
                        </div>

                        {isUpdateOk && (
                          <div
                            class="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                            role="alert"
                          >
                            <svg
                              class="flex-shrink-0 inline w-4 h-4 mr-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span class="sr-only">Info</span>
                            <div>
                              <span class="font-medium">
                                Account Updated Successfully!
                              </span>
                            </div>
                          </div>
                        )}

                        <Button
                          buttonClassName={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                          buttonName={"Update Account"}
                          divClassName={""}
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Profile;

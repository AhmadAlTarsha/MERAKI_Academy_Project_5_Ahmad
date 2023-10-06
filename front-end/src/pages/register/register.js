import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

import { GetAllRoles } from "../../Services/APIS/User/register";
import { registerUser } from "../../Services/Redux/auth";
import { setroles } from "../../Services/Redux/roles/roles";
import "./register.css";

import { GetAllRegions } from "../../Services/APIS/Regions/GetRegions";

import { setRegions } from "../../Services/Redux/regions/regions";

export const Register = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isRegisterOk, setIsRegisterOk] = useState(null);
  const [registration, setRegistration] = useState({
    first_name: "",
    last_name: "",
    nick_name: "",
    email: "",
    password: "",
    region_id: 0,
    role_id: 0,
  });

  useEffect(() => {
    GetAllRegions()
      .then((res) => {
        dispatch(setRegions(res.regions));
      })
      .catch((err) => {
        console.log("ERROR GET REGIONS ===> ", err);
      });
  }, []);

  useEffect(() => {
    GetAllRoles()
      .then((res) => {
        dispatch(setroles(res.roles));
      })
      .catch((err) => {
        console.log("ERROR GET ROLES ===> ", err);
      });
  }, []);

  const className =
    "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  const dispatch = useDispatch();
  const select = useSelector((state) => {
    return {
      register: state.auth,
    };
  });

  const select2 = useSelector((state) => {
    return {
      regions: state.regions.regions,
    };
  });
  const select3 = useSelector((state) => {
    return {
      roles: state.roles.roles,
    };
  });

  // console.log(select3);

  const handleChange = (e) => {
    setRegistration({
      ...registration,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(registration))
      .then((result) => {
        if (!result?.payload?.error) {
          setIsRegisterOk(true);
        }
      })
      .catch((err) => {
        console.log("ERROR REGISTER PAGE ====> ", err);
      });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="bg-white-500 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="bg-white-500 rounded-lg shadow dark:border md:mt-0 sm:w-3/4 h-[90%] xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up
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
                  onChange={(e) => handleChange(e)}
                />
                <Input
                  labelName={"Nick Name"}
                  labelClassName={
                    "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  }
                  divClassName={""}
                  name={"nick_name"}
                  type={"text"}
                  inputClassName={className}
                  placeHolder={"Your Nick Name "}
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
                  <option value="" disabled selected>
                    Select Region
                  </option>
                  {select2?.regions.map((regin, i) => {
                    return <option value={regin.id}>{regin.region}</option>;
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
              <div>
                <Input
                  divClassName={""}
                  name={"confirm-password"}
                  type={"password"}
                  inputClassName={className}
                  placeHolder={"••••••••"}
                  labelName={"Confirm password"}
                  labelClassName={
                    "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  }
                />
              </div>

              <div>
                <label>user or service provider ?</label>
                <select
                  onChange={(e) => handleChange(e)}
                  name="role_id"
                  id="user-type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                >
                  <option value="" disabled selected>
                    Select role
                  </option>
                  {select3?.roles.map((role, i) => {
                    return <option value={role.id}>{role.role}</option>;
                  })}
                </select>
              </div>

              {/* <div>
                <label
                  for="profile-image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Profile Image
                </label>
                <input
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                  }}
                  type="file"
                  name="profile-image"
                  id="profile-image"
                  accept="image/*"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div> */}

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    onClick={(e) => {
                      setIsChecked(!isChecked);
                    }}
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    for="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>

              {isRegisterOk && (
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
                      Account Created Successfully!
                    </span>
                    You can login now
                  </div>
                </div>
              )}

              <Button
                buttonClassName={`w-full text-white bg-${
                  isChecked ? "primary" : "grey"
                }-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                buttonName={"Create an account"}
                divClassName={""}
                is_disabled={isChecked ? false : true}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

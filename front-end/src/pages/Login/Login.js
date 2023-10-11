import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { getUser, loginUser } from "../../Services/Redux/auth";
import Loader from "../../components/Loader/Loader";
import Pop_up from "../../components/Dialog_Modal/Pop-up";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials))
      .then((result) => {
        if (!result.payload.error) {
          return dispatch(getUser(result?.payload?.id));
        }
        throw new Error("Invalid email or Password");
      })
      .then((res2) => {
        if (res2?.payload?.user?.role_id === 1) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCloseModal = () => {
    setError(false);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          {error ? (
            <Pop_up
              message={"Invalid email or Password"}
              onClose={handleCloseModal}
            />
          ) : (
            <div className="bg-[#F5F5DD] h-screen flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Sign in to your account
                </h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    divClassName={""}
                    labelDivClassname={""}
                    labelClassName={
                      "block text-sm font-medium leading-6 text-gray-900"
                    }
                    inputDiv={"mt-2"}
                    name={"email"}
                    type={"email"}
                    inputClassName={
                      "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    }
                    labelName={"Email address"}
                    onChange={(e) => handleChange(e)}
                  />

                  <div>
                    <Input
                      inputClassName={
                        "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      }
                      inputDiv={"mt-2"}
                      name={"password"}
                      type={"password"}
                      labelName={"Password"}
                      labelClassName={
                        "block text-sm font-medium leading-6 text-gray-900"
                      }
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <Button
                    buttonClassName={
                      "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    }
                    buttonName={"Sign in"}
                  />
                  <div>
                    Don't have an account?{" "}
                    <NavLink to={"/register"} className={"text-blue-600"}>
                      register
                    </NavLink>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Login;

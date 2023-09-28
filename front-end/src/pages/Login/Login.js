import React from "react";
import { NavLink } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const Login = () => {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
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
              onChange={(e) => e.target.value}
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
                onChange={(e) => e.target.value}
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
              <NavLink to={"/register"} className={"text-blue-600"}>register</NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

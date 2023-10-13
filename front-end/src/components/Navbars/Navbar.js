import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../Services/Redux/auth";
import CustomerNavBar from "./CustomerNavBar";
import ProviderNavBar from "./ProviderNavBar";
import logo from "../../assets/images/logo.png"

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const localUser = JSON?.parse(localStorage?.getItem("localUser")) ?? {};
  const select = useSelector((state) => {
    return {
      user: state.auth,
    };
  });

  return (
    <header className="bg-gradient-to-b from-[#C3A97E] to-[#F5F5DD]">
      <nav
        className="mx-auto flex  items-center justify-between lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <NavLink to=""><img
            height="120px"
            width="120px"
              src={logo}
              alt=""
            /></NavLink>
          {/* <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            
          </a> */}
        </div>

        {/* <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div> */}

        {!localUser?.isLoggedIn ? (
          <>
            <div className="hidden lg:flex lg:gap-x-12">
              <div className="relative">
                <NavLink
                  to={"/"}
                  className={
                    "flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                  }
                >
                  Home
                </NavLink>
                <div className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"></div>
              </div>

              <NavLink
                to={"posts"}
                className={
                  "flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                }
              >
                Posts
              </NavLink>

              {/* <NavLink
                to={"categories"}
                className={
                  "flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                }
              >
                Categories
              </NavLink> */}

              <NavLink
                to={"login"}
                className={
                  "flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                }
              >
                Login
              </NavLink>
            </div>
            {/* LEAVE IT EMPTY */}
            <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>
            {/* LEAVE IT EMPTY */}
          </>
        ) : (
          <>
            {localUser?.role === 3 ? (
              <CustomerNavBar
                dispatch={dispatch}
                navigate={navigate}
                setLogout={setLogout}
              />
            ) : localUser?.role === 2 ? (
              <ProviderNavBar
                dispatch={dispatch}
                navigate={navigate}
                setLogout={setLogout}
              />
            ) : (
              <></>
            )}
          </>
        )}
      </nav>

      {/* <!-- Mobile menu, show/hide based on menu open state. --> */}
      <div className="lg:hidden" role="dialog" aria-modal="true">
        {/* <!-- Background backdrop, show/hide based on slide-over state. --> */}
        <div className="fixed inset-0 z-10"></div>
        <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <div className="-mx-3">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    aria-controls="disclosure-1"
                    aria-expanded="false"
                  >
                    Product
                    {/* <!--
                    Expand/collapse icon, toggle classes based on menu open state.
  
                    Open: "rotate-180", Closed: ""
                  --> */}
                    <svg
                      className="h-5 w-5 flex-none"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <NavLink to={"login"}>Login</NavLink>
                <br></br>
                <NavLink to={"logout"}>Logout</NavLink>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Company
                </a>
              </div>
              <div className="py-6">
                <NavLink to={"login"}>Login</NavLink>
              </div>

              <NavLink to={"login"}>Login</NavLink>
              <br></br>
              <NavLink to={"logout"}>Logout</NavLink>
              <br></br>
              <NavLink to={"/"}>Home</NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

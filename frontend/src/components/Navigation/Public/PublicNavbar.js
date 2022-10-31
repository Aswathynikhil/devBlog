import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";

import {
  MenuIcon,
  XIcon,
  LoginIcon,
  BookOpenIcon,
} from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";
import logo from "../../../img/logo.png";

const navigation = [
  // { name: "Home", href: "/", current: true },
  // { name: "Create", href: "/create-post", current: false },
  // { name: "Posts", href: "/posts", current: false },
  // { name: "Register", href: "/register", current: false },
  // { name: "Login", href: "/login", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PublicNavbar = () => {
  return (
    <Disclosure
      as="nav"
      className="bg-white shadow-md shadow-gray-300 sticky top-0 z-50 "
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  {/* Logo */}
                  <h1 className="text-black font-mono">DevBlog</h1>
                  <Link to="/">
                    <img className="w-20 text-black" src={logo} alt={logo} />
                  </Link>
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  {/* {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-500 text-white hover:bg-gray-700 shadow-lg shadow-gray-400"
                          : "bg-gray-400 text-white hover:bg-gray-700 hover:text-white shadow-lg shadow-gray-400",
                        "px-3 py-2 rounded-md text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))} */}
                </div>
              </div>
              <div className="flex items-center hidden md:ml-6 md:flex  ">
                <div className="flex-shrink-0">
                  <Link
                    to="/posts"
                    className="pr-3  inline-flex items-center  mr-2 px-3 py-2 border border-transparent shadow-lg shadow-gray-300 text-sm font-medium rounded-md text-white bg-gray-400  hover:bg-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
                   // className="relative inline-flex items-center px-4 py-2  text-sm font-medium rounded-md text-black"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                      />
                    </svg>

                    {/* <PlusIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    /> */}
                    <span>Posts</span>
                  </Link>

                  <Link
                    to="/login"
                    type="button"
                    // className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-lg shadow-gray-300 text-sm font-medium rounded-md text-white bg-gray-400  hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
                   // className="relative inline-flex items-center px-4 py-2  text-sm font-medium rounded-md text-black "
                  >
                    <LoginIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/register"
                    //className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                    className="ml-2 relative inline-flex items-center px-4 py-2 border border-transparent shadow-lg shadow-gray-300 text-sm font-medium rounded-md bg-gray-400 text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
                    //className="relative inline-flex items-center px-4 py-2  text-sm font-medium rounded-md text-black "
                  >
                    <PlusIcon className=" mr-2 h-5 w-5" aria-hidden="true" />
                    <span>Register</span>
                  </Link>
                  {/* </div>
                <div className="hidden  md:ml-4 md:flex-shrink-0 md:flex md:items-center"> */}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
              
              {/* {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </a>
              ))} */}

              <Link
                to="/posts"
                //className="pr-3  inline-flex items-center  mr-2 px-3 py-2 border border-transparent shadow-lg shadow-gray-300 text-sm font-medium rounded-md text-white bg-gray-400  hover:bg-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
                className="relative inline-flex items-center px-4 py-2  text-sm font-medium rounded-md text-black "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                  />
                </svg>

                {/* <PlusIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    /> */}
                <span>Posts</span>
              </Link>

              <Link
                to="/login"
                type="button"
                // className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                //className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-lg shadow-gray-300 text-sm font-medium rounded-md text-white bg-gray-400  hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
                className="relative inline-flex items-center px-4 py-2  text-sm font-medium rounded-md text-black "
              >
                <LoginIcon className="ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                //className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                //className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-lg shadow-gray-300 text-sm font-medium rounded-md bg-gray-400 text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
                className="relative inline-flex items-center px-4 py-2  text-sm font-medium rounded-md text-black "
              >
                <PlusIcon className=" mr-2 h-5 w-5" aria-hidden="true" />
                <span>Register</span>
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default PublicNavbar;

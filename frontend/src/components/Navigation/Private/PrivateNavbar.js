/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link,NavLink } from "react-router-dom";
import {useDispatch} from "react-redux"
import {
  BellIcon,
  MenuIcon,
  XIcon,
  BookOpenIcon,
} from "@heroicons/react/outline";
import { PlusIcon, LogoutIcon } from "@heroicons/react/solid";
import { logoutAction } from "../../../redux/slices/users/userSlices";
import logo from '../../../img/logo.png'

const navigation = [
  // { name: "Home", href: "/", current: true },
  // { name: "Create", href: "/create-post", current: false },
  // { name: "Posts", href: "/posts", current: false },

];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PrivateNavbar = ({ isLogin }) => {
  console.log(isLogin,"is/login");
  const userNavigation = [
    { name: "Your Profile", href: `/profile/${isLogin?._id}` },
    { name: "Change your password", href: "/update-password" },
    { name: "Saved Posts", href: "/saved-list" },
    
   
  ];
//logout
const dispatch = useDispatch();
const navLinkStyles = ({ isActive,item }) => {		
  return (
      isActive?('bg-gray-500 text-white font-semibold px-2 py-2 rounded-md text-md font-medium'):('text-white bg-gray-400 hover:text-white font-semibold px-2 py-2 rounded-md text-md font-medium')							
  )
}

  return (
    <Disclosure as="nav" className="bg-white shadow-md shadow-gray-300 sticky top-0  z-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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
                  {navigation.map(item => (
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
                  ))}
                </div>
              </div>
              <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                <div className="flex-shrink-0 ">

                <Link
                    to="/posts"
                    className="pr-3  inline-flex items-center  mr-2 px-3 py-2 border border-transparent shadow-lg shadow-gray-300 text-sm font-medium rounded-md text-white bg-gray-400  hover:bg-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-5">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                    </svg>

                    {/* <PlusIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    /> */}
                    <span>Posts</span>
                  </Link>


                  <Link
                    to="/create-post"
                    className="pr-3  relative inline-flex items-center mr-2 px-4 py-2 border border-transparent shadow-lg shadow-gray-300 text-sm font-medium rounded-md text-white bg-gray-400  hover:bg-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
                  >
                    <PlusIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span>New Post</span>
                  </Link>





                  <button
                  onClick={()=>dispatch(logoutAction())}
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-lg shadow-gray-300 text-sm font-medium rounded-md text-white bg-gray-400  hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
                  >
                    <LogoutIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span>Logout</span>
                  </button>
                </div>
                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative z-10">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="bg-gray-800 ml-4 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            {/* <span className="sr-only">Open user menu</span> */}
                            <img
                              className="h-8 w-8 rounded-full"
                              src={isLogin?.profilePhoto}
                              alt=""
                            />
                          </Menu.Button>
                          <div>
                        <span className="text-gray-700 font-bold">{isLogin?.firstname} {isLogin?.lastname}</span>
                        </div>
                        </div>
                    
                      
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg shadow-gray-400 py-1 bg-gray-300 ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            {userNavigation.map(item => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                        
                      </>
                      
                    )}
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map(item => (
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
              ))}
            </div>
            {/* Mobile */}
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5 sm:px-6">
               


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
                className="pr-3  inline-flex items-center  mr-2 px-3 py-2 border border-transparent shadow-lg shadow-gray-300 text-sm font-medium rounded-md text-white bg-gray-400  hover:bg-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
                //className="relative inline-flex items-center px-4 py-2  text-sm font-medium rounded-md text-black "
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
                    to="/create-post"
                    className="pr-3  inline-flex items-center  mr-2 px-3 py-2 border border-transparent shadow-lg shadow-gray-300 text-sm font-medium rounded-md text-white bg-gray-400  hover:bg-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"

                   // className="relative inline-flex items-center px-4 py-2  text-sm font-medium rounded-md text-black ml-1"
                    >
                    <PlusIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span>New Post</span>
                  </Link>
                  <button
                  onClick={()=>dispatch(logoutAction())}
                    type="button"
                    className="pr-3  inline-flex items-center  mr-2 px-3 py-2 border border-transparent shadow-lg shadow-gray-300 text-sm font-medium rounded-md text-white bg-gray-400  hover:bg-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"

                   // className="relative inline-flex items-center px-4 py-2  text-sm font-medium rounded-md text-black ml-2 "
                    >
                    <LogoutIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span>Logout</span>
                  </button>
                 


                  





                 
                <div className="flex-shrink-0 ml-4">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={isLogin.profilePhoto}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {isLogin?.firstname} {isLogin?.lastname}
                  </div>
                  <div className="text-sm font-medium text-gray-800">
                    {isLogin?.email}
                  </div>
                </div>
                {/* <button className="ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}
              </div>
            </div>
              {/* <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col ml-5"> */}
            
              <div className="pr-3  inline-flex items-center py-2 border border-transparent  text-sm font-medium rounded-md text-white   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 ml-5 ">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-2 flex flex-col">
                {userNavigation.map(item => (
                  // <a
                  //   key={item.name}
                  //   href={item.href}
                  //   className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-white hover:bg-gray-700"
                  // >
                  //   {item.name}
                  // </a>
                  <NavLink 
                  key={item.name}
                  to={item.href}
                  className={navLinkStyles}
                  aria-current={
                    item.current
                      ? 'page'
                      : undefined
                  }
                >
                  {item.name}
                </NavLink>
                ))}
                </div>
              </div>
              </div>
    
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default PrivateNavbar;

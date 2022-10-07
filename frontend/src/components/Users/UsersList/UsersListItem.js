import React from "react";
import { Link } from "react-router-dom";
import { MailIcon } from "@heroicons/react/solid";
import { blockUserAction, unBlockUserAction } from "../../../redux/slices/users/userSlices";
import { useDispatch, useSelector } from "react-redux";


const UsersListItem = user => {
  //dispatch
  const dispatch = useDispatch();
  return (
    <>
      <div className="p-8 mb-4 bg-gray-100 shadow rounded shadow-md shadow-gray-400">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full lg:w-3/12 flex px-4 mb-6 lg:mb-0">
            <img
              className="w-10 h-10 mr-4 object-cover rounded-full"
              src={user?.user?.profilePhoto}
              alt="profile "
            />
            <div>
              <p className="text-sm font-medium font-serif font-bold">{user?.user?.firstname} {user?.user?.lastname}</p>
              <p className="text-xs text-gray-700">{user?.user?.email}</p>
            </div>
          </div>
          <div className="w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0">
            <p className="py-1 px-2 text-xs text-purple-500  rounded-full">
              {user?.user?.accountType}
              {/* <span>{user?.user?.isBlocked && "Blocked"}</span> */}
            </p>
          </div>
          <div className="w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0">
            <p className="text-sm font-medium">
              <span className="text-base mr-2  text-bold text-yellow-500">
                {user?.user?.followers?.length}
              </span>
              followers
            </p>
          </div>
          <div className="w-full flex lg:w-4/12 px-4  mb-6 lg:mb-0">
            <p className="inline-block py-1 px-2 mr-2 mb-1 lg:mb-0 text-xs border-3 rounded bg-gray-400">
              <span className="text-base mr-2  boder-2 text-bold text-black-500">
                {user?.user?.posts?.length} - Posts
              </span>
            </p>
            <Link
              to={`/profile/${user?.user?._id}`}
              className=" text-gray-600 inline-block py-1 px-2 text-center mr-2 mb-1 lg:mb-0 text-xs border-2 border-gray-500 bg-gray-300 rounded hover:bg-gray-600 hover:text-white"
            >
              Profile
            </Link>

            {user?.user?.isBlocked ? (
              <button
                onClick={() => dispatch(unBlockUserAction(user?.user?._id))}
                className="inline-block py-1 px-2 text-center bg-gray-500 text-gray-300 mr-2 mb-1 lg:mb-0 text-xs border rounded"
              >
                Unblock
              </button>
            ) : (
              <button
                onClick={() => dispatch(blockUserAction(user?.user?._id))}
                className="inline-block py-1 px-2 text-center bg-red-600 text-gray-300 mr-2 mb-1 lg:mb-0 text-xs border rounded"
              >
                Block
              </button>
            )}

            <Link
                to='/send-mail'
                state={{email:user?.user?.email,
                  id:user?.user?.id
              }}
              className="inline-flex  justify-center bg-gray-700 px-2   border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white  hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <MailIcon
                className="-ml-1 mr-2 h-5 w-5 text-gray-200"
                aria-hidden="true"
              />
              <span className="text-base mr-2  text-bold text-black-500">
                Message
              </span>
            </Link>
          </div>
          <div className="w-full lg:w-1/12 px-4">
            <div className="flex items-center">
              {/* Send Mail */}
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersListItem;

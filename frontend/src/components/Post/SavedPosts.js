import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
export default function SavedPosts() {
  return (
    <>
      <section>
        <div class="py-20 bg-white min-h-screen radius-for-skewed">
          <div class="container mx-auto px-4">
            <div class="mb-16 flex flex-wrap items-center">
              <div class="w-full lg:w-1/2">
                {/* <span class="text-green-600 font-bold">
                  Latest Posts from our awesome authors
                </span> */}
                <h2 class="text-4xl text-gray-900 lg:text-5xl font-bold font-heading">
                  Saved Posts
                </h2>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3">
              <div class="w-full lg:w-3/4 px-3">
                <div class="flex flex-wrap bg-gray-200 -mx-3  lg:mb-6 shadow-md shadow-gray-500">
                  <div class="mb-10  w-full lg:w-1/4 px-3">
                    <Link>
                      {/* Post image */}
                      <img
                        class="w-full h-full object-cover rounded"
                        src=""
                        alt=""
                      />
                    </Link>
                    {/* Likes, views dislikes */}
                    <div className="flex flex-row bg-gray-300 justify-center w-full  items-center ">
                      {/* Likes */}
                      <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                        {/* Togle like  */}
                        <div className="">
                          <ThumbUpIcon className="h-7 w-7 text-indigo-600 cursor-pointer" />
                        </div>
                        <div className="pl-2 text-gray-600">(2)</div>
                      </div>
                      {/* Dislike */}
                      <div className="flex flex-row  justify-center items-center ml-4 mr-4 pb-2 pt-1">
                        <div>
                          <ThumbDownIcon className="h-7 w-7 cursor-pointer text-gray-600" />
                        </div>
                        <div className="pl-2 text-gray-600">

                        </div>
                      </div>
                      {/* Views */}
                      <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                        <div>
                          <EyeIcon className="h-7 w-7  text-gray-400" />
                        </div>
                        <div className="pl-2 text-gray-600">
                          {/* {post?.numViews} */}2
                        </div>
                        <div>
                        <button
                        // onClick={() =>
                        //   dispatch(deletePostAction(postDetails?._id))
                        // }
                       // onClick={() => confirmDelete(postDetails?._id)}
                        class="ml-3"
                      >
                        <TrashIcon class="h-6 mt-3  " />
                      </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="w-full lg:w-3/4 px-3">
                    <Link class="hover:underline">
                      <h3 class="mb-1 text-2xl text-black-400 font-bold font-heading">
                        {/* {capitalizeWord(post?.title)} */} post title
                      </h3>
                    </Link>
                    <p class="text-gray-400">post description</p>
                    {/* Read more */}
                    <Link className="text-gray-500 hover:underline">
                      Read More..
                    </Link>
                    {/* User Avatar */}
                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <Link>
                          <img
                            className="h-10 w-10 rounded-full"
                            src=""
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          <Link className="text-black-400 hover:underline ">
                            user full name
                          </Link>
                        </p>
                        <div className="flex space-x-1 text-sm text-black-500">
                          <time>
                            {/* <DateFormatter date={post?.createdAt} /> */}
                            Post date
                          </time>
                          <span aria-hidden="true">&middot;</span>
                        </div>
                      </div>
                    </div>
                    {/* <p class="text-gray-500">
                          Quisque id sagittis turpis. Nulla sollicitudin rutrum
                          eros eu dictum...
                        </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       
   
      </section>
    </>
  );
}

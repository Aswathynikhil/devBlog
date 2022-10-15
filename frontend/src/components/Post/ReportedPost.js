import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import * as DOMPurify from "dompurify";
import {
  blockPostAction,
  fetchAllPostAction,
  fetchReportedPostAction,
} from "../../redux/slices/posts/postSlices";


export default function ReportedPost() {
  //dispatch
  const dispatch = useDispatch();
  // Select user from from store
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;

  const posts = useSelector((state) => state?.post);

  const { blockPost,reports, reportedList, loading, appErr, serverErr, post } = posts;

  // fetch post
  useEffect(() => {
    dispatch(fetchAllPostAction(""));
    dispatch(fetchReportedPostAction(""));
  }, [dispatch,blockPost]);

  console.log(reportedList, "rrrrrrrrr");
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 p-20">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="mb-20 flex flex-wrap items-center  mt-10">
            <div className="w-full  lg:w-1/2  ">
              <h3 className="text-4xl text-gray-600 lg:text-5xl font-bold font-heading text-center font-serif">
                Reported Posts
              </h3>
            </div>
          </div>
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg ">
    

             <table className=" min-w-full  divide-y divide-gray-200 ">
                <thead className="bg-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium text-white uppercase tracking-wider text-center"
                      >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium text-white uppercase tracking-wider text-center"
                     >
                      Post
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium text-white uppercase tracking-wider text-center"
                     >
                     Number of Reports
                    </th>
                   
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Block</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reportedList && reportedList.map((post) => (
                    <tr key={post._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 text-center">
                            <img className="h-10 w-10 rounded-full" src={post?.user?.profilePhoto} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                                <Link to={`/profile/${post?.user?.id}`}>
                                {post?.user?.firstname} {post?.user?.lastname}  
                                </Link>
                            </div>
                            <div className="text-sm text-gray-500">{post?.user?.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-900">{post?.title}</div>
                        <div className="text-sm text-gray-900">
                        <Link to={`/posts/${post?.id}`}  className="mt-4 inline-flex justify-center px-4 py-2 border border-gray-200 shadow-sm text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                          PostDetails
                        </Link>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 text-center">{post?.reports?.length}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                        {/* {post?.reports?.length>=2 ?  <a href="#" className=" inline-flex justify-center px-4 py-2 border border-gray-200 shadow-sm text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                       Block
                        </a>: null} */}

                        {post?.reports?.length>=2 ?
                             post?.isBlocked ? (
                              <button
                               
                                className="inline-block py-1 px-2 text-center bg-green-700 text-gray-300 mr-2 mb-1 lg:mb-0 text-xs border rounded"
                              >
                              Blocked
                              </button>
                            ) : (
                              <button
                                onClick={() => dispatch(blockPostAction(post?.id))}
                                className="inline-block py-1 px-2 text-center bg-red-600 text-gray-300 mr-2 mb-1 lg:mb-0 text-xs border rounded"
                              >
                                Block
                              </button>
                            )
                        :null}
                       
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table> 



           
          </div>
        </div>
      </div>
    </div>
    
    
  );
  
}


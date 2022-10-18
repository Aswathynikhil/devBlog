import { useEffect, useState } from "react";
import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";

import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import {
  deleteSavedPostAction,
  fetchSavedPostAction,
  toggleAddDislikesToPostAction,
  toggleAddLikesToPostAction,
} from "../../redux/slices/posts/postSlices";
import noPosts from "../../img/noPosts.png";
import noPosts1 from "../../img/noPosts1.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import * as DOMPurify from "dompurify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import alert css


export default function SavedPosts() {
  const [search, setSearch] = useState("");
  //dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select user from from store
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;

  const posts = useSelector((state) => state?.post);
  const {
    savedList,
    loading,
    appErr,
    serverErr,
    deleted,
    savedPost,
    likes,
    dislikes,
    post,
  } = posts;
  console.log(posts, "kkkkkkk");
  console.log(savedList, "hhhhhhhhh");
  //console.log(savedList[0]?.post,"iiiii");

  // fetch post
  useEffect(() => {
    dispatch(fetchSavedPostAction(""));
  }, [dispatch, likes, dislikes, deleted, savedPost]);

  // React-conform-alert to delete a post
  function confirmDelete(id) {
    console.log(id, "ghfkjlmid");
    confirmAlert({
      title: "Are You sure?",
      message: "You want to delete this post?",
      buttons: [
        {
          label: "YES",
          onClick: () => dispatch(deleteSavedPostAction(id)),
        },
        {
          label: "NO  ",
          onClick: () => console.log("NO! I don't want to delete this post!"),
        },
      ],
    });
  }

  return (
    <>
      <section>
        <div class="py-20 bg-gray-200 min-h-screen radius-for-skewed">
          <div class="container mx-auto px-5">
            <div class="mb-20 flex flex-wrap items-center ">
              <div class="w-full  lg:w-1/2  ">
                <h3 class="text-4xl text-gray-600 lg:text-5xl font-bold font-heading text-center font-serif">
                  Saved Posts
                </h3>
              </div>
            </div>

            {/* Post goes here */}

            {
              // loading ? (
              //   <h1>Loading...</h1>
              // ) :
              savedList?.post?.length <= 0 ? (
                <div className="">
                  <div className=" w-60 lg:w-1/2 px-4   mb-10   justify-center h-20 w-20 ">
                    <img className="w-full" src={noPosts1} alt={noPosts} />
                  </div>
                </div>
              ) : (
                savedList &&
                savedList[0]?.post?.map((post, index) => (
                  <div class="flex flex-wrap bg-gray-300 -mx-3  lg:mb-6 shadow-md shadow-gray-500 ">
                        <div class=" mb-10 w-full h-41 lg:w-1/4 px-8 py-8 p-20">
                          <Link>
                            {/* Post image */}
                            <img
                              className=" mt-4 w-full h-30 object-cover rounded"
                              src={post?.image}
                              alt=""
                            />
                          </Link>
                          {/* Likes, views dislikes */}
                          <div className="p-1 flex flex-row bg-gray-300 justify-center w-full  items-center ">
                            {/* Likes */}
                            <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                              {/* Toggle like  */}
                          <div>
                            <button
                              onClick={() => confirmDelete(post?._id)}
                              class="ml-3"
                            >
                              <TrashIcon class="h-5 mt-2 text-gray-600 " />
                            </button>
                          </div>

                          {post?.likes.includes(userAuth?._id) ? (
                            <div className="ml-4">
                              <ThumbUpIcon
                                onClick={() =>
                                  dispatch(
                                    toggleAddLikesToPostAction(post?._id)
                                  )
                                }
                                className=" h-5 w-5 text-blue-600 cursor-pointer"
                              />
                            </div>
                          ) : (
                            <div className="ml-4">
                              <ThumbUpIcon
                                onClick={() =>
                                  dispatch(
                                    toggleAddLikesToPostAction(post?._id)
                                  )
                                }
                                className=" h-5 w-5 text-gray-600 cursor-pointer"
                              />
                            </div>
                          )}

                          <div className="text-gray-600">
                            {post?.likes?.length ? post?.likes?.length : 0}
                          </div>
                        </div>
                        {/* Dislike */}
                        <div className="flex flex-row  justify-center items-center ml-4 mr-4 pb-2 pt-1 ">
                          {post?.disLikes.includes(userAuth?._id) ? (
                            <div>
                              <ThumbDownIcon
                                onClick={() =>
                                  dispatch(
                                    toggleAddDislikesToPostAction(post?._id)
                                  )
                                }
                                className="h-5 w-5 cursor-pointer text-red-600"
                              />
                            </div>
                          ) : (
                            <div>
                              <ThumbDownIcon
                                onClick={() =>
                                  dispatch(
                                    toggleAddDislikesToPostAction(post?._id)
                                  )
                                }
                                className="h-5 w-5 cursor-pointer text-gray-600"
                              />
                            </div>
                          )}

                          <div className=" text-gray-600">
                            {post?.disLikes?.length
                              ? post?.disLikes?.length
                              : 0}
                          </div>
                        </div>
                        {/* Views */}
                        <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                          <div>
                            <EyeIcon className="h-5 w-5  text-gray-400" />
                          </div>
                          <div className=" text-gray-600">{post?.numViews}</div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full lg:w-3/4 px-3">
                      <Link className="hover:underline">
                        <h3 className="mb-1 pt-12 text-2xl text-black-400 font-bold font-heading">
                          {/* {capitalizeWord(post?.title)} */}
                          {post?.title}
                        </h3>
                      </Link>

                      <div
                        className="text-black truncate "
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(post?.description),
                        }}
                      ></div>

                      {/* Read more */}
                      <div className="mt-5">
                        <Link
                         to={`/posts/${post?._id}`}
                          className=" text-gray-500 hover:underline "
                        >
                          Read More..
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )
            }
          </div>
        </div>
      </section>
    </>
  );
}

import { useEffect ,useState} from "react";
import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { Link ,Navigate, useNavigate} from "react-router-dom";
import * as DOMPurify from "dompurify";
import {
  fetchAllPostAction,
  toggleAddDislikesToPostAction,
  toggleAddLikesToPostAction,
} from "../../redux/slices/posts/postSlices";
import DateFormatter from "../../utils/DateFormatter";
import { fetchAllCategoriesAction } from "../../redux/slices/category/categorySlices";
import LoadingComponent from "../../utils/LoadingComponent";
import noPosts from "../../img/noPosts.png";
// import LazyLoad from 'react-lazyload'

export default function PostsList() {

  const [search, setSearch] = useState("");
  //dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select user from from store
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;

  //select post from store
  const post = useSelector((state) => state?.post);
  const {     hasMore,postLists, loading, appErr, serverErr, likes, dislikes ,pageNumber,} = post;
  console.log(postLists);


  const blogsPerPage = 10;
  const pagesVisited = pageNumber * blogsPerPage;
  const pageCount = Math.ceil([postLists].length / blogsPerPage);
  console.log(pageCount,"ghjkl");

  //select category from store
  const category = useSelector((state) => state?.category);
  const {
    categoryList,
    loading: catLoading,
    appErr: catAppErr,
    serverErr: catServerErr,
  } = category;
  console.log(categoryList);


  const handlePageClick = ({ selected: selectedPage }) => {
    pageNumber(selectedPage);
  };

  // fetch post
  useEffect(() => {
    // dispatch(fetchAllPostAction(""));
        //load all the posts from server
        if (userAuth) {
          dispatch(fetchAllPostAction(""));
        } 
        else {
          navigate("/login");
        }
  }, [dispatch, likes, dislikes]);

  // fetch category
  useEffect(() => {
    dispatch(fetchAllCategoriesAction());
  }, [dispatch]);

  return (
    <>
      <section>
        <div class="py-20 bg-gray-200 min-h-screen radius-for-skewed">
          <div class="container mx-auto px-4">

          <div className="flex justify-center  ">
              <div className="flex border border-gray-300 rounded">
                <input
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                  type="text"
                  className="block w-96 px-4 py-2 text-black-700 bg-white border rounded-md focus:border-gray-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Search..."
                />
                <button className="px-4 text-white bg-black hover:bg-gray-500  border-l rounded ">
                  Search
                </button>
              </div>
            </div>

            <div class="mb-16 flex flex-wrap items-center">
              <div class="w-full lg:w-1/2">
                <span class="text-black-600 font-bold font-serif text-blue-400">
                  Latest Posts from our awesome authors
                </span>
                <h2 class="text-4xl text-black-300 lg:text-5xl font-bold font-serif font-heading">
                  Latest Post
                </h2>
              </div>
              <div class=" block text-right w-1/2">
                {/* View All */}
                <button
                  onClick={() => dispatch(fetchAllPostAction(""))}
                  class="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-black hover:bg-gray-700 text-gray-50 font-bold leading-loose transition duration-200"
                >
                  View All Posts
                </button>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3">
              <div class="mb-8 lg:mb-0 w-full lg:w-1/4 px-3">
                <div class="py-4 px-6 bg-gray-300  shadow-md shadow-gray-500 rounded">
                  <h4 class="mb-4 text-black-500 font-bold font-serif uppercase">
                    Categories
                  </h4>
                  <ul>
                    {/* <div>Loading</div>

                    <div className="text-red-400 text-base">
                      Categories Error goes here
                    </div>

                    <div className="text-xl text-gray-100 text-center">
                      No category
                    </div> */}

                    {catLoading ? (
                      <LoadingComponent />
                    ) : catAppErr || catServerErr ? (
                      <h1>
                        {" "}
                        {catAppErr} {catServerErr}
                      </h1>
                    ) : categoryList?.length <= 0 ? (
                      <h1 className="text-center">No category found</h1>
                    ) : (
                      categoryList?.map((category) => (
                        <li>
                          <p
                            onClick={() =>
                              dispatch(fetchAllPostAction(category?.title))
                            }
                            className="block cursor-pointer py-2 px-3 mb-4 rounded shadow-md shadow-gray-500 text-black-500 font-bold font-serif bg-white"
                          >
                            {category?.title}
                          </p>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
              <div class="w-full lg:w-3/4 px-7 shadow-md shadow-gray-500">
                {/* Post goes here */}

                {
                  // loading ? (
                  //   <h1>Loading...</h1>
                  // ) :
                  appErr || serverErr ? (
                    <h1 className="text-black text-lg text-center">
                      {catAppErr} {catServerErr}
                    </h1>
                  ) : postLists?.length <= 0 ? (
               
                      <div className="">
                    
                    <div className="" >
                          <Link
                            to="/create-post"
                            className="pr-3mr-2 px-4 py-2 border border-transparent shadow-lg shadow-gray-400 text-sm font-medium rounded-md text-white bg-gray-800  hover:bg-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
                          >
                            <span>Creat New Post</span>
                          </Link>
                        </div>

                         
                        <div className="w-60 lg:w-1/2 px-5   mb-10   justify-center h-20 w-20 ">
                          <img className="w-full" src={noPosts} alt={noPosts} />
                        </div>

                        
                       

                      </div>
                 
                  ) : (
                    postLists ?.filter((val) => {
                      if (search === "") {
                        return val;
                      } else if (
                        val.title
                          .toLowerCase()
                          .includes(search.toLocaleLowerCase())
                      ) {
                        return val;
                      }
                    })
                    
                    ?.map((post) => (
                      <div class="flex flex-wrap bg-gray-300 -mx-3  lg:mb-6 shadow-md shadow-gray-500 ">
                        <div class="mb-10 w-full h-41 lg:w-1/4 px-8 py-8">
                          <Link>
                            {/* Post image */}
                            <img
                              class="mt-4 w-full h-30 object-cover rounded"
                              src={post?.image}
                              alt=""
                            />
                          </Link>
                          {/* Likes, views dislikes */}
                          <div className="flex flex-row bg-gray-300 justify-center w-full  items-center ">
                            {/* Likes */}
                            <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                              {/* Toggle like  */}
                              {post?.likes.includes(userAuth?._id) ? (
                                <div className="">
                                  <ThumbUpIcon
                                    onClick={() =>
                                      dispatch(
                                        toggleAddLikesToPostAction(post?._id)
                                      )
                                    }
                                    className="h-7 w-7 text-blue-600 cursor-pointer"
                                  />
                                </div>
                              ) : (
                                <div className="">
                                  <ThumbUpIcon
                                    onClick={() =>
                                      dispatch(
                                        toggleAddLikesToPostAction(post?._id)
                                      )
                                    }
                                    className="h-7 w-7 text-gray-600 cursor-pointer"
                                  />
                                </div>
                              )}
                              <div className="pl-2 text-gray-600">
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
                                    className="h-7 w-7 cursor-pointer text-red-600"
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
                                    className="h-7 w-7 cursor-pointer text-gray-600"
                                  />
                                </div>
                              )}

                              <div className="pl-2 text-gray-600">
                                {post?.disLikes?.length
                                  ? post?.disLikes?.length
                                  : 0}
                              </div>
                            </div>
                            {/* Views */}
                            <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                              <div>
                                <EyeIcon className="h-7 w-7  text-gray-400" />
                              </div>
                              <div className="pl-2 text-gray-600">
                                {post?.numViews}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-full lg:w-3/4 px-3">
                          <Link className="hover:underline">
                            <h3 className="mb-1 mt-20 text-2xl text-black-400 font-bold font-heading">
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
                          {/* User Avatar */}
                          <div className="mt-5 flex items-center ">
                            <div className="mt-4 flex-shrink-0 mt-10">
                              <Link>
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={post?.user?.profilePhoto}
                                  alt=""
                                />
                              </Link>
                            </div>
                            <div className="ml-3 ">
                              <p className=" text-sm font-medium text-gray-900 mt-4">
                                <Link
                                  to={`/profile/${post?.user?._id}`}
                                  className="text-black-400 hover:underline "
                                >
                                  {post?.user?.firstname} {post?.user?.lastname}
                                </Link>
                              </p>
                              <div className="flex space-x-1 text-sm text-black-500">
                                <time>
                                  <DateFormatter date={post?.createdAt} />
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
                    ))
                  )
                }
              </div>
            </div>
          </div>
        </div>
        {/* <div className="bg-gray-900">
          <div class="skew bg-green-500 skew-bottom mr-for-radius">
            <svg
              class="h-8 md:h-12 lg:h-10 w-full text-gray-900"
              viewBox="0 0 10 10"
              preserveAspectRatio="none"
            >
              <polygon fill="currentColor" points="0 0 10 0 0 10"></polygon>
            </svg>
          </div>
          <div class="skew bg-gray-500  skew-bottom ml-for-radius">
            <svg
              class="h-8 bg-gray-500 md:h-12 lg:h-20 w-full text-gray-900"
              viewBox="0 0 10 10"
              preserveAspectRatio="none"
            >
              <polygon fill="currentColor" points="0 0 10 0 10 10"></polygon>
            </svg>
          </div>
        </div> */}
      </section>
    </>
  );
}

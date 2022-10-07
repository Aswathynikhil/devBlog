import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as DOMPurify from "dompurify";
import { toast } from "react-toastify";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import {
  deletePostAction,
  fetchSinglePostDetailsAction,
} from "../../redux/slices/posts/postSlices";
import DateFormatter from "../../utils/DateFormatter";
import LoadingComponent from "../../utils/LoadingComponent";
import AddComment from "../Comments/AddComments";
import CommentsList from "../Comments/CommentsList";

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();
  //select post details from store
  const post = useSelector((state) => state?.post);
  const { postDetails, loading, appErr, serverErr, isDeleted } = post;

  //get login user
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;

  const isCreatedBy = postDetails?.user?._id === userAuth?._id;
  console.log(isCreatedBy);

  //comments
  const comment = useSelector((state) => state.comment);
  const { commentCreated, commentDeleted } = comment;

  useEffect(() => {
    dispatch(fetchSinglePostDetailsAction(id));
  }, [id, dispatch, commentCreated, commentDeleted]);
  if (isDeleted) return <Navigate to="/posts" />;

  return (
    <>
      {loading ? (
        <div className="h-screen">
          <LoadingComponent />
        </div>
      ) : appErr || serverErr ? (
        <h1 className="h-screen text-red-400 text-xl">
          {appErr} {serverErr}
        </h1>
      ) : (
        <section class="py-20 2xl:py-40 bg-gray-200 overflow-hidden">
          <div className="container px-4 mx-auto">
            {/* Post Image */}
            <img
              className="mx-auto w-100 h-96 "
              src={postDetails?.image}
              alt=""
            />
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="mt-7 mb-5 text-4xl 2xl:text-4xl text-black font-bold font-heading font-serif">
                {postDetails?.title}
              </h2>

              {/* User */}
              <div className="inline-flex pt-14 mb-14 items-center border-t border-gray-500">
                <img
                  className="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
                  src={postDetails?.user?.profilePhoto}
                  alt=""
                />
                <div className="text-left">
                  <h4 className="mb-1 text-2xl ">
                    <Link to={`/profile/${postDetails?.user?._id}`}>
                      <span className="text-xl lg:text-2xl font-bold text-black font-serif">
                        {postDetails?.user?.firstname}{" "}
                        {postDetails?.user?.lastname}
                      </span>
                    </Link>
                  </h4>
                  <p className="text-gray-600 font-bold ">
                    Joined:{" "}
                    <DateFormatter date={postDetails?.createdAt} />
                  </p>
                </div>
              </div>
              {/* Post description */}
              <div className="max-w-xl mx-auto">
                <p className="mb-6 text-left  text-xl text-black-200 text-center ">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(postDetails?.description),
                    }}
                  ></div>

                  {/* Show delete and update btn if created by the login user */}
                  {isCreatedBy ? (
                    <p className="flex justify-center">
                      <Link to={`/update-post/${postDetails?._id}`} class="p-3">
                        <PencilAltIcon className="h-8 mt-3 text-black " />
                      </Link>
                      <button
                        onClick={() =>
                          dispatch(deletePostAction(postDetails?._id))
                        }
                        class="ml-3"
                      >
                        <TrashIcon class="h-8 mt-3 text-black-600 " />
                      </button>
                    </p>
                  ) : null}
                </p>
              </div>
            </div>
          </div>
          {/* Add comment Form component here */}
          {userAuth ? <AddComment postId={id} /> : null}
          <div className="flex justify-center  items-center ">
            <CommentsList comments={postDetails?.comments} postId={post?._id} />
          </div>
        </section>
      )}
    </>
  );
};

export default PostDetails;

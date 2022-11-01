import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as DOMPurify from "dompurify";
import Modal from "react-modal";
// import { toast } from "react-toastify";

import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";

import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon,
} from "react-share";

import {
  deletePostAction,
  deleteSavedPostAction,
  fetchSavedPostAction,
  fetchSinglePostDetailsAction,
  reportPostAction,
  savedPostAction,
} from "../../redux/slices/posts/postSlices";
import { toast, Toaster } from "react-hot-toast";
import DateFormatter from "../../utils/DateFormatter";
import LoadingComponent from "../../utils/LoadingComponent";
import AddComment from "../Comments/AddComments";
import CommentsList from "../Comments/CommentsList";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import alert css
import { FaRegBookmark, FaBookmark, FaFlag, FaRegFlag } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import {AiOutlineCloseCircle} from "react-icons/ai";


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '3%',
  },
};

const PostDetails = () => {
  const [modalIsOpen,setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();
  //select post details from store
  const post = useSelector((state) => state?.post);
  const {
    postDetails,
    loading,
    appErr,
    serverErr,
    isDeleted,
    savedList,
    savedPost,
    deleted,
    saved,
    reports,
  } = post;
  console.log(savedList, "hgjk");
  //get login user
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;

  const isCreatedBy = postDetails?.user?._id === userAuth?._id;
  console.log(isCreatedBy);

  //comments
  const comment = useSelector((state) => state.comment);
  const { commentCreated, commentDeleted } = comment;

  // React-conform-alert to delete a post
  function confirmDelete(id) {
    console.log(id, "ghfkjlmid");
    confirmAlert({
      title: "Confirm to delete this post.",
      message: "Are you sure, You want to delete this post?",
      buttons: [
        {
          label: "YES",
          onClick: () => dispatch(deletePostAction(id)),
        },
        {
          label: "NO  ",
          onClick: () => console.log("NO! I don't want to delete this post!"),
        },
      ],
    });
  }
  const shareUrl = `http://localhost:3000/posts/${postDetails?._id}`;
    
  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }
  useEffect(() => {
    dispatch(fetchSinglePostDetailsAction(id));
    dispatch(fetchSavedPostAction(""));
    dispatch(deletePostAction(""));
  }, [
    id,
    dispatch,
    commentCreated,
    commentDeleted,
    savedPost,
    deleted,
    saved,
    reports,
  ]);

  const tostAlert = (msg) => {
    toast.success(msg);
  };
  if (isDeleted) return <Navigate to="/posts" />;

  if (!userAuth) return <Navigate to="/login" />;
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
        <section className="py-20 2xl:py-40 bg-gray-200 overflow-hidden">
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
                    Joined: <DateFormatter date={postDetails?.createdAt} />
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
                      <Link to={`/update-post/${postDetails?._id}`} className="p-3">
                        <PencilAltIcon className="h-7 mt-3 text-black " />
                      </Link>
                      <button
                        // onClick={() =>
                        //   dispatch(deletePostAction(postDetails?._id))
                        // }
                        onClick={() => confirmDelete(postDetails?._id)}
                        className="ml-3"
                      >
                        <TrashIcon className="h-8 mt-3 text-black-600 " />
                      </button>
                      {/* <Link to={`/share-post/${postDetails._id}`}>
                      
                        <FiShare2  className="ml-4 h-8 mt-3 text-black-600 "/>
                      </Link> */}
                     <div>
                      <button onClick={openModal}>
                        <FiShare2 className="ml-4 h-8 mt-6 text-black-600 " />
                      </button>

                      <Modal 
                      isOpen = {modalIsOpen}
                      style={customStyles}
                      >
                        <h1 className="mb-4 font-serif text-blue-500">Share this Blog In</h1>

                        <FacebookShareButton className="mr-5"
                          url={shareUrl}
                        >
                          <FacebookIcon size={40} round={true} />
                        </FacebookShareButton>

                        <WhatsappShareButton className="mr-5"
                          url={shareUrl}
                         
                        >
                          <WhatsappIcon size={40} round={true} />
                        </WhatsappShareButton>
                        <TelegramShareButton className="mr-5"
                          url={shareUrl}
                          
                        >
                          <TelegramIcon size={40} round={true} />
                        </TelegramShareButton>

                        <LinkedinShareButton className=""
                          url={shareUrl}
                        
                        >
                          <LinkedinIcon size={40} round={true} />
                        </LinkedinShareButton>
                        <button  onClick={closeModal}>
                          <AiOutlineCloseCircle className="ml-10 item-center "/>
                        </button>
                      </Modal>
                      </div>
              
                    </p>
                  ) : (
                    <div className="flex justify-center p-5">
                      <div className="mr-3 mt-5">
                        {savedList &&
                        savedList[0]?.post?.find(
                          (element) =>
                            element?._id.toString() ===
                            postDetails?._id.toString()
                        ) ? (
                          <>
                            <FaBookmark
                              onClick={() => {
                                tostAlert(
                                  `${postDetails?.title} unsaved successfully`
                                );
                                dispatch(
                                  deleteSavedPostAction(postDetails?._id)
                                );
                              }}
                              className=" h-5 w-5 text-blue-600 cursor-pointer"
                            />
                            <p className="text-xs">Unsave</p>
                          </>
                        ) : (
                          <>
                            <FaRegBookmark
                              onClick={() => {
                                tostAlert(
                                  `${postDetails?.title} saved successfully`
                                );
                                dispatch(savedPostAction(postDetails?._id));
                              }}
                              className=" h-5 w-5 text-black-900 cursor-pointer"
                            />
                            <p className="text-xs">Save</p>
                          </>
                        )}
                      </div>
                      <div className="ml-3">
                        {postDetails?.reports?.includes(userAuth?._id) ? (
                          <div className="">
                            <FaFlag className="mt-4 h-6 w-6 text-black-900 cursor-pointer" />
                            <p className="text-xs">Report- { postDetails?.reports?.length}</p> 
                          </div>
                        ) : (
                          <div className="flex">
                            <div className="flex-1">
                              <FaRegFlag
                                onClick={() =>
                                  dispatch(reportPostAction(postDetails?._id))
                                }
                                className=" mt-4 h-6 w-6 text-black-900 cursor-pointer"
                              />
                              <p className="text-xs">Report- { postDetails?.reports?.length}</p>   
                              {/* <p className="text-xs">Report</p> */}
                            </div>
                            {/* <div className="p-2 text-gray-600 flex-1 ">
                              {postDetails?.reports?.length
                                ? postDetails?.reports?.length
                                : 0}
                            </div> */}
                          </div>
                        )}
                      </div>
                      <div>
                      <button onClick={openModal}>
                        <FiShare2 className="ml-4 h-8 mt-5 text-black-600 " />
                      </button>

                      <Modal 
                      isOpen = {modalIsOpen}
                      style={customStyles}
                      >
                        <h1 className="mb-4 font-serif text-blue-500">Share this Blog In</h1>

                        <FacebookShareButton className="mr-5"
                          url={shareUrl}
                      
                        >
                          <FacebookIcon size={40} round={true} />
                        </FacebookShareButton>

                        <WhatsappShareButton className="mr-5"
                          url={shareUrl}
                      
                        >
                          <WhatsappIcon size={40} round={true} />
                        </WhatsappShareButton>
                        <TelegramShareButton className="mr-5"
                          url={shareUrl}
                       
                        >
                          <TelegramIcon size={40} round={true} />
                        </TelegramShareButton>

                        <LinkedinShareButton className=""
                          url={shareUrl}
                    
                        >
                          <LinkedinIcon size={40} round={true} />
                        </LinkedinShareButton>
                        <button  onClick={closeModal}>
                          <AiOutlineCloseCircle className="ml-10 item-center "/>
                        </button>
                      </Modal>
                      </div>

                    </div>
                  )}
                </p>
              </div>
            </div>
          </div>
          {/* Add comment Form component here */}
          {userAuth ? <AddComment postId={id} /> : null}
          <div className="flex justify-center  items-center ">
            <CommentsList comments={postDetails?.comments} postId={post?._id} />
          </div>
          <Toaster position="top-center" reverseOrder={false} />
        </section>
      )}

      
    </>
    
  );
  
};

export default PostDetails;

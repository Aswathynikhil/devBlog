import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import { Navigate,  useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import JoditEditor from "jodit-react";
import CategoryDropDown from "../Categories/CategoryDropdown";
import {fetchSinglePostDetailsAction, updatePostAction } from "../../redux/slices/posts/postSlices";

//validation
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.object().required("Category is required"),
});

export default function UpdatePost(props) {
    const { id } = useParams();
    const navigate=useNavigate()
    const editor = useRef(null);
    console.log(id);

    //fetch the post in the url
    const dispatch=useDispatch()
useEffect(()=>{
  dispatch(fetchSinglePostDetailsAction(id))  
},[id,dispatch])
   
const postData =useSelector(state=>state?.post)
const {postDetails}=postData

//select updated post from store;
const postUpdate=useSelector(state=>state.post)
const {loading,appErr,serverErr,isUpdated}=postUpdate;


  //formik  
  const formik = useFormik({
    enableReinitialize:true,
    initialValues:{
        title:postDetails?.title,
        description:postDetails?.description,
        category:""
    },

    onSubmit:(values)=>{
        const data={
            title:values.title,
            description:values.description,
            category:values.category?.label,
            id,
        };
        dispatch(updatePostAction(data))
        //navigate(`/post-details/${id}`)
    },

    validationSchema:formSchema,
  });
  // if(isUpdated) return <Navigate to={`/post-details/${id}`}/>
  if(isUpdated) return <Navigate to={`/posts`}/>
  return (
    <>
      <div className="min-h-screen  bg-gray-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black-700 animate-bounce">
            Are you sure you want to edit {""}
            <span className="text-black-700 font-serif">{postDetails?.title}</span>
          </h2>
          {appErr || serverErr ? (
            <h1 className="text-red-400 text-xl text-center">{serverErr}{appErr}</h1>
          ):null}
        </div>
<div className="container">
        <div className="mt-8 xl:mx-auto sm:w-full sm:max-w-96">
          <div className="bg-gray-100 py-8 px-4 shadow-md shadow-gray-50 sm:rounded-lg xl:px-10">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <div className="mt-1">
                  <input
                    id="title"
                    name="title"
                    type="title"
                    autoComplete="title"
                    onBlur={formik.handleBlur("title")}
                    value={formik.values.title}
                    onChange={formik.handleChange("title")}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="text-red-500">
                  {formik.touched.title && formik.errors.title}
                </div>
              </div>
              <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
              <CategoryDropDown
                value={formik.values.category?.categoryTitle}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                error={formik.errors.category}
                touched={formik.touched.category}
              /> 
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <JoditEditor
                ref={editor}
                  rows="5"
                  cols="10"
                  onBlur={formik.handleBlur("description")}
                  value={formik.values.description}
                  onChange={formik.handleChange("description")}
                  className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                  type="text"
                />
                <div className="text-red-500">
                  {formik.touched.description && formik.errors.description}
                </div>
              </div>

              <div>
                {loading ?( <button
                  disabled
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-purple-500 hover:to-yellow-500 ...  leading-loose transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Loading please wait...
                </button>) : (<button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-xl text-sm font-bold text-white bg-black hover:from-pink-600 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                >
                  Update
                </button>)}
              </div>
            </form>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
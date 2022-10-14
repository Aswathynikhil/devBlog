
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import * as Yup from "yup";
import { createPostAction, fetchPostsAction } from "../../redux/slices/posts/postSlices";
import CategoryDropdown from "../Categories/CategoryDropdown";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import JoditEditor from "jodit-react";
import { useMemo, useRef } from "react";
import React, {Component, PropTypes} from 'react';
import {useEffect,useState} from "react"
//import RichTextEditor from 'react-rte';
//import NewFeed from "../homepage/NewFeed";


//form schema
const formSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.object().required("Category is required"),
  image: Yup.string().required("Image is required"),
});



//css for dropzone
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
border-color:'red'
  transition: border 0.24s ease-in-out;
`;

export default function CreatePost() {
  const editor = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [preview, setPreview] = useState('');
  

  //select store data
  const post = useSelector((state) => state?.post);
  const { isCreated, loading, appErr, serverErr } = post;
  console.log(post);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      image: "",
    },
    onSubmit: (values) => {
      //dispatch the action

      const data = {
        category: values?.category?.label,
        title: values?.title,
        description: values?.description,
        image: values?.image,
      };
      //console.log(values);

      
      dispatch(createPostAction(data));
      // navigate('/');

      
    },
    validationSchema: formSchema,

    
  });

  // Image Preview
	let image = formik?.values?.image;
	useEffect(() => {
		if (image) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(image);
		} else {
			setPreview(null);
		}
	}, [image]);
if(isCreated)return <Navigate to='/posts' />
  return (
    <>
      <div className="container min-h-screen bg-gray-200 flex flex-col justify-center py-12 sm:px-6 lg:px-2">
        <div className="sm:mx-auto sm:w-full sm:max-w-md ">
          <h1 className=" text-center text-3xl font-extrabold text-black-700 animate-bounce">
            What going in Your Mind?...
          </h1>

          <p className="mt-2 text-center text-sm text-gray-600 shadow-md shadow-gray-50">
            <p className="font-semibold  font-serif text-gray-700 hover:text-indigo-500  ">
              Share your ideas to the world. Your post must be free from
              profanity
            </p>
          </p>

          {appErr || serverErr ? (
                  <p className="mt-2 text-center text-lg text-red-600">
                    {serverErr}... {appErr}
                  </p>
                ) : null}
        </div>
        <div className="rounded-br-lg shadow-xl">
          <div className="bg-gray-100 py-8 px-4 shadow sm:rounded-lg sm:px-10 shadow-md shadow-gray-50">
            <form onSubmit={formik.handleSubmit} className="space-y-6">

                {/* Category input goes here */}

              <label
                htmlFor="category"
                className="block text-bold font-medium text-black "
              >
                Select Category
              </label>

              <CategoryDropdown
                value={formik.values.category?.label}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                error={formik.errors.category}
                touched={formik.touched.category}
              />

              <div>
                <label
                  htmlFor="title"
                  className="block text-bold font-medium text-black"
                >
                  Title
                </label>
                <div className="mt-1">
                  {/* Title */}
                  <input
                    value={formik.values.title}
                    onChange={formik.handleChange("title")}
                    onBlur={formik.handleBlur("title")}
                    id="title"
                    name="title"
                    type="title"
                    autoComplete="title"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {/* Err msg */}
                <div className="text-red-500">
                  {formik?.touched?.title && formik?.errors?.title}
                </div>
              </div>
              
              <div>
                <label
                  htmlFor="description"
                  className="block text-bold font-medium text-black"
                >
                  Post Content
                </label>
                {/* Description */}

                
                {/* <textarea
                    value={formik.values.description}
                    onChange={formik.handleChange("description")}
                    onBlur={formik.handleBlur("description")}
                     rows="5"
                    cols="10"
                     className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                     type="text"
                   ></textarea> */}

                <JoditEditor
                  ref={editor}
                  value={formik.values.description}
                  onChange={formik.handleChange("description")}
                  onBlur={formik.handleBlur("description")}
                  rows="5"
                  cols="10"
                  className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                  type="text"
                  />
                {/* Err msg */}
                <div className="text-red-500">
                  {formik?.touched?.description && formik?.errors?.description}
                </div>

                {/* Image component */}
                <label
                  htmlFor="image"
                  className="block text-bold font-medium text-black"
                >
                  Select image to upload
                </label>

                
          {/* image preview */}
								{preview ? (
									<div className="border border-gray-300 p-2 bg-gray-100 rounded-md shadow-sm">
										<img
											className="mx-auto  w-2/4"
											src={preview}
											alt=""
											onClick={() => {
												setPreview(null);
											}}
										/>
									</div>
								) : (

                <Container className="container bg-gray-700">
                  <Dropzone
                    onBlur={formik.handleBlur("image")}
                    accept="image/jpeg, image/png image/webp"
                    onDrop={(acceptedFiles) => {
                      formik.setFieldValue("image", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className="container">
                        <div
                          {...getRootProps({
                            className: "dropzone",
                            onDrop: (event) => event.stopPropagation(),
                          })}
                        >
                          <input {...getInputProps()} />
                          <p className="text-gray-300 text-lg cursor-pointer hover:text-gray-500">
                            Click here to select image
                          </p>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </Container>
                )}

                {/* Err msg */}
                <div className="text-red-500">
                  {formik?.touched?.image && formik?.errors?.image}
                </div>

                

                
              </div>
              <div>
                {/* Submit btn */}
                {loading ? (
                  <button
                    disabled
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Loading please wait...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-xl text-sm font-bold text-white bg-black hover:from-pink-600 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                  >
                    Publish
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <div className="container">
      <NewFeed />
      </div> */}
    </>
  );
}


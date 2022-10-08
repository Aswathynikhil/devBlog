import React, {useEffect} from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { fetchUserDetailsAction, updateUserAction } from "../../../redux/slices/users/userSlices";

//Form schema
const formSchema = Yup.object({
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required"),
  bio: Yup.string().required("Bio is required"),
});

const UpdateProfileForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

    // Fetch User Details
    useEffect(()=>{
      dispatch(fetchUserDetailsAction(id))
    },[dispatch, id])
  
    //User data from store
    const users = useSelector((state) => state.users);
    const { userDetails, isUpdated,loading, appErr, serverErr } = users;
  //formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: userDetails?.firstname,
      lastname: userDetails?.lastname,
      email: userDetails?.email,
      bio: userDetails?.bio,
    },
    onSubmit: values => {
      //dispath the action
       dispatch(updateUserAction(values));
    
    },
    validationSchema: formSchema,
  });

  //redirect
  if(isUpdated){
    navigate(`/profile/${id}`);
  }
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h3 className="mt-6 text-center text-3xl font-extrabold text-gray-600 font-serif">
        Hey {userDetails?.firstname},  you want to update your profile?
        </h3>

             {/* Error */}
             {serverErr || appErr ? <h2 className="text-slate-700 text-center mt-3 font-bold text-2xl"> 
          {serverErr} {appErr} </h2> : null}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 shadow-md shadow-gray-400">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div>
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-gray-700"
              >
                Firstname
              </label>
              <div className="mt-1">
                {/* lastname */}
                <input
                  value={formik.values.firstname}
                  onChange={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur("firstname")}
                  id="firstname"
                  name="firstname"
                  type="firstname"
                  autoComplete="firstname"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {/* err msg */}
              <div className="text-red-500">
                {formik.touched.firstname && formik.errors.firstname}
              </div>
            </div>
            

             
            <div>
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-gray-700"
              >
                Lastname
              </label>
              <div className="mt-1">
                {/* lastname */}
                <input
                  value={formik.values.lastname}
                  onChange={formik.handleChange("lastname")}
                  onBlur={formik.handleBlur("lastname")}
                  id="lastname"
                  name="lastname"
                  type="lastname"
                  autoComplete="lastname"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {/* err msg */}
              <div className="text-red-500">
                {formik.touched.lastname && formik.errors.lastname}
              </div>
            </div>



            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                {/* Email */}
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {/* err msg */}
              <div className="text-red-500">
                {formik.touched.email && formik.errors.email}
              </div>
            </div>
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700"
              >
                Bio
              </label>
              <textarea
                value={formik.values.bio}
                onChange={formik.handleChange("bio")}
                onBlur={formik.handleBlur("bio")}
                rows="5"
                cols="10"
                className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                type="text"
              ></textarea>
              {/* Err msg */}
              <div className="text-red-500">
                {formik.touched.bio && formik.errors.bio}
              </div>
            </div>
            <div>
              {/* submit btn */}
              {loading ? (
                <button
                disabled
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                Updating Please Wait...
               </button>
               ):(
                <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                Update
              </button>
               )}
            </div>
          </form>

          <div className="mt-4 mb-3">
            <div className="relative">
              <div className="flex flex-col justify-center items-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileForm;

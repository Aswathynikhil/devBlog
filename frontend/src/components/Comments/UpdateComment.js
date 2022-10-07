import React ,{useEffect} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {fetchCommentAction, updateCommentAction } from "../../redux/slices/comments/commentSlices";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";


//Form schema
const formSchema = Yup.object({
  description: Yup.string().required("Description is required"),
});

const UpdateComment = () => {
const {id}=useParams()
    const dispatch=useDispatch()
    
    //select comment from store
    const comment= useSelector(state=>state?.comment)
    const{commentDetails,isUpdate}=comment;
    
    //fetch comment
    useEffect(()=>{
       dispatch(fetchCommentAction(id))
    },[dispatch,id])

   // console.log(postId)
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      description: commentDetails?.description,
    },
    onSubmit: values => {
      const data = {
        id,
        description: values?.description,
      };
      //dispach action
      dispatch(updateCommentAction(data))
      
    },
    validationSchema: formSchema,
  });
  if(isUpdate) return <Navigate to={`/posts`} />
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
    <div className="flex flex-col justify-center items-center w-full">
      <form
        onSubmit={formik.handleSubmit}
        className="mt-1 flex max-w-sm m-auto"
      >
        <textarea
          onBlur={formik.handleBlur("description")}
          value={formik.values.description}
          onChange={formik.handleChange("description")}
          type="text"
          name="text"
          id="text"
          className="shadow-xl w-96 focus:ring-gray-500  mr-2 focus:border-gray-500 block w-500 p-2 border-2 sm:text-sm border-gray-300 rounded-md "
          placeholder="Edit comment"
        />

        <button
          type="submit"
          className=" px-2.5 py-1.5 w-40 text-center border border-transparent  font-bold rounded shadow-xl text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 "
        >
          Submit
        </button>
      </form>
      <div className="text-red-400 mb-2 mt-2">
        {formik.touched.description && formik.errors.description}
      </div>
    </div>
    </div>
  );
};

export default UpdateComment;
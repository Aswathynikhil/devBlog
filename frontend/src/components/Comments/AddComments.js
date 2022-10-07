import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createCommentAction } from "../../redux/slices/comments/commentSlices";
//Form schema
const formSchema = Yup.object({
  description: Yup.string().required("Description is required"),
});

const AddComment = ({ postId }) => {
    //dispatch--------
    const dispatch=useDispatch();
       //select data from store
       const comment = useSelector(state=>state?.comment)
       const {loading,appErr, serverErr} = comment

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    onSubmit: values => {
      const data = {
        postId,
        description: values?.description,
      };
     //dispatch action
     dispatch(createCommentAction(data))
  
    },
    validationSchema: formSchema,
  });
  return (
    <div className="flex flex-col justify-center items-center ">
       {appErr || serverErr ? (
                  <p className="mt-2 text-center text-lg text-red-600">
                    {serverErr}... {appErr}
                  </p>
                ) : null}
      <form
        onSubmit={formik.handleSubmit}
        className="mt-1 flex max-w-sm m-auto"
      >
        <input
          onBlur={formik.handleBlur("description")}
          value={formik.values.description}
          onChange={formik.handleChange("description")}
          type="text"
          name="text"
          id="text"
          className="shadow-sm focus:ring-indigo-500  mr-2 focus:border-indigo-500 block w-full p-2 border-1 sm:text-sm border-gray-300 rounded-md"
          placeholder="Add New comment"
        />

        
            
      {loading ?     <button
       
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-black hover:bg-gray-700 "
        >
        Loading.....
        </button> :
            <button
            type="submit"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-black hover:bg-gray-700 "
          >
            Submit
          </button>
        }
      

      </form>
      <div className="text-red-400 mb-2 mt-2">
        {formik.touched.description && formik.errors.description}
      </div>
    </div>
  );
};

export default AddComment;

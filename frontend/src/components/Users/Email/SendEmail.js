import { useFormik } from "formik";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { sendMailAction } from "../../../redux/slices/email/emailSlices";


//Form schema
const formSchema = Yup.object({
  recipientEmail: Yup.string().required("Recipent Email is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});
const SendEmail = () => {

    let location = useLocation(); 
    const {email,id}=location?.state
    console.log("🚀 ~ file: SendEmail.js ~ line 18 ~ SendEmail ~ location?.state", location?.state)
  //dispath
  const dispatch = useDispatch();

  //formik
  const formik = useFormik({
    initialValues: {
      recipientEmail: email,
      subject: "",
      message: "",
    },
    onSubmit: values => {
      //dispath the action
      dispatch(sendMailAction(values))
    },
    validationSchema: formSchema,
  });

  //select data from store
const sendMail=useSelector(state=>state?.sendMail);
const { mailSent, loading, appErr, serverErr, isMailSent } = sendMail;

if(isMailSent) return <Navigate to={`/profile/${id}`}/>

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-black-300 font-serif">
          Send Mesage
          {/* Email title */}
          {/* <span className="text-green-300">email title</span> */}
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600">
        {serverErr || appErr ? <h2 className="text-center text-red-500">{serverErr} {appErr}</h2> : null}
        </p>
        <p className="mt-2 text-center text-sm text-gray-600">
          {/* {emailSent && <div>Sent</div>} */}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
        <div className="bg-gray-100 py-8 px-4 shadow-md shadow-gray-300 sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Recipient Email
              </label>
              {/* Email message */}
              <div className="mt-1">
                <input
                  value={formik.values.recipientEmail}
                  onChange={formik.handleChange("recipientEmail")}
                  onBlur={formik.handleBlur("recipientEmail")}
                  disabled
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-2 border bg-gray-200 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {/* Err msg */}
              <div className="text-red-500">
                {formik.touched.recipientEmail && formik.errors.recipientEmail}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <div className="mt-1">
                {/* Subject */}
                <input
                  value={formik.values.subject}
                  onChange={formik.handleChange("subject")}
                  onBlur={formik.handleBlur("subject")}
                  id="subject"
                  name="subject"
                  type="text"
                  autoComplete="subject"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {/* err msg */}
              <div className="text-red-500">
                {formik.touched.subject && formik.errors.subject}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              {/* email message */}
              <textarea
                value={formik.values.message}
                onChange={formik.handleChange("message")}
                onBlur={formik.handleBlur("message")}
                rows="5"
                cols="10"
                className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                type="text"
              ></textarea>
              {/* err here */}
              <div className="text-red-500">
                {formik.touched.message && formik.errors.message}
              </div>
            </div>
            {/* Submit btn */}
            <div>
            {loading ? (<button 
              disabled
              
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Loading please wait...
              </button> ):(<button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send
              </button>) }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;

import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { loginUserAction } from "../../../redux/slices/users/userSlices";
import login1 from '../../../img/login1.png'
import login2 from '../../../img/login2.png'
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import {HiOutlineMail} from "react-icons/hi"

//Form schema
const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const store = useSelector((state) => state?.users);
  const { userAuth, loading, serverErr, appErr } = store;
  console.log(userAuth);

  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => console.log(credentialResponse),
  });
  const gooleAuth = (userData) => {
    dispatch(loginUserAction(userData));
  };
  //formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      //dispath the action
      dispatch(loginUserAction(values));

      console.log(values);
    },
    validationSchema: formSchema,
  });

  //redirect

  // if (userAuth) {
  //   navigate("/posts");
  // }


    //redirect
    useEffect(() => {
      if (userAuth?.isAdmin) {
        //console.log(userAuth);
        navigate("/posts");
      }
      if (userAuth?.isAdmin === false) {
        navigate("/posts");
      }
    }, [userAuth, navigate]);
  return (
    <>
      <section className="min-h-screen  py-20 2xl:py-40 bg-gray-200 overflow-hidden">
        {/* <div className="absolute top-0 left-0 lg:bottom-0 h-full lg:h-auto w-full lg:w-4/12 bg-white-500 lg:overflow-hidden">
          <img
            className="hidden lg:block h-full w-full object-cover"
            src={poster}
            alt=""
          />
        </div> */}
        <div className="container px-3 mx-auto ">
          <div className="max-w-5xl mx-auto ">
            <div className="flex flex-wrap items-center -mx-4 ">
              <div className="w-full lg:w-2/5 px-4 rounded border border-slate-400 shadow-md shadow-gray-500">
                <div className="px-6 lg:px-12 py-12 lg:py-24 bg-gray-200 shadow-lg rounded-lg">
                  {/* Form */}
                  <form onSubmit={formik.handleSubmit}>
                    <h3 className="mb-10 text-2xl font-bold font-heading text-center font-serif ">
                      {/* Header */}
                      Login Now
                    </h3>
                    {/*display error */}
                    {serverErr || appErr ? (
                      <h2 className="text-red-500 text-center font-serif mb-4">
                        {serverErr} {appErr}
                      </h2>
                    ) : null}
                    <div className="flex items-center pl-6 mb-3  border border-slate-400 bg-white rounded-full">
                      <span className="inline-block pr-3 border-r border-black-50 text-gray-500 ">
                        <HiOutlineMail className="h-5 w-5"/>                     
                         </span>
                      {/* Email */}
                      <input
                        value={formik.values.email}
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                        className="w-full pr-6 pl-4 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                        type="email"
                        placeholder="Enter email"
                      />
                    </div>
                    {/* Err message */}
                    <div className="text-red-400 mb-2">
                      {formik.touched.email && formik.errors.email}
                    </div>
                    <div className="flex items-center pl-6 mb-6  border border-slate-400 bg-white rounded-full">
                      <span className="inline-block pr-3 border-r border-gray-50">
                        <svg
                          className="w-5 h-5"
                          width="20"
                          height="21"
                          viewBox="0 0 20 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.6243 13.5625C15.3939 13.5625 15.2077 13.7581 15.2077 14V16.4517C15.2077 18.2573 14.0443 20.125 12.0973 20.125H5.42975C3.56848 20.125 1.87435 18.3741 1.87435 16.4517V10.5H15.6243C15.8547 10.5 16.041 10.3044 16.041 10.0625C16.041 9.82058 15.8547 9.625 15.6243 9.625H15.2077V5.95175C15.2077 2.39183 12.8635 0 9.37435 0H7.70768C4.21855 0 1.87435 2.39183 1.87435 5.95175V9.625H1.45768C1.22728 9.625 1.04102 9.82058 1.04102 10.0625V16.4517C1.04102 18.8322 3.13268 21 5.42975 21H12.0972C14.3089 21 16.0409 19.0023 16.0409 16.4517V14C16.041 13.7581 15.8547 13.5625 15.6243 13.5625ZM2.70768 5.95175C2.70768 2.86783 4.67022 0.875 7.70768 0.875H9.37435C12.4119 0.875 14.3743 2.86783 14.3743 5.95175V9.625H2.70768V5.95175Z"
                            fill="black"
                          ></path>
                          <path
                            d="M18.8815 9.3711C18.7482 9.17377 18.4878 9.12827 18.3003 9.26701L8.58655 16.4919L6.75235 14.5655C6.58942 14.3944 6.32608 14.3944 6.16322 14.5655C6.00028 14.7366 6.00028 15.0131 6.16322 15.1842L8.24655 17.3717C8.32695 17.4561 8.43362 17.4999 8.54115 17.4999C8.62488 17.4999 8.70868 17.4732 8.78282 17.4194L18.7828 9.98185C18.9703 9.84143 19.0141 9.56843 18.8815 9.3711Z"
                            fill="black"
                          ></path>
                        </svg>
                      </span>
                      {/* Password */}
                      <input
                        value={formik.values.password}
                        onChange={formik.handleChange("password")}
                        onBlur={formik.handleBlur("password")}
                        className="w-full pr-6 pl-4 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                        type="password"
                        placeholder=" Password"
                      />
                    </div>
                    {/* Err msg */}
                    <div className="text-red-400 mb-2">
                      {formik.touched.password && formik.errors.password}
                    </div>

                    {/* Login btn */}
                    {loading ? (
                      <button
                        disabled
                        className="py-4 w-full bg-gray-500  text-white font-bold rounded-full transition duration-200"
                      >
                        Loading.........
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="py-4 w-full bg-slate-900 hover:bg-black text-white font-bold rounded-full transition duration-200"
                      >
                        Login
                      </button>
                    )}
                  </form>


                  <span className="flex justify-center text-gray-700 font-bold mt-2">
                    OR
                  </span>
                  

                  <div className="flex items-center justify-center w-full shadow-xl  mt-2 py-1.5 font-bold rounded-full transition duration-200 hover:bg-blue-200 text-center ">
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        var decoded = jwt_decode(credentialResponse.credential);
                        const userData = {
                          firstName: decoded.given_name,
                          email: decoded.email,
                          lastName: decoded.family_name,
                          password: decoded.sub,
                        };

                        gooleAuth(userData);
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    />
                  </div>


                  <div className="text-center mt-5">
                    <div className="flex flex-row mt-5">
                      <div className="ml-5 text-mono text-bold text-blue-800">
                        <Link
                          to="/password-reset-token"
                          className="font-medium text-blue-800 hover:text-indigo-500"
                        >
                          Forget Password?
                        </Link>
                      </div>
                      <div className="ml-6 text-mono text-bold text-blue-800">
                      <Link
                          to="/register"
                          className="font-medium text-blue-800 hover:text-indigo-500"
                        >
                            Or SignUp
                        </Link>
                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-3/5 px-4 mb-16 lg:mb-0 order-first lg:order-last ">
                {/* <span className="flex mb-10 mx-auto items-center justify-center h-20 w-20 bg-gray-500 rounded-lg">
                  <svg
                    width="37"
                    height="37"
                    viewBox="0 0 37 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0)">
                      <path
                        d="M36.2292 29.2917H0.770833C0.345333 29.2917 0 28.9463 0 28.5208C0 28.0953 0.345333 27.75 0.770833 27.75H36.2292C36.6547 27.75 37 28.0953 37 28.5208C37 28.9463 36.6547 29.2917 36.2292 29.2917Z"
                        fill="white"
                      ></path>
                      <path
                        d="M33.1458 29.2917C32.7203 29.2917 32.375 28.9463 32.375 28.5208V14.6458C32.375 14.2203 32.7203 13.875 33.1458 13.875C33.5713 13.875 33.9167 14.2203 33.9167 14.6458V28.5208C33.9167 28.9463 33.5713 29.2917 33.1458 29.2917Z"
                        fill="white"
                      ></path>
                      <path
                        d="M3.85482 29.2918C3.42932 29.2918 3.08398 28.9465 3.08398 28.521V10.7918C3.08398 9.09137 4.46686 7.7085 6.16732 7.7085H11.5632C11.9887 7.7085 12.334 8.05383 12.334 8.47933C12.334 8.90483 11.9887 9.25016 11.5632 9.25016H6.16732C5.31632 9.25016 4.62565 9.94237 4.62565 10.7918V28.521C4.62565 28.9465 4.28032 29.2918 3.85482 29.2918Z"
                        fill="white"
                      ></path>
                      <path
                        d="M23.5235 18.2502C23.3261 18.2502 23.1288 18.1747 22.9777 18.0252L17.4308 12.4798C17.141 12.19 17.1286 11.7228 17.4031 11.4191L21.9464 6.37633C25.1731 2.65012 30.2899 0.0817083 34.6713 0C34.9503 0.00308333 35.0844 0.078625 35.2309 0.225083C35.3789 0.374625 35.4621 0.576583 35.4575 0.784708C35.3743 5.16612 32.8074 10.2845 29.0689 13.5204L24.0384 18.0529C23.8919 18.1855 23.7069 18.2502 23.5235 18.2502ZM19.0403 11.9078L23.5512 16.4187L28.0498 12.3657C31.2503 9.59533 33.5119 5.365 33.8681 1.58946C30.0941 1.94712 25.8653 4.20721 23.1041 7.39692L19.0403 11.9078Z"
                        fill="white"
                      ></path>
                      <path
                        d="M25.5967 21.9071C25.5273 21.9071 25.4564 21.8979 25.387 21.8778C25.1172 21.8023 24.9107 21.588 24.8459 21.3151L23.7575 16.7672C23.6588 16.3525 23.9147 15.9378 24.3279 15.8376C24.7457 15.7358 25.1573 15.9948 25.2575 16.408L25.9806 19.4266C27.3187 17.333 27.587 14.6521 27.6147 13.0826C27.6224 12.6587 27.9369 12.3473 28.3994 12.3257C28.8234 12.3334 29.1626 12.6864 29.1549 13.1104C29.0901 16.758 28.0202 19.8012 26.1409 21.6805C25.9944 21.8285 25.7971 21.9071 25.5967 21.9071Z"
                        fill="white"
                      ></path>
                      <path
                        d="M18.871 11.7212C18.8124 11.7212 18.7523 11.715 18.6922 11.6996L14.1442 10.6097C13.8714 10.5449 13.6571 10.3399 13.5815 10.0701C13.506 9.80183 13.5815 9.51354 13.7789 9.3162C15.6582 7.43691 18.6999 6.367 22.349 6.30225C22.8315 6.32383 23.126 6.6337 23.1337 7.0592C23.1414 7.4847 22.8022 7.8362 22.3767 7.84391C20.8073 7.87166 18.1279 8.13837 16.0343 9.47808L19.0529 10.2011C19.4676 10.2998 19.7235 10.716 19.6233 11.1307C19.537 11.4838 19.221 11.7212 18.871 11.7212Z"
                        fill="white"
                      ></path>
                      <path
                        d="M13.1051 23.1251C12.9032 23.1251 12.7059 23.0464 12.5594 22.9C12.359 22.6996 12.285 22.4051 12.3667 22.1338C12.6211 21.2828 13.9423 16.9877 14.9783 15.9517C16.2286 14.7029 18.2574 14.7029 19.5077 15.9517C20.7564 17.2004 20.7549 19.2324 19.5077 20.4811C18.4717 21.5156 14.1766 22.8399 13.3256 23.0942C13.2547 23.1143 13.1791 23.1251 13.1051 23.1251ZM17.2445 16.556C16.8206 16.556 16.3935 16.7164 16.0698 17.0401C15.6335 17.4779 14.8796 19.4081 14.2907 21.1672C16.0513 20.5782 17.983 19.8259 18.4193 19.3881C19.0652 18.7406 19.0652 17.6861 18.4193 17.0401C18.094 16.7179 17.67 16.556 17.2445 16.556ZM18.9635 19.9354H18.9789H18.9635Z"
                        fill="white"
                      ></path>
                    </g>
                  </svg>
                </span> */}
            

              <div className="w-60 lg:w-1/2 px-5 ml-30 flex mb-10 mx-auto items-center justify-center h-20 w-20">
         
              <img className="w-full" src={login2} alt={login2 } />
               
            
            </div>
            <div>
            <h2 className="mb-10 text-center text-6xl lg:text-7xl text-black-300 font-bold font-heading ml-15">
                  Ready to start? Login Now.
                </h2>
            </div>
            
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

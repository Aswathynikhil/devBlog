import React from "react";

const PageNotFound = () => {
  return (
    <div className="bg-gray-300 relative overflow-hidden h-screen">
      {/* <img src="https://www.freepik.com/free-vector/404-error-abstract-concept-illustration_11668755.htm"/> */}
      <div className="inset-0 bg-black opacity-25 absolute"></div>
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
        <div className="w-full font-mono flex flex-col items-center relative z-10">
          <h1 className="font-extrabold text-5xl text-center text-white leading-tight mt-4 font-serif">
            Page Not Found
          </h1>
          <p className="font-extrabold text-8xl my-44 text-white animate-bounce">
            404
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;

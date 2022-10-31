import React from 'react'
//import poster from '../../img/poster.png'
import posterHome from '../../img/posterHome.png'


const Homepage = () => {
  return (
    <>
     <section className="min-h-screen bg-white overflow-hidden ">
        <div className="container px-4  max-w-7xl">
          <div className="flex flex-wrap items-center -mx-4 mb-10 2xl:mb-14"> 
            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
              <span className="text-2xl font-bold text-black">
                Create posts to educate
              </span>
              {/* <h2 className="max-w-2xl mt-12 mb-12 text-6xl 2xl:text-7xl text-black font-bold font-heading">
                Pen down your ideas{" "}
                <span className="text-yellow-500">By creating a post</span>
              </h2> */}
              <div className='mr-5'>
               <h1 className=' max-w-2xl mt-5 mb-12 text-6xl 2xl:text-7xl text-blue-900 font-serif font-heading'>
                <strong>
                  <div>Start</div>
                  <div className="ml-5 text-primary">blogging</div>
                  <span className="">from</span>
                  <span className=" text-yellow-500">Today</span>
                </strong>
               </h1>
              <p className="mb-12 lg:mb-16 2xl:mb-24 text-xl text-yellow-900 font-mono">
                "Your post must be free from racism and unhealthy words.."
              </p>
              </div>
              {/* <a
                className="inline-block px-12 py-5 text-lg text-white font-bold bg-blue-500 hover:bg-blue-600 rounded-full transition duration-200"
                href="/"
              >
                Buy This Course
              </a> */}
            </div>
            <div className="w-full lg:w-1/2 px-5 mt-10">
              <img className="w-full" src={posterHome} alt={posterHome} />
            </div>
          </div>

          
        </div>
      </section>
    </>
  )
}

export default Homepage
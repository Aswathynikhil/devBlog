 {/* Form */}
 <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
 <input type="hidden" name="remember" defaultValue="true" />
 <div className="rounded-md shadow-sm -space-y-px">
   <div>
     <label htmlFor="category title" className="sr-only">
       Name
     </label>
     {/* Title */}
     <input
     value={formik.values.title}
     onChange={formik.handleChange("title")}
     onBlur={formik.handleBlur("title")}
       type="text"
       autoComplete="text"
       className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
       placeholder="New Category"
     />
     <div className="text-red-400 mb-2">
       {formik.touched.title && formik.errors.title} 
     </div>
   </div>
 </div>

 <div>
   <div>
     {/* Submit */}
    {loading ? (
      <button disabled
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600  "
    >
      {/* focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 */}
      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
        <PlusCircleIcon
          className="h-5 w-5 text-white group"
          aria-hidden="true"
        />
      </span>
     Loading....
    </button>
    ) : (
    <>
     <button
     type="submit"
     className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-black "
   >
     {/* focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 */}
     <span className="absolute left-0 inset-y-0 flex items-center pl-3">
       <PlusCircleIcon
         className="h-5 w-5 text-white group"
         aria-hidden="true"
       />
     </span>
     Update Category
   </button>

   <button
   onClick={()=>dispatch(deleteCategoriesAction(id))}
     type="submit"
     className="group  mt-3 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-black "
   >
     {/* focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 */}
     <span className="absolute left-0 inset-y-0 flex items-center pl-3">
       <PlusCircleIcon
         className="h-5 w-5 text-white group"
         aria-hidden="true"
       />
     </span>
     Delete Category
   </button>
    </>
    )}
   </div>
 </div>
</form>
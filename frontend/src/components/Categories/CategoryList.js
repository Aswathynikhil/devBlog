import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { PencilAltIcon } from "@heroicons/react/outline";
import { fetchAllCategoriesAction } from "../../redux/slices/category/categorySlices";
import DateFormatter from "../../utils/DateFormatter";
import LoadingComponent from "../../utils/LoadingComponent";


const CategoryList = () => {
  const category = useSelector(state => state?.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCategoriesAction(""));
  }, [dispatch,category]);
  
  

  const { categoryList, loading, appErr, serverErr } = category;
  // if (!userAuth) return <Navigate to="/login" />;
  return (
    <>
      {loading ? (
        // <h2 className="text-center text-3xl text-green-800">Loading</h2>
        <>
        <LoadingComponent/>
        </>
      ) : appErr || serverErr ? (
        <h2 className="text-center text-3xl text-red-600">
          {serverErr} {serverErr}
        </h2>
      ) : categoryList?.length <= 0 ? (
        <h2 className="text-center text-3xl text-red-800">
          No category Found
        </h2>
      ) : (
        
        <div className="flex flex-col ">
     
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className=" text-center text-4xl mt-10 font-bold font-serif">
            {" "}
            Category List
          </div>
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 mt-5 bg-gray-200">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg ">
                <table className=" min-w-full  divide-y divide-gray-200">
                  <thead className="bg-gray-200">
                    <tr>
                      {/* <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Author
                      </th> */}
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Created At
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryList?.map(category => (
                      <tr className="bg-gray-50">
                        {/* <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={category?.user?.profilePhoto}
                                alt="category profile"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {category?.user?.firstname}{" "}
                                {category?.user?.lastname}
                              </div>
                              <div className="text-sm text-gray-500">
                                {category?.user?.email}
                              </div>
                            </div>
                          </div>
                        </td> */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {category.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {<DateFormatter date=  {category?.createdAt}/>}
                        
                        </td>
                        <Link to={`/update-category/${category?._id}`}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <PencilAltIcon className="h-5 text-black-500" />
                          </td>
                        </Link>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryList;

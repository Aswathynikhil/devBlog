// import React, { useState } from "react";
// import { HiMenuAlt3 } from "react-icons/hi";
// import { MdOutlineDashboard } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { AiOutlineUser, AiOutlineAppstoreAdd } from "react-icons/ai";
// import { Link } from "react-router-dom";
// import { IoIosCreate } from "react-icons/io";
// import { GoReport } from "react-icons/go";
// import { BsSave, BsFileEarmarkPostFill } from "react-icons/bs";
// import { SiHomeassistantcommunitystore } from "react-icons/si";
// import { logoutAction } from "../../redux/slices/users/userSlices";

// const AdminSidebar = ({ isLogin }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const state = useSelector((state) => state?.users);
//   const { userAuth, profile } = state;
//   const isAdmin = userAuth?.isAdmin;
//   const menus = [
//     { name: "Home", link: "/", icon: SiHomeassistantcommunitystore },
//     { name: "Users", link: "/users", icon: AiOutlineUser },
//     { name: "Post", link: "/posts", icon: BsFileEarmarkPostFill },
//     { name: "Saved", link: "/saved-list", icon: BsSave, margin: true },
//     { name: "Reported", link: "/reported-list", icon: GoReport },
//     {name: "Create Category",link: "/add-category", icon: AiOutlineAppstoreAdd },
//     { name: "Category List", link: "/category-list", icon: MdOutlineDashboard },
//     { name: "Create Post", link: "/create-post", icon: IoIosCreate },
//   ];

//   const [open, setOpen] = useState(true);
//   return (
//     // <section className="flex gap-6">
//     <>
//       <div
//         className={`bg-[#0e0e0e] min-h-screen ${
//           open ? "w-72" : "w-16"
//         } duration-500 text-gray-100 px-4`}
//       >
//         <div className="py-3 flex justify-end">
//           <HiMenuAlt3
//             size={26}
//             className="cursor-pointer"
//             onClick={() => setOpen(!open)}
//           />
//         </div>
//         <div className="mt-4 flex flex-col gap-4 relative">
//           {menus?.map((menu, i) => (
//             <Link
//               to={menu?.link}
//               key={i}
//               className={` ${
//                 menu?.margin && "mt-5"
//               } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
//             >
//               <div>{React.createElement(menu?.icon, { size: "20" })}</div>
//               <h2
//                 style={{
//                   transitionDelay: `${i + 3}00ms`,
//                 }}
//                 className={`whitespace-pre duration-500 ${
//                   !open && "opacity-0 translate-x-28 overflow-hidden"
//                 }`}
//               >
//                 {menu?.name}
//               </h2>
//               <h2
//                 className={`${
//                   open && "hidden"
//                 } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
//               >
//                 {menu?.name}
//               </h2>
//             </Link>
//           ))}
//         </div>
//       </div>
//       <div></div>
//     </>
//   );
// };

// export default AdminSidebar;

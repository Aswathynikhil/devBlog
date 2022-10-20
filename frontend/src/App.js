import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navigation/Navbar";
import Login from "./components/Users/Login/Login";
import Register from "./components/Users/Register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/Users/Profile/Profile";
import UploadProfilePhoto from "./components/Users/Profile/UploadProfilePhoto";
import UploadCoverPhoto from "./components/Users/Profile/UploadCoverPhoto";
import UpdateProfileForm from "./components/Users/Profile/UpdateProfileForm";
import AddNewCategory from "./components/Categories/AddNewCategory";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";
import UserProtectedRoute from "./components/Navigation/ProtectedRoutes/UserProtectedRoute";
import AdminProtectedRoute from "./components/Navigation/ProtectedRoutes/AdminProtectedRoute";
import CreatePost from "./components/Post/CreatePost";
import PostsList from "./components/Post/PostsList";
import PostDetails from "./components/Post/PostDetails";
import UpdatePost from "./components/Post/UpdatePost";
import UpdateComment from "./components/Comments/UpdateComment";
import SendEmail from "./components/Users/Email/SendEmail";
import AccountVerified from "./components/Users/AccountVerification/AccountVerified";
import UsersList from "./components/Users/UsersList/UsersList";
import UpdatePassword from "./components/Users/PasswordManagement/UpdatePassword";
import ResetPassword from "./components/Users/PasswordManagement/ResetPassword";
import ResetPasswordForm from "./components/Users/PasswordManagement/ResetPasswordForm";
import PageNotFound from "./components/PageNotFound";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SavedPosts from "./components/Post/SavedPosts";
import ReportedPost from "./components/Post/ReportedPost";
import AdminDashboard from "./components/Admin/AdminDashboard";



function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/saved-list" element={<SavedPosts />} />

          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/send-mail" element={<SendEmail />} />

            <Route path="/users" element={<UsersList />} />
            <Route path="/reported-list" element={<ReportedPost />} />

            <Route path="/add-category" element={<AddNewCategory />} />

            <Route path="/update-category/:id" element={<UpdateCategory />} />
          </Route>

          <Route
            path="/create-post"
            element={
              <UserProtectedRoute>
                <CreatePost />
              </UserProtectedRoute>
            }
          />
          <Route
            path="/update-post/:id"
            element={
              <UserProtectedRoute>
                <UpdatePost />
              </UserProtectedRoute>
            }
          />

          <Route
            path="/update-password"
            element={
              <UserProtectedRoute>
                <UpdatePassword />
              </UserProtectedRoute>
            }
          />

          <Route
            path="/update-comment/:id"
            element={
              <UserProtectedRoute>
                <UpdateComment />
              </UserProtectedRoute>
            }
          />
          <Route path="/category-list" element={<CategoryList />} />
          <Route path="/posts" element={<PostsList />} />
          <Route path="/posts/:id" element={<PostDetails />} />

          <Route path="/password-reset-token" element={<ResetPasswordForm />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="*" element={<PageNotFound />} />
         

          <Route
            path="/profile/:id"
            element={
              <UserProtectedRoute>
                <Profile />
              </UserProtectedRoute>
            }
          />

          <Route
            path="/profilephoto-upload/:id"
            element={
              <UserProtectedRoute>
                <UploadProfilePhoto />
              </UserProtectedRoute>
            }
          />

          <Route
            path="/coverphoto-upload/:id"
            element={
              <UserProtectedRoute>
                <UploadCoverPhoto />
              </UserProtectedRoute>
            }
          />

          <Route
            path="/update-profile/:id"
            element={
              <UserProtectedRoute>
                <UpdateProfileForm />
              </UserProtectedRoute>
            }
          />

          <Route
            path="/verify-account/:token"
            element={
              <UserProtectedRoute>
                <AccountVerified />
              </UserProtectedRoute>
            }
          />
        </Routes>
      </Router>
      <ToastContainer toastClassName=" relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer" />
    </>
  );
}

export default App;

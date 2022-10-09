import React, { Suspense, useEffect } from "react";
// import NewFeed from "./NewFeed";
import Spiner from '../../components/Spinner'
const PostList=React.lazy(()=> import('../components/Post/PostsList'))

function UserHome() {
 
    
  return (
    <div className="">
      <Suspense fallback={<Spiner />}>

      <PostList />
      </Suspense>
      

        
    </div>
  );
}

export default UserHome;
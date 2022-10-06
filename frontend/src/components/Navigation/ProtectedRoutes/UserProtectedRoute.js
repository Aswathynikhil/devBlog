import { useSelector } from 'react-redux'
import {Navigate} from 'react-router-dom'


const UserProtectedRoute=({children})=>{
    //check if user is login
    const user =useSelector(state=>state?.users);
    const{userAuth}=user;

    if(!userAuth){
        return <Navigate to ='/login' replace />
    }
    return children
}

export default UserProtectedRoute
const blockUser=(user)=>{
    if(user?.isBlocked){
        throw new Error(` ${user?.firstname} ${user?.lastname},You are blocked`)
    }
}

module.exports=blockUser
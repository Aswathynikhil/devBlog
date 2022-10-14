const mongoose= require("mongoose")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"First name is required"]
    },
    lastname:{
        type:String,
        required:[true,"Last name is required"]
    },
    profilePhoto:{
        type:String,
        default:'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
    },
    coverPhoto:{
        type:String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5f3ItCiY-rUvAd7B53SNptaJjEtVayxHWhg&usqp=CAU'
    },
    email:{
        type:String,
        required:[true,"Email is required"]
    },
    bio:{
        type:String
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    postCount:{
        type:Number,
        default:0
    },
  
    isBlocked:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:['Admin','Guest','Blogger']
    },
    isFollowing:{
        type:Boolean,
        default:false
    },
    isUnFollowing:{
        type:Boolean,
        default:false
    },
    isAccountVerified:{
        type:Boolean,
        default:false
    },
 
    accountVerificationToken: String,
    accountVerificationExpires: Date,
    viewedBy:{
        type:[
            {
              type:mongoose.Schema.Types.ObjectId,
              ref:'User'
            },
        ],
    },
    followers:{
        type:[
            {
              type:mongoose.Schema.Types.ObjectId,
              ref:'User'
            },
        ],
    },
    following:{
        type:[
            {
              type:mongoose.Schema.Types.ObjectId,
              ref:'User'
            },
        ],
    },
  
    passwwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date,

},
{
  toJSON:{
    virtuals:true
  },
  toObject:{
    virtuals:true
  },
  timestamps:true,

})
//virtual method to populate create post
userSchema.virtual('posts',{
    ref:'Post',
    foreignField:'user',
    localField:'_id',
})

//Account Type
userSchema.virtual('accountType').get(function(){
    const totalFollowers=this.followers?.length;
    return totalFollowers >=1 ? 'Pro Account' : 'Starter Account';
  })

//hash password
userSchema.pre("save",async function(next){
   if(!this.isModified("password")){
    next();
   }
    const salt= await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt)
    next()
})

//match password
userSchema.methods.isPasswordMatched=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
//Verify account
userSchema.methods.createAccountVerificationToken = async function () {
    //create a token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    this.accountVerificationToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");
    this.accountVerificationExpires = Date.now() + 30 * 60 * 1000; //10 minutes
    return verificationToken;
  };

//Password reset/forget
userSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; //10 minutes
    return resetToken;
  };

module.exports=mongoose.model("User",userSchema);
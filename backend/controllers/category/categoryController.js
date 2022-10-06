const expressAsyncHandler = require("express-async-handler");
const Category = require("../../model/category/Category");


//--------------create category----------------
const createCategoryController = expressAsyncHandler(async (req, res)=>{
try {
    const category = await Category.create({
        user: req.user._id,
        title: req.body.title,
    })
    res.json(category);
} catch (error) {
  res.json(error)  
}
})

//-------------fetch all categories----------

const fetchAllCategoryController = expressAsyncHandler(async(req, res)=>{
  try {
    const categories = await Category.find({}).populate("user").sort("-createdAt");
    res.json(categories);
  } catch (error) {
    res.json(error);
  }
})


//-------------fetch single category----------

const fetchSingleCategoryController = expressAsyncHandler(async(req, res)=>{
  const { id } = req.params;
  try {
    const category = await Category.findById(id).populate("user").sort("-createdAt")
    res.json(category);
  } catch (error) {
    res.json(error);
  }
})



//-------------update category-------------

const updateCategoryController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
try {
 const category = await  Category.findByIdAndUpdate(id, {
  title: req?.body?.title
 },
 {
  new:true,
runValidators:true
}
);
 res.json(category);
} catch (error) {
res.json(error)  
}
})


//------------delete category------------

const deleteCategoryController = expressAsyncHandler(async (req, res) => {
  const {id}= req.params
  try {
    const category = await Category.findByIdAndDelete(id);
    res.json(category)
  } catch (error) {
    res.json(error)
  }
})
module.exports ={ 
  createCategoryController, 
  fetchAllCategoryController, 
  fetchSingleCategoryController, 
  updateCategoryController, 
  deleteCategoryController
}
const express=require('express');
const {
     createCategoryController,
      fetchAllCategoryController, 
      fetchSingleCategoryController,
      updateCategoryController,
      deleteCategoryController
    } = require('../../controllers/category/categoryController');
const router=express.Router()
const authMiddleware = require('../../middlewares/auth/authMiddleware');


router.post('/',authMiddleware,createCategoryController)
// router.get('/',authMiddleware,fetchAllCategoryController)
// router.get('/:id',authMiddleware,fetchSingleCategoryController)
router.get('/',fetchAllCategoryController)
router.get('/:id',fetchSingleCategoryController)
router.put('/:id',authMiddleware,updateCategoryController)
router.delete('/:id',authMiddleware,deleteCategoryController)
module.exports  = router;
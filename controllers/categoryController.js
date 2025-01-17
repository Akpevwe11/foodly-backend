const Category = require('../models/Categories.js');

module.exports = {

    createCategory: async (req, res) => {

        const newCategory = new Category(req.body)

        try {

            await newCategory.save();
            res.status(201).json({status: true, message: "Category successfully created"});

        } catch (error) {

            res.status(500).json({status: false, message: error.message});

        }

    },

    updateCateory: async (req, res) => {

        const categoryId = req.params.id;
        const {title, value, imageUrl} = req.body; 

        try {

            const updatedCategory = await Category.findByIdAndUpdate(categoryId, {
                title, value, imageUrl
            }, {new: true})

            if (!updatedCategory) {
                return res.status(404).json({status: false, message: "Category not found"})
            }

            res.status(200).json({status: true, message: "Category successfully updated", updatedCategory});
            

        } catch (error) {

            res.status(500).json({status: false, message: error.message});

        }
    },

    

};
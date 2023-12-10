const Product = require('../models/ProductModel')
const bcrypt = require('bcrypt')

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description, discount } = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if(checkProduct) {
                resolve({
                    status: 'OK', 
                    message: 'The name of product is already'
                })
            }  
            const newProduct = await Product.create({
                name, 
                image, 
                type, 
                price, 
                countInStock: Number(countInStock), 
                rating, 
                description,
                discount: Number(discount),
            })
            if(newProduct) {
                resolve({
                    status: 'OK',
                    message: "SUCCESS",
                    data: newProduct
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

const updateProduct = (id, data) => {
    console.log('update data',data)
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({_id: id});
            if(!checkProduct) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }
            const updateProduct = await Product.findByIdAndUpdate(id, data, {new: true})

            console.log('data duoc update',updateProduct);

            resolve({
                status: 'OK',
                message: "SUCCESS",
                data: updateProduct
            })
        } catch (error) {
            reject(error);
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({_id: id});
            if(!checkProduct) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }
            await Product.findByIdAndDelete(id)

            resolve({
                status: 'OK',
                message: "Delete product successfully",
            })
        } catch (error) {
            reject(error);
        }
    })
}

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const skip = page * limit;
            let allProducts = [];
            const totalProduct = await Product.countDocuments();
            if(filter) {
                const label = filter[0];
                const allObjectFilter = await Product.find({
                    [label]: { '$regex': filter[1] }
                }).limit(limit).skip(skip)
                resolve({
                    status: 'OK',
                    message: "Get product successfully",
                    data: allObjectFilter,
                    total: totalProduct,
                    totalPage: Math.ceil(totalProduct / limit),
                    pageCurrent: Number(page + 1),
                })
            }
            if(sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0];
                console.log(objectSort);
                const allProductSort = await Product.find().limit(limit).skip(skip).sort(objectSort);
                resolve({
                    status: 'OK',
                    message: "Get product successfully",
                    data: allProductSort,
                    total: totalProduct,
                    totalPage: Math.ceil(totalProduct / limit),
                    pageCurrent: Number(page + 1),
                })
            }
            if(!limit) {
                allProduct = await Product.find();
            }else {
                allProduct = await Product.find().limit(limit).skip(skip);
            }

            resolve({
                status: 'OK',
                message: "Get product successfully",
                data: allProduct,
                total: totalProduct,
                totalPage: Math.ceil(totalProduct / limit),
                pageCurrent: Number(page + 1),
            })
        } catch (error) {
            reject(error);
        }
    })
}

const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({_id: id});
            if(!product) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: "Get details user successfully",
                data: product
            })
        } catch (error) {
            reject(error);
        }
    })
}

const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete products success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type')
            resolve({
                status: 'OK',
                message: 'Success',
                data: allType,
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteManyProduct,
    getAllType,
}
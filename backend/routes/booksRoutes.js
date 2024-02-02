import express from "express"
const router = express.Router()
import { Book } from "../models/bookModel.js"
router.post("/",async (req,res) => {

    try {
        if(!req.body.title||!req.body.author||!req.body.publishYear){
            res.status(400).send({
                message:"Send all required fields: title,author,publishYear"
            })
        }
        const newBook = {

            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear,

        }

        const book = await Book.create(newBook)
          res.status(201).send(book)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message:error.message,

        })
    }


})


router.get("/",async(req,res) => {

    try {
        const books = await Book.find({})
        res.status(200).send({
            count:books.length,
            data:books
          })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message:error.message
        })
    }

})

router.get("/:id",async(req,res) => {

    try {

        const {id} = req.params
        const book = await Book.findById(id)
        res.status(200).send(book)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message:error.message
        })
    }

})

router.put("/:id",async (req,res) => {

    try {
        
        if(!req.body.title||!req.body.author||!req.body.publishYear){
            res.status(400).send({
                message:"Send all required fields: title,author,publishYear"
            })
        }

        const {id} = req.params
        const result = await Book.findByIdAndUpdate(id,req.body)
        if(!result){
            res.status(404).send({
                message:"book not found"
            })
        }
        res.status(200).send({message:"Book updated successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message:error.message
        })
    }

})


router.delete("/:id",async (req,res) => {

    try {
        const {id} = req.params
        const result = await Book.findByIdAndDelete(id)
        if(!result){
            res.status(404).send({
                message:"book not found"
            })
        }
        res.status(200).send({
            message:"book deleted successfully"
        })

        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message:error.message
        })
    }

})

export default router

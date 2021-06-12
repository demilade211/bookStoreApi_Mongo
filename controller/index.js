import BookModel from "../models/book.js";
import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import joi from "joi";
dotenv.config();

const schema = joi.object(
    {
        email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    }
)

export const registerUser = async(req, res) => {
    const {firstName,lastName,email,password} = req.body;
    if(!firstName || !lastName || !email || !password){
        return res.status(400).json({msg: "All fields required"});
    }
    try {
        // to validate email
        const {error} = await schema.validate({email});
        if(error) return res.status(400).send(error.details[0].message);

        //to check if email already exist
        const emailExist = await UserModel.findOne({email:email});
        if(emailExist) return res.status(400).send("Email already Exists");


        //create new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const savedUser = await UserModel.create({firstName,lastName,email,password:hashedPassword});

        res.json(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
}

export const loginUser = async(req, res) => {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({msg: "All fields required"});
    }
    try {

         // to validate email
         const {error} = await schema.validate({email});
         if(error) return res.status(400).send(error.details[0].message);

        const authUser = await UserModel.findOne({email})
        if(!authUser) return res.status(400).json({msg: "User not found"});

        const isMatch = await bcrypt.compare(password,authUser.password);
        if(isMatch){
            const payload = {
                firstName: authUser.firstName,
                email: authUser.email
            }
            const authToken = await jwt.sign(payload,process.env.SECRETE,{expiresIn: 86400})
            
            //set header with authorization named auth-token
            return res.status(200).header("auth-token",authToken).json({
                msg: "Authentication successful Logged in",
                token: authToken
    
            })
        }
        res.status(400).json({msg: "password doesnt match"})
    } catch (error) {
        res.status(500).json({status: "fail", error})
    }
}

export const addBook = async(req, res) => {
    const {book_name,author,year_released} = req.body;
    if(!book_name || !author || !year_released){
        res.status(400).json({msg: "All fields required"})
    }
    try {
        const savedBook = await BookModel.create(req.body);
        res.json(savedBook)
    } catch (error) {
        res.status(400).send(error);
    }
}

export const getBook = async(req,res)=>{
    try {
        const savedBook = await BookModel.find({});
        res.json({
            msg: `Welcome ${req.user.firstName}`,
            savedBook
        })
    } catch (error) {
        res.status(400).send(error);
    }
}

export const getOneBook = async(req,res)=>{
    const {id} = req.params
    try {
        const savedBook = await BookModel.findById(id);
        res.json(savedBook);
    } catch (error) {
        res.status(400).send(error.reason={msg: `${id} doesn't exists`});
    }
}

export const updateBook = async(req,res)=>{
    const {id} = req.params
    const {book_name,author,year_released} = req.body;
    if(!book_name || !author || !year_released){
        res.status(400).json({msg: "All fields required"})
    }
    try {
        const savedBook = await BookModel.findByIdAndUpdate(id,{$set: req.body});
        res.json({msg: "Book updated"})
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const deleteBook = async(req,res)=>{
    const {id} = req.params
    try {
        const savedBook = await BookModel.findByIdAndRemove(id);
        res.json({msg: "Book deleted"})
    } catch (error) {
        res.status(400).send(error.reason={msg: "id not found"});
    }
}
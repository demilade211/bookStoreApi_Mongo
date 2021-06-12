import express from "express";
import {addBook,getBook,getOneBook,updateBook,deleteBook,registerUser,loginUser} from "../controller/index.js";
import verify from "../middlewares/verify.js"
const router = express.Router();



router.post('/books', verify, addBook);

router.post('/register', registerUser);

router.post('/login',loginUser);

router.get('/books', verify,getBook);

router.get('/books/:id',getOneBook);

router.put('/books/:id', verify,updateBook);

router.delete('/books/:id',verify,deleteBook);








export default router;
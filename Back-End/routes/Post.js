import fs from "fs";
import multer from "multer";
import express from "express";
import {editPost,searchPost ,createPost,getPost ,getPostById ,deletePost} from '../controller/post.js'
const router =express.Router();

const storage = multer.diskStorage({
    destination:(req , file ,cb)=>{
        cb(null ,'uploads/');
    },
    filename:(req , file ,cb)=>{
        cb(null ,Date.now()+'-'+file.originalname);
    }
});

const upload =multer({storage:storage});
if(!fs.existsSync('uploads'))
{
fs.mkdirSync('uploads');
}

router.get('/search',searchPost);

router.post('/',upload.single('image'),createPost);

router.get('/',getPost);

router.get('/:id',getPostById);

router.delete('/:id',deletePost);

router.patch('/:id',upload.single('image'),editPost);

export default router;
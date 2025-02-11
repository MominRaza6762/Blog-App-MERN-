import express from "express";
import {getPostsByAdmin , getPostByAdmin} from '../controller/post.js'
const router =express.Router();

router.get('/posts',getPostsByAdmin);

router.get('/posts/:id',getPostByAdmin);

export default router;
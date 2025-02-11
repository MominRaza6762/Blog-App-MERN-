import express from "express";
import {createUser,signInUser,getUser,sugnOutUser} from '../controller/user.js'
const router =express.Router();

router.get('/',getUser)

router.post('/signup',createUser)

router.post('/signin',signInUser)

router.post('/signout',sugnOutUser)

export default router;
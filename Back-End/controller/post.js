import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import BlogPost from "../models/Post.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const searchPost=async(requ , resp)=>{
    const keywords=requ.query.keywords;
    const order =requ.query.order;
    try
    {
        const terms =keywords.split(" ").filter(term=>term.trim()!=="");
        const searchQuery={
            $or:terms.map(term=>({
                $or:[
                    {title:{$regex:term, $options:"i" }},
                    {content:{$regex:term, $options:"i" }}
                ]
            }))
        }
        const searchResult =await BlogPost.find(searchQuery).sort({createdAt:order==="as"?1:-1});
        if(searchResult.length===0)
        {
            resp.status(201).json({message:"No Data Found In data Base With this Keywords"});
        }
        else
        {
            resp.status(200).json(searchResult);
           

        }
     
    }
    catch(error)
    {
        resp.status(500).json({message:error.message});
    }
}

export const createPost =async(requ,resp)=>{
    const {title , content , author , tags }=requ.body;
    const image = requ.file?requ.file.filename:null;
    try
    {
        const newPost = new BlogPost({
            title:title,
            content:content,
            author:author,
            tags:tags,
            image:image,
            createdBy:requ.user._id
        });
        await newPost.save();
        resp.status(200).json(newPost);
    }
    catch(error)
    {
        resp.status(500).json({message:error.message});
    }
}
export const getPost =async(requ,resp)=>{
    try
    {
     const allPosts =await BlogPost.find({createdBy:requ.user._id});
     resp.status(201).json(allPosts);
    }
    catch(error)
    {
        resp.status(500).json({message:error.message});
    }
}
export const getPostById =async(requ,resp)=>{
    try
    {
     const post =await BlogPost.findOne({_id:requ.params.id,createdBy:requ.user._id});
     resp.status(201).json(post);
    }
    catch(error)
    {
        resp.status(500).json({message:error.message});
    }
}
export const deletePost =async(requ,resp)=>{
    try
    {
     await BlogPost.findByIdAndDelete(requ.params.id);
     resp.status(201).json({message:"Successfully Deleted"});
    }
    catch(error)
    {
        resp.status(500).json({message:error.message});
    }
}
export const editPost=async(requ,resp)=>{
    try
    {
        const {title , content , tags}=requ.body;
        const image = requ.file?requ.file.filename:null;
        const updateFields={};
        if(title) updateFields.title =title;
        if(content) updateFields.content =content;
        if(tags) updateFields.tags =tags;
        if(image) updateFields.image =image;

        const result = await BlogPost.findById(requ.params.id,{image:1 ,_id:0});
        if(result.image)
        {
            const imagePath =path.join(__dirname,'../uploads',result.image);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Failed to delete old image:", err.message);
                }
            });

        }



     const updatedPost =await BlogPost.findByIdAndUpdate(requ.params.id,updateFields,{new:true});
     resp.status(201).json(updatedPost);
    }
    catch(error)
    {
        resp.status(500).json({message:error.message});
    }
}

export const getPostsByAdmin =async(requ,resp)=>{
    try
    {
     const allPosts =await BlogPost.find();
     resp.status(201).json(allPosts);
    }
    catch(error)
    {
        resp.status(500).json({message:error.message});
    }
}

export const getPostByAdmin =async(requ,resp)=>{
    try
    {
     const post =await BlogPost.findOne({_id:requ.params.id});
     resp.status(201).json(post);
    }
    catch(error)
    {
        resp.status(500).json({message:error.message});
    }
}
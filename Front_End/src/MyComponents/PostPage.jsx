import { MdDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import NavBar from "./NavBar"
import { useParams } from "react-router-dom";
import { useState , useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function PostPage({handleEditPost ,handleDeletePost}) {
  const navigate =useNavigate();
    const [post,setPost]=useState(null);
  const {id}=useParams();
  const fetchPost =async()=>{
    try
    {
      const fPost=await axios.get(`http://localhost:3000/posts/${id}`);
    setPost(fPost.data);    
    }
    catch(error)
    {
        console.error("Error While Fetching Blogs",error.message);
    }

  }
  const handleDelete=async()=>{
   try{
    await handleDeletePost(id);
    navigate('/posts');
   }catch (error) {
    console.error("Error Deleting post:", error.message);
  } 
  }
  useEffect(()=>{
      fetchPost();
  
    },[])

    if (!post) {
        return <div className="post">Loading post details...</div> ;
    }
    const dateObj =new Date(post.createdAt);
    const formatedDate=dateObj.toLocaleDateString('en-GB');
    const formatedTime=dateObj.toLocaleTimeString('en-US',{hour:"2-digit",minute:"2-digit",hour12:false})
  return (
    <div className="postMain">
        
        <div>
        <NavBar searchBar={false}   />      
        </div>
        <div className="post">
        {post.image?
                <img src={`http://localhost:3000/uploads/${post.image}`} alt="blog-img" />:
                <div style={{margin:"auto", textAlign:"center"}}>Image is Not Availabe</div>
              }
        </div>
        <div className="post" >
            <Link to={`/posts/edit/${post._id}`}>
        <div className="pEdit" onClick={()=>handleEditPost(post)} ><CiEdit size={24} />
        </div>
            </Link>

        <div className="pDelete" onClick={handleDelete}><MdDeleteSweep size={24} /></div>
            <div className="pTitle">
               <span>Title : </span>{post.title}  
            </div>
            <div className="pContent ubderLineAndBold">
               <span>Content:</span> {post.content}
            </div>
            <div className="pTags ubderLineAndBold">
               <span>Tags:</span> {post.tags.join(' , ')}
            </div>
            <div className="pFooter">
                <div className="pAuthor ubderLineAndBold"> <span>Author:</span>  {post.author}</div>
                <div className="pDate ubderLineAndBold"> <span>Post Created At:</span> {formatedTime} {formatedDate} </div>
            </div>

        </div>
    </div>
  )
}

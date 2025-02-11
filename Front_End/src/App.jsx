import Home from "./MyComponents/Home";
import EditPage from "./MyComponents/EditPage";
import axios from "axios";
import {  useState } from "react"
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider ,Navigate} from "react-router-dom";
import PostPage from "./MyComponents/PostPage";
import SearchPage from "./MyComponents/SearchPage";
import LogInPage from "./MyComponents/LogInPage";
import SignUpPage from "./MyComponents/SignUpPage";
import { useUser } from "./Contexts/UserContext";
import { useAuth } from "./Contexts/AuthContext";
function App() {
  
  const {isAuthenticated,setIsAuthenticated}=useAuth();

  const [posts,setPosts]=useState([]);
  const [editingData,setEditingData]=useState({
    title:"",
    content:"",
    tags:[]
  });
  
  
  const {setUser}=useUser();

  
  
  
  axios.defaults.withCredentials = true;
  const checkLogInStatus =async()=>{
    try {
       const user =await axios.get('http://localhost:3000/user/')
       setUser(user.data)
      setIsAuthenticated(true);
    }
    catch(error)
    {
        console.error("User not authenticated:", error.message);
        setIsAuthenticated(false);
        setUser(null)
    }
  }
  useEffect(()=>{
    checkLogInStatus();
  },[isAuthenticated])
  const ProtectedRoute =({element})=>{
      if (isAuthenticated === null) return <p>Loading...</p>; 
      return isAuthenticated?element:<Navigate to={"/login"} replace/>
  };

  
  
  const handleEditPost=(post)=>{
       setEditingData({
        title:post.title,
        content:post.content,
        tags:post.tags
       })
       
  }
  
  const updateData=async(id, editData)=>{
    const data =new FormData();
    data.append("title",editData.title);
    data.append("content",editData.content);
    data.append("tags",editData.tags.join(", "));
    if(editData.image)
    {
      data.append("image",editData.image);
    }

    try
    {
     const response =await axios.patch(`http://localhost:3000/posts/${id}`,data,{
      headers:{"Content-Type":"multipart/form-data"}
     });
     setPosts(posts.map((post)=>{
      return response.data._id===post._id?response.data:post;
     }))
     setEditingData({
      title:"",
    content:"",
    tags:[]
     })
    }
    catch(error)
    {
        console.error("Error While Updating Post",error.message);
    }
  }
  

  
  const handleSubmit=async(e,formData)=>{
    e.preventDefault();
    const data =new FormData();
    data.append("title",formData.title);
    data.append("content",formData.content);
    data.append("author",formData.author);
    data.append("tags",formData.tags.join(", "));
    if(formData.image)
    {
      data.append("image",formData.image);
    }
    try
    {
     const response =await axios.post('http://localhost:3000/posts',data,{headers:{
      "Content-Type":"multipart/form-data"
     }});
     setPosts([...posts,response.data])
    
    }
    catch(error)
    {
        console.error("Error While Creating Post",error.message);
    }

  }

  const fetchPosts=async()=>{
    try
    {
      const fPosts=await axios.get('http://localhost:3000/posts',{withCredentials:true});
    setPosts(fPosts.data);     
    }
    catch(error)
    {
        console.error("Error While Fetching Blogs",error.message);
    }
  }
  const handleDeletePost=async(id)=>{
    try
    {
      await axios.delete(`http://localhost:3000/posts/${id}`)
      setPosts(posts.filter((post)=>{
        return post._id!==id;
      }))
    }
    catch(error)
    {
        console.error("Error While Deleting Post",error.message);
    }
  }
  useEffect(()=>{
    fetchPosts();

  },[isAuthenticated])
  
  const router =createBrowserRouter([
    {
      path:'/',
      element:<ProtectedRoute element={<Home  handleSubmit={handleSubmit} posts={posts}/>}/>
    },{
      path:'/login',
      element:<LogInPage />
    },
    {
      path:'/signup',
      element:<SignUpPage />
    },
    {
      path:'/posts/:id',
      element:<ProtectedRoute element={<PostPage  handleDeletePost={handleDeletePost} handleEditPost={handleEditPost} />}/>
      
    },
    {
      path:'/posts/edit/:id',
      element:<ProtectedRoute element={<EditPage   setEditingData={setEditingData}  updateData={updateData} editingData={editingData}/>}/>
      
    },
    {
      path:'/posts/search',
      element:<ProtectedRoute element={<SearchPage />}/>
      
    }
    
  ])
  

  return (
    <>
        <RouterProvider router={router}/>
    </>
  )
}

export default App

import NavBar from "./NavBar"
import CreatePost from "./CreatePost"
import Card from "./Card"
import { useRef, useEffect } from "react"
export default function Home({posts  , handleSubmit  }) {
  
  const inputRef = useRef(null);
     useEffect(()=>{
      if(inputRef.current)
      {
        inputRef.current.focus();
      }
     },[]);
  return (
    <>
    <div className="main">
      <div>
    <NavBar  searchBar={true}  inputRef={inputRef} />
      </div>
      <div>
        <CreatePost  handleSubmit={handleSubmit}/>
      </div>
      {posts.length===0?<><h1 style={{marginTop:"3vh"}}>No Blogs To Show</h1></>:<><h1 style={{marginTop:"3vh"}}>All Posts</h1>
      <div className="allPosts">
        {posts.map((post)=>{
          return <Card post={post} key={post._id}/>
        })}
        
      </div></>}
      
    </div>

    </>
  )
}

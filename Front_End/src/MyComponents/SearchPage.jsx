import Card from "./Card"
import NavBar from "./NavBar"
import { useRef , useEffect } from "react"
import { useSearch } from "../Contexts/SearchContext";
export default function SearchPage() {
  const {searchResult}=useSearch(); 
  const inputRef = useRef(null);
   useEffect(()=>{
    if(inputRef.current)
    {
      inputRef.current.focus();
    }
   },[]);
  return (
    <div className="SearchMain">
    <div>
     <NavBar inputRef={inputRef}   searchBar={true}   />
     </div>
     {searchResult.length===0?<div className="noData">No Post/Blog Found</div>:<><h1 style={{marginTop:"3vh"}}>Search Result</h1>
           <div className="allPosts">
             {searchResult.map((post)=>{
               return <Card post={post} key={post._id}/>
             })}
             
           </div></>}
    </div>


    
  )
}

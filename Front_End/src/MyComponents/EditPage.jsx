import { GrDocumentUpdate } from "react-icons/gr";
import NavBar from "./NavBar"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function EditPage({editingData ,updateData }) {
   const [editData , setEditData]=useState(editingData)
   const handleChange=(e)=>{
      const fieldName=e.target.name;
      const fieldValue=e.target.value;
      if(fieldName==="tags")
      {
        const tagArray=fieldValue.split(",").map((tag)=>tag.trim());
        setEditData({...editData,tags:tagArray})
      }
      else if(fieldName==="image")
      {
        setEditData({...editData,image:e.target.files[0]})
      }
      else
      {
        setEditData({...editData,[fieldName]:fieldValue})
      }
  
    }


   const {id}=useParams();
   const navigate = useNavigate();
   const handleUpdate=async()=>{
      try {
         await updateData(id,editData);
         navigate(`/posts/${id}`); 
       } catch (error) {
         console.error("Error updating post:", error.message);
       }
}

  return (
    <div className="postMain">
        
        <div>
        <NavBar   searchBar={false}/>      
        </div>
        <div className="post">
            
        <div className="pEdit" onClick={handleUpdate} ><GrDocumentUpdate  size={26} />
        </div>
            
            <div className="pTitle">
               <label>Title : </label><input type="text" required name="title" value={editData.title} onChange={handleChange} />  
            </div>
            <div className="pContent ">
               <label>Content:</label> <textarea name="content" required  value={editData.content} onChange={handleChange}></textarea>
            </div>
            <div className="pTags ">
               <label>Tags:</label> <input type="text" name="tags" value={editData.tags.join(' ,')} onChange={handleChange}/>
            </div>
            <div className="pUpdate "><label >Update Image : </label>
      <input type="file" name="image" onChange={handleChange} accept="image/*" />
      </div>
            

        </div>
    </div>
  )
}

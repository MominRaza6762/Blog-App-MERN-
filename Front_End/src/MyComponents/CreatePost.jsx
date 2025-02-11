import { useState } from "react";
export default function CreatePost({handleSubmit}) {
  const [formData,setFormData]=useState({
    title:"",
    content:"",
    author:"",
    tags:[],
    image:null
  });

  const handleFormData=(e)=>{
    const fieldName=e.target.name;
    const fieldValue=e.target.value;
    if(fieldName==="tags")
      {
        const tagsArray =fieldValue.split(",").map((tag)=>tag.trim());
        setFormData({...formData,tags:tagsArray});
      }
      else if(fieldName==="image")
      {
        setFormData({...formData,image:e.target.files[0]});
      }
      else
      {
        setFormData({...formData,[fieldName]:fieldValue})
      }
      
      
    }
    return (
    <form onSubmit={(e)=>handleSubmit(e,formData)}>
    <div className="form">
      <div className="fTitle">
        <label > Title : </label>
        <input type="text" name="title" value={formData.title} onChange={handleFormData} required />
      </div>
      <div className="fContent">
        <label >Content : </label>
        <textarea name="content" value={formData.content} onChange={handleFormData} required></textarea>
      </div>
      <div className="fAuthorTags">
        <div className="author">
        <label >Author Name : </label>
        <input type="text" name="author" value={formData.author} onChange={handleFormData}  required/>
        </div>
        <div className="tags">
        <label >Tags : </label>
        <input type="text" placeholder="comma-seprated" name="tags" value={formData.tags.join(", ")} onChange={handleFormData} />
        </div>
      </div>
      <div className="fImage"><label >Upload Image : </label>
      <input type="file" name="image" onChange={handleFormData} accept="image/*" />
      </div>
      <div className="fButton">
        <button type="submit">Create Blog</button>
      </div>
    </div>
    </form>)
}

import { Link } from "react-router-dom";
export default function Card({post}) {
    const dateObj =new Date(post.createdAt);
    const formatedDate=dateObj.toLocaleDateString('en-GB',{month:'2-digit',day:"2-digit",year:"2-digit"});
    const formatedTime=dateObj.toLocaleTimeString('en-US',{hour:"2-digit",minute:"2-digit",hour12:false})

  return (
    <Link to={`/posts/${post._id}`} >
    <div className="card">
              <div className="cImage">
                {post.image?
                <img src={`http://localhost:3000/uploads/${post.image}`} alt="blog-img" />:
                <div style={{margin:"auto", textAlign:"center"}}>Image is Not Availabe</div>
              }
                </div>
              <div className="cTitle"><span>Title</span> : {post.title}</div>
              <div className="cContent"><span style={{color:"green",textDecoration:"underline"}}>Content</span>: {post.content}</div>
              <div className="cFooter">
                <div className="cAuthorName"><span>Author Name</span> : {post.author} </div>
                <div className="cCreation">{formatedDate} - {formatedTime}</div>
              </div>

    </div>    
    </Link>
    
  )
}

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext"
import { useUser } from "../Contexts/UserContext";
import { useSearch } from "../Contexts/SearchContext";
export default function NavBar(props) {
  const { inputRef, searchBar = false, nameDropbox=true } = props;
  
  const {searchData , setSearchData,handleSearch} =useSearch();
  const {setIsAuthenticated}=useAuth(); 
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const {user}=useUser();

  const handelLogOut = async() => {
    try
    {
      await axios.post('http://localhost:3000/user/signout');
      setIsAuthenticated(false)
      navigate('/login');
     
    }
    catch(error)
    {
        console.error("Error While loging out",error.message);
    }
  };

  const search =() => {
    if (searchBar && searchData.keywords.trim !== "") {
      handleSearch();
      navigate("/posts/search");
    }
  };

  return (
    <div className="navbar">
      <Link to={"/"}>
        <div className="logo">X-Blogs</div>
      </Link>
      <div className="navRight">
      {searchBar && (
        <div className="searchBar">
          <div className="serachInput">
            <input
              type="text"
              ref={inputRef}
              value={searchData.keywords}
              onChange={(e) =>
                setSearchData((prevState) => ({ ...prevState, keywords: e.target.value }))
              }
            />
          </div>
          <div className="searchOrder">
            <select
              value={searchData.order}
              onChange={(e) =>
                setSearchData((prevState) => ({ ...prevState, order: e.target.value }))
              }
            >
              <option value="as">asc</option>
              <option value="ds">desc</option>
            </select>
          </div>
          <div className="sbutton">
            <button onClick={search}>Search</button>
          </div>
        </div>
      )}
      {nameDropbox &&(
      <div >
      <div className="dropdown">
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {user?.name} ▼
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          <li onClick={handelLogOut}>Log out</li>
        </ul>
      )}
    </div>        
      </div>
  )}
      
    </div>
    </div>  
  );
}

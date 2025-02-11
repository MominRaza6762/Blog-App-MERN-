import { useState , useContext ,createContext } from "react";
import axios from "axios";
export const  SearchContext = createContext();

export const useSearch =()=>{
    const {searchData , setSearchData,handleSearch,searchResult} = useContext(SearchContext)
    return {searchData , setSearchData,handleSearch,searchResult};
}

export const SearchProvider =(props)=>{
    const [searchData,setSearchData]=useState({
        keywords:"",
        order:"as"
      });
      const [searchResult,setSearchResult] = useState([]);
      
      const handleSearch =async ()=>{
        try
        {
          const result =await axios.get('http://localhost:3000/posts/search',{params:searchData})
          if(result.status===200)
          {
            setSearchResult(result.data)
            
          }
          else{
            setSearchResult([])
          }
          // setSearchData({keywords:"",
          //   order:"as"})
        }
        catch(error)
        {
            console.error("Error While Searching ",error.message);
        }
    
      }


      return(
        <SearchContext.Provider value={{searchData , setSearchData,handleSearch,searchResult}}>
            {props.children}
        </SearchContext.Provider>
      )
}
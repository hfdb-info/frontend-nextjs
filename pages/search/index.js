import { useState, useEffect } from "react";
//TODO: figure out grid, SearchBar, styling
//TODO: add pagination to page when there are more than 16 search results
    
  export default function SearchResults(){
    const [searchData, setSearchData] = useState([])
    const [searchTerm, setSearchTerm] = useState("");

    

      const handleSubmit = (event) =>{
        event.preventDefault()
        setSearchTerm(event.target.value)
      fetch(`http://localhost:8080/nameSearch/${searchTerm}/-1/-1`)
          .then((res) => res.json())
          .then((searchData) => {
            console.log(searchData)
            setSearchData(searchData)
          })
      setSearchTerm("")
      console.log(searchData)
    }
    const handleChange = (event) => {
      event.preventDefault()
      setSearchTerm(event.target.value)
    }


    return <div className="SearchPage">
      <form className="SearchBar">
        <input
        type = "text"
        value={searchTerm}
        onSubmit = {(event) => handleSubmit(event)}
        placeholder = "Search Database"
        onChange={(event) => handleChange(event)}
        />
        <button 
        type = "submit" 
        onClick = {(event) => handleSubmit(event)}
        
        >Search</button>
      </form>
      <ul className="GridContainer">
          {searchData.map((element, index) => (
            <div className="Card" key = {index}>{element.sku}</div>
          ))}
      </ul>
    </div>
}





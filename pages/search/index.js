import Link from "next/link";
import { useState, useRef, useEffect} from "react";
//TODO: figure out grid, SearchBar, styling
//TODO: add pagination to page when there are more search results
    
  export default function Search(){
    //data for the search input
    const searchTerm = useRef("");

    //data for processing
    const [items, setItems] = useState([])
    let currentItems = []
    const [loading, setLoading] = useState(false)

    const handleSubmit = (event) =>{

      setLoading(true)
        event.preventDefault()
        let str = searchTerm.current.value
        if(str == ""){
          setLoading(false)
          return
        }
        console.log(`searchTerm: ${str}`)
        fetch(`http://127.0.0.1:8080/nameSearch/${str}/-1/-1`)
          .then((res) => res.json())
          .then((itemData) => {
            currentItems = itemData
            for(let i=0; i<currentItems.length && i<100; i++){
              let s = currentItems[i].sku
              fetch(`http://127.0.0.1:8080/grabProductDetails/${s}`)
              .then((res) => res.json())
              .then((data) => currentItems[i] = data)
          }
          })
          .then(() => {
            console.log(currentItems)
            //wait 1.5 seconds, then set "items" to the fetched datat from grabProductDetails
            //TODO: add proper state management
            setTimeout(()=>{
              setItems(currentItems.slice(0,100))
              console.log(items)
              setLoading(false)
            },5000)
            
          })
            
        
        
    }

    if(loading){
      return <h1>Loading...</h1>
    }
    

    

    return  <div className="SearchPage">
                <form className="SearchBar">
                  <input
                  type = "text"
                  ref={searchTerm}
                  defaultValue = ""
                  onSubmit = {(event) => handleSubmit(event)}
                  placeholder = "Search Database:"
                  />
                  <button 
                  type = "submit" 
                  onClick = {(event) => handleSubmit(event)}
                  
                  >Search</button> 
                </form>
                
                <ul className="GridContainer">
                  {items.map(item => (
                      <div key={item.sku} className="Card">
                          <img 
                          src={item.imgURL}
                          width = "247"
                          height = "250"
                          />
                          <Link className = "itemPageLink" href = {`/search/${item.sku}`}>{item.name}</Link>
                          <p>{ item.price ? "Price: $"+item.price/100 : ""}</p>
                      </div>
                  ))}
                  
              </ul>
    </div>
}





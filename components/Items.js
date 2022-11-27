
import Link from "next/link"
export const Items = ({items, loading}) => {
   
    return ( loading &&
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
    )
}

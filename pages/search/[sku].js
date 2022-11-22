import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function ItemPage() {
  //grab sku from url: (.../sku/)
  const router = useRouter()
  const {sku} = router.query

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  
  //fetch item details on page load, requires router 
  //in dependency array
  useEffect(() => {

    //set page loading (should be pretty fast but just in case)
    setLoading(true)
    //console.log(sku)
    fetch(`http://localhost:8080/grabProductDetails/${sku}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setData(data)
        setLoading(false)
      })
  }, [router])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No data</p>

  return (
    <div>
      <div>
       <h1>{data.name}</h1>
        <img src={data.imgURL}></img>
        {/*When making Links, you must include https:// or it will route to the current url/{href} */}
      </div>
      
      <div className='ItemDescription'>
        <Link href = {`https://www.harborfreight.com/${data.canonicalURL}`}>LINK TO PRODUCT</Link>
        <p>{"$"+data.price/100}</p>
      </div>
        
    </div>
    
  )
}
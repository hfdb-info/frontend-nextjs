import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import * as V from 'victory'
import { VictoryChart, VictoryLine } from 'victory'

export default function ItemPage() {
  //grab sku from url: (.../sku/)
  const router = useRouter()
  const {sku} = router.query
  const [upperPriceBound, setUpperPriceBound] = useState(150)
  const [data, setData] = useState([])
  const [priceData, setPriceData] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [formattedData, setFormattedData] = useState([])

  
  //fetch item details on page load, requires router 
  //in dependency array
  useEffect(() => {
    //set page loading (should be pretty fast but just in case)
    setLoading(true)
    
    console.log(sku)
    fetch(`http://127.0.0.1:8080/grabProductDetails/${sku}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setData(data)
        setUpperPriceBound(new Number(2*data.price / 100))

      })
    fetch(`http://127.0.0.1:8080/grabRetailPriceHistory/${sku}/1900-01-01T01%3A01%3A01Z/2100-01-01T01%3A01%3A01Z`)
    .then((res) => res.json())
      .then((priceData) => {
        setFormattedData(priceData.map((element)=>{
          let temp = new String(element.ts)
          let temp2 = new Number(element.price/100)
          // console.log(temp)
          // console.log(temp.substring(0,4))
          // console.log(temp.substring(5,7))
          // console.log(temp.substring(8,10))
          return {x: new Date(temp.substring(0,4), temp.substring(5,7), temp.substring(8,10) ), 
                  y: temp2}
        }))
        setTimeout(()=>{
          setPriceData(priceData)
        console.log(priceData)
        console.log("formattedData: ")
        console.log(formattedData)
        setLoading(false)
        },5900)
        
      })
      .catch((e)=>{
        console.log("Waiting for data from API:")
      })

  }, [router])

  if (isLoading) return <p>Loading...</p>
  setTimeout(()=>{
    console.log(sku)
  },3000)

  return (
    <div>
      <div>
       
        <img src={data.imgURL}></img>
        {/*When making Links, you must include https:// or it will route to the current url/{href} */}
      </div>
      
      <div className='ItemDescription'>
        <Link href = {`https://www.harborfreight.com/${data.canonicalURL}`}>LINK TO PRODUCT</Link>
        <p>{"$"+data.price/100}</p>
        <h1>{data.name}</h1>
      <div className="chart" style={{ width: "800", height: "1000"}}>
         <VictoryChart
         title={data.name}
         
         scale={{x: "time" }}
        height = "800"
        width="1000"
        >
          <VictoryLine
         domain={{y: [0, upperPriceBound]}}
         labels={({ datum }) => "$"+datum.y}
          data={formattedData}
            interpolation="step"
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc"}
            }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
          />
          
        </VictoryChart>
        </div>
      </div>
        
    </div>
    
  )
}
import { useEffect, useState } from "react"
import { hcmMarketTicker } from "../../data/market_data"

export default function MarketTicker(){

  const [data,setData] = useState(hcmMarketTicker)
  const [flash,setFlash] = useState({})

  useEffect(()=>{

    const interval = setInterval(()=>{

      setData(prev=>{

        return prev.map(item=>{

          /* random change */
          const delta = (Math.random() - 0.5) * 1.2
          const newChange = +(item.change + delta).toFixed(1)

          const direction = newChange > item.change ? "up" : "down"

          /* flash effect */
          setFlash(f=>({
            ...f,
            [item.district]: direction
          }))

          setTimeout(()=>{
            setFlash(f=>({
              ...f,
              [item.district]: null
            }))
          },600)

          return{
            ...item,
            change:newChange
          }

        })

      })

    },5000)

    return ()=>clearInterval(interval)

  },[])

  return(

    <div className="market-ticker">

      {data.map(item=>{

        const up = item.change >= 0

        return(

          <div
            key={item.district}
            className={`ticker-item ${up ? "green" : "red"} ${flash[item.district] || ""}`}
          >

            <span className="ticker-name">
              {item.district}
            </span>

            <span className="ticker-value">
              {up ? "+" : ""}{item.change}%
            </span>

            <span className="ticker-arrow">
              {up ? "▲" : "▼"}
            </span>

          </div>

        )

      })}

    </div>

  )

}
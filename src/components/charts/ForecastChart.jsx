import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

import { priceForecast } from "../../data/priceForecast"

export default function ForecastChart({ district }) {

  const data = Array.isArray(priceForecast) ? priceForecast : []

  if(!data.length){
    return (
      <div style={{height:300,color:"#94a3b8"}}>
        No forecast data
      </div>
    )
  }

  return(

    <div style={{width:"100%",height:320}}>

      <h3 style={{marginTop:0,color:"#22d3ee"}}>
        Land Price Forecast – {district || "HCMC"}
      </h3>

      <ResponsiveContainer width="100%" height={260}>

        <LineChart data={data}>

          <CartesianGrid stroke="#1e293b"/>

          <XAxis
            dataKey="year"
            stroke="#94a3b8"
          />

          <YAxis
            stroke="#94a3b8"
          />

          <Tooltip
            contentStyle={{
              background:"#020617",
              border:"1px solid #1e293b"
            }}
          />

          <Line
            type="monotone"
            dataKey="price"
            stroke="#22d3ee"
            strokeWidth={3}
            dot={{r:4}}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  )

}
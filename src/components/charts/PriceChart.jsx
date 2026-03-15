import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

import rawData from "../../data/hcm_land_price_history_2000_2025.json"

export default function PriceChart(){

  /* chọn phường đại diện */
  const ward = rawData[0]

  /* convert price_history -> chart data */
  const chartData = Object.entries(ward.price_history).map(([year,price])=>({
    year:Number(year),
    price
  }))

  return(

    <div style={{width:"100%",height:320}}>

      <h3 style={{
        fontSize:"14px",
        marginBottom:"8px",
        fontWeight:600
      }}>
        Land Price Index (2000-2025)
      </h3>

      <ResponsiveContainer width="100%" height={260}>

        <LineChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3"/>

          <XAxis
            dataKey="year"
            stroke="#94a3b8"
          />

          <YAxis
            stroke="#94a3b8"
          />

          <Tooltip/>

          <Line
            type="monotone"
            dataKey="price"
            stroke="#22d3ee"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  )
}
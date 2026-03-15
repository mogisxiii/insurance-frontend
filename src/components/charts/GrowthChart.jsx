import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

import growthData from "../../data/hcm_land_price_growth_rank_2000_2025.json"

/* format tiền */
function formatPrice(v) {

  if (!v) return "N/A"

  if (v >= 1000000)
    return (v / 1000000).toFixed(1) + " triệu"

  return v.toLocaleString()

}

/* tooltip custom */
function CustomTooltip({ active, payload }) {

  if (!active || !payload || !payload.length) return null

  const d = payload[0].payload

  return (
    <div style={{
      background:"#0f172a",
      color:"#e2e8f0",
      padding:"10px",
      borderRadius:"6px",
      fontSize:"12px",
      boxShadow:"0 4px 12px rgba(0,0,0,0.3)"
    }}>
      <b>{d.ward}</b>
      <div>{d.district}</div>

      <hr style={{opacity:0.2}}/>

      <div>2000: {formatPrice(d.price_2000)}/m²</div>
      <div>2025: {formatPrice(d.price_2025)}/m²</div>

      <div style={{marginTop:"4px"}}>
        Tăng: <b>{d.growth_percent}%</b>
      </div>

      <div>
        Gấp: <b>{d.growth_multiple} lần</b>
      </div>
    </div>
  )
}

export default function GrowthChart() {

  const data = [...growthData]
    .sort((a,b)=>b.growth_percent-a.growth_percent)
    .slice(0,12)

  return (

    <div style={{
      width:"100%",
      height:320,
      padding:"10px"
    }}>

      <h3 style={{
        fontSize:"14px",
        marginBottom:"8px",
        fontWeight:600
      }}>
        Top tăng trưởng giá đất HCM (2000 → 2025)
      </h3>

      <ResponsiveContainer width="100%" height={270}>

        <BarChart
          data={data}
          layout="vertical"
          margin={{top:10,right:20,left:30,bottom:10}}
        >

          <CartesianGrid strokeDasharray="3 3"/>

          <XAxis type="number" tick={{fontSize:11}}/>

          <YAxis
            type="category"
            dataKey="ward"
            width={110}
            tick={{fontSize:11}}
          />

          <Tooltip content={<CustomTooltip/>}/>

          <Bar
            dataKey="growth_percent"
            fill="#22d3ee"
            radius={[4,4,4,4]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  )
}
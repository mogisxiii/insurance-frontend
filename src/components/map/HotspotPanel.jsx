import growthData from "../../data/hcm_land_price_growth_rank_2000_2025.json"

export default function HotspotPanel(){

  const top = [...growthData]
    .sort((a,b)=>b.growth_percent-a.growth_percent)
    .slice(0,3)

  return(

    <div className="hotspot-panel">

      <h3>🔥 HOT ZONES</h3>

      {top.map(d=>(
        <div key={d.district}>

          {d.district}

          <span className="green">
            +{d.growth_percent}%
          </span>

        </div>
      ))}

    </div>

  )

}
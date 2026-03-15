import { GeoJSON } from "react-leaflet"

import districts from "../../data/hcm_districts.json"
import growthData from "../../data/hcm_land_price_growth_rank_2000_2025.json"

/* ---------- COLOR SCALE ---------- */

function getColor(growth){

  if(growth >= 20) return "#ff0000"     // cực nóng
  if(growth >= 15) return "#ff6a00"     // rất nóng
  if(growth >= 10) return "#ffb300"     // nóng
  if(growth >= 5)  return "#ffe600"     // ấm
  if(growth >= 0)  return "#7fff00"     // tăng nhẹ

  return "#00c3ff"                     // giảm
}

/* ---------- COMPONENT ---------- */

export default function DistrictBoundary(){

  function onEachFeature(feature, layer){

    const name = feature.properties.name

    const growth =
      growthData.find(d => d.district === name)?.growth_percent || 0

    layer.bindTooltip(

      `<b>${name}</b><br/>
       Growth: <b>${growth}%</b>`,

      {
        direction:"top",
        offset:[0,-5],
        opacity:0.9
      }

    )

  }

  return(

    <GeoJSON

      data={districts}

      onEachFeature={onEachFeature}

      style={(feature)=>{

        const name = feature.properties.name

        const growth =
          growthData.find(d => d.district === name)?.growth_percent || 0

        return{

          color:"#ff0040",      // viền quận
          weight:2,

          fillColor:getColor(growth),  // 🔥 district heatmap
          fillOpacity:0.45

        }

      }}

    />

  )

}
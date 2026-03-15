import { useMap } from "react-leaflet"
import { useEffect } from "react"
import L from "leaflet"
import "leaflet.heat"

import locations from "../../data/hcm_locations.json"

export default function HeatmapLayer(){

  const map = useMap()

  useEffect(()=>{

    if(!map) return

    const points = locations.map(loc => [
      loc.lat,
      loc.lng,
      loc.intensity || 0.6
    ])

    const heat = L.heatLayer(points,{
      radius:35,
      blur:25,
      maxZoom:17,
      gradient:{
        0.2:"blue",
        0.4:"lime",
        0.6:"yellow",
        0.8:"orange",
        1.0:"red"
      }
    })

    heat.addTo(map)

    return ()=>{
      map.removeLayer(heat)
    }

  },[map])

  return null
}
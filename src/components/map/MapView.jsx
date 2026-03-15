import { MapContainer, TileLayer, useMap } from "react-leaflet"
import { useEffect } from "react"

/* ⭐ HEATMAP */
import HeatmapLayer from "./HeatmapLayer"

/* ⭐ DISTRICT BOUNDARY */
import DistrictBoundary from "./DistrictBoundary"

/* ---------- FIX MAP SIZE ---------- */

function MapResizeFix(){

  const map = useMap()

  useEffect(()=>{

    function fix(){
      setTimeout(()=>{
        map.invalidateSize()
      },200)   // tăng delay để Leaflet ổn định
    }

    fix()

    window.addEventListener("resize",fix)

    return ()=>{
      window.removeEventListener("resize",fix)
    }

  },[map])

  return null
}

/* ---------- LOCATION CONTROLLER ---------- */

function MapController({ location }) {

  const map = useMap()

  useEffect(()=>{

    if(!location) return

    map.flyTo(
      [location.lat, location.lng],
      13,
      { duration:1.5 }
    )

  },[location,map])

  return null
}

/* ---------- MAP VIEW ---------- */

export default function MapView({ location }) {

  return (

    <MapContainer
      center={[10.7769,106.7009]}
      zoom={11}
      scrollWheelZoom={true}
      style={{
        width:"100%",
        height:"100%"
      }}
    >

      {/* BASE MAP */}
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* ⭐ HEATMAP */}
      <HeatmapLayer/>

      {/* ⭐ DISTRICT BOUNDARY (render sau để nằm trên) */}
      <DistrictBoundary/>

      {/* FIX MAP SIZE */}
      <MapResizeFix/>

      {/* LOCATION CONTROLLER */}
      <MapController location={location}/>

    </MapContainer>

  )

}
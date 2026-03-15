import { GeoJSON } from "react-leaflet"

import districts from "../../data/hcm_locations.json"
import priceData from "../../data/hcm_land_price_history_2000_2025.json"

export default function DistrictMap({ district, onDistrictChange }) {

  function style(feature) {

    const name = feature.properties?.name || feature.name

    return {
      color: name === district ? "#22d3ee" : "#334155",
      weight: name === district ? 3 : 1,
      fillColor: name === district ? "#0ea5e9" : "#1e293b",
      fillOpacity: 0.25
    }

  }

  function onEach(feature, layer) {

    const name = feature.properties?.name || feature.name

    const districtData = priceData.find(d => d.district === name)
    const price = districtData?.["2025"]

    layer.bindPopup(`
      <b>${name}</b><br/>
      Giá đất 2025: ${price ? price + " triệu/m²" : "N/A"}
    `)

    layer.on({

      click: (e) => {

        if (onDistrictChange) {
          onDistrictChange(name)
        }

        const map = e.target._map
        map.fitBounds(e.target.getBounds())

        e.target.openPopup()

      }

    })

  }

  return (

    <GeoJSON
      data={districts}
      style={style}
      onEachFeature={onEach}
    />

  )

}
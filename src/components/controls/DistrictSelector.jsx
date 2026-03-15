import { useState, useMemo } from "react"
import locations from "../../data/hcm_locations.json"

export default function DistrictSelector({ value, onChange }) {

  const [search,setSearch] = useState("")
  const [open,setOpen] = useState(false)
  const [activeIndex,setActiveIndex] = useState(0)

  function normalize(text){
    return text
      ?.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g,"")
  }

  /* -------- SMART QUERY PARSER -------- */

  function parseQuery(q){

    const text = normalize(q)

    const wardMatch =
      text.match(/p\s?(\d+)/) ||
      text.match(/phuong\s?(\d+)/)

    const districtMatch =
      text.match(/q\s?(\d+)/) ||
      text.match(/quan\s?(\d+)/)

    return {
      ward: wardMatch ? wardMatch[1] : null,
      district: districtMatch ? districtMatch[1] : null
    }

  }

  /* -------- GOOGLE MAP STYLE SEARCH -------- */

  const filtered = useMemo(()=>{

    const q = normalize(search)
    const parsed = parseQuery(search)

    if(!q) return locations.slice(0,15)

    return locations.filter(loc => {

      const name = normalize(loc.name)
      const district = normalize(loc.district || "")
      const aliases = (loc.aliases || []).map(normalize)

      /* normal search */
      const basicMatch =
        name.includes(q) ||
        district.includes(q) ||
        aliases.some(a => a.includes(q))

      /* smart ward + district search */
      const wardMatch =
        parsed.ward &&
        name.includes(`phuong ${parsed.ward}`)

      const districtMatch =
        parsed.district &&
        district.includes(`quan ${parsed.district}`)

      if(parsed.ward && parsed.district){
        return wardMatch && districtMatch
      }

      if(parsed.ward){
        return wardMatch
      }

      return basicMatch

    }).slice(0,15)

  },[search])


  function handleSelect(loc){

  if(onChange){

    onChange({
      name: loc.name,
      district: loc.type === "district" ? loc.name : loc.district,
      lat: loc.lat,
      lng: loc.lng
    })

  }

  setSearch(
    loc.district
      ? `${loc.name} — ${loc.district}`
      : loc.name
  )

  setOpen(false)

}

  /* keyboard navigation */

  function handleKey(e){

    if(!open) return

    if(e.key === "ArrowDown"){
      setActiveIndex(i => Math.min(i+1, filtered.length-1))
    }

    if(e.key === "ArrowUp"){
      setActiveIndex(i => Math.max(i-1,0))
    }

    if(e.key === "Enter"){
      handleSelect(filtered[activeIndex])
    }

  }

  return(

  <div
    style={{
      background:"#020617",
      border:"1px solid #1e293b",
      padding:"10px",
      borderRadius:"6px",
      width:"260px",
      position:"relative"
    }}
  >

    <div style={{
      fontSize:"12px",
      color:"#94a3b8",
      marginBottom:"6px"
    }}>
      LOCATION SELECTOR
    </div>

    <input
      placeholder="Tìm quận / phường..."
      value={search || ""}
      onFocus={()=>setOpen(true)}
      onKeyDown={handleKey}
      onChange={(e)=>{
        setSearch(e.target.value)
        setOpen(true)
        setActiveIndex(0)
      }}
      style={{
        width:"100%",
        background:"#020617",
        border:"1px solid #1e293b",
        color:"#e2e8f0",
        padding:"6px"
      }}
    />

    {open && (

    <div
      style={{
        position:"absolute",
        top:"70px",
        left:0,
        width:"100%",
        maxHeight:"240px",
        overflow:"auto",
        background:"#020617",
        border:"1px solid #1e293b",
        borderRadius:"4px",
        zIndex:9999,
        boxShadow:"0 10px 30px rgba(0,0,0,0.4)"
      }}
    >

      {filtered.length === 0 && (
        <div style={{
          padding:"8px",
          color:"#94a3b8"
        }}>
          No results
        </div>
      )}

      {filtered.map((loc,index) => (

        <div
          key={`${loc.slug}-${index}`}
          onClick={()=>handleSelect(loc)}
          style={{
            padding:"8px",
            cursor:"pointer",
            borderBottom:"1px solid #1e293b",
            background:index===activeIndex ? "#0f172a" : "transparent"
          }}
        >

          <div style={{color:"#e2e8f0"}}>
  {loc.name}
</div>

<div
  style={{
    fontSize:"11px",
    color:"#94a3b8"
  }}
>
  {loc.type === "district"
    ? "TP Hồ Chí Minh"
    : `${loc.district} • TP Hồ Chí Minh`}
</div>

        </div>

      ))}

    </div>

    )}

  </div>

  )

}
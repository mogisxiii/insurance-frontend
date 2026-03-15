import infraData from "../data/hcm_infrastructure_timeline.json"

export default function InfraTimeline(){

  const data = Array.isArray(infraData) ? infraData : []

  return(

    <div
      style={{
        maxHeight:"260px",
        overflowY:"auto",
        paddingRight:"6px"
      }}
    >

      <h3>Lịch Sử Các Sự Kiện Hạ Tầng Có Tác Động Lớn</h3>

      <ul style={{paddingLeft:"18px"}}>

        {data.map((item,index)=>{

          const impact = item.impact_area?.join(", ")

          return(

            <li key={index} style={{marginBottom:"12px"}}>

              <strong>{item.year}</strong> — {item.project}

              <div style={{color:"#94a3b8",fontSize:"13px"}}>
                {impact}
              </div>

              <div style={{color:"#64748b",fontSize:"12px"}}>
                {item.description}
              </div>

            </li>

          )

        })}

      </ul>

    </div>

  )

}
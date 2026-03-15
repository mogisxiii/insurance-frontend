import HotspotPanel from "../map/HotspotPanel"

export default function Sidebar(){

  return(

    <div className="vtp-sidebar">

      <div className="sidebar-title">
        VTP - TRẠM TRA CỨU DỮ LIỆU ĐẤT MỞ
      </div>

      <ul>

        <li>🗺 BẢN ĐỒ</li>

        <li>📊 THỊ TRƯỜNG</li>

        <li>🏗 HẠ TẦNG</li>

        <li>📈 DỰ ĐOÁN </li>

        <li>🤖 TRỢ LÝ AI</li>

      </ul>

      {/* HOT ZONES PANEL */}

      <HotspotPanel/>

    </div>

  )

}
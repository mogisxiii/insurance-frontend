import MarketTicker from "./MarketTicker"

export default function Header(){

return(

<div className="vtp-header">

<div className="vtp-header-left">

<h1>VTP INDEX</h1>

<p className="vtp-subtitle">
HIỆN TRẠNG GIÁ ĐẤT CẬP NHẬT 10:00 15/03/2026
</p>

</div>

<div className="vtp-header-right">

<div className="vtp-company">
VTP GROUP
</div>

<div className="vtp-hotline">
Hotline: 0903303639
</div>

<div className="vtp-contact">
Mr. James
</div>

</div>

<MarketTicker/>

</div>

)

}
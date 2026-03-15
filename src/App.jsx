import { useState } from "react"

import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import Sidebar from "./components/layout/Sidebar"
import MarketTicker from "./components/layout/MarketTicker"

import MapView from "./components/map/MapView"

import PriceChart from "./components/charts/PriceChart"
import GrowthChart from "./components/charts/GrowthChart"
import ForecastChart from "./components/charts/ForecastChart"

import DistrictSelector from "./components/controls/DistrictSelector"

import InfraTimeline from "./timeline/InfraTimeline"
import ChatDemo from "./ai/ChatDemo"

import "./App.css"

export default function App(){

  /* ⭐ STATE CHÍNH */
  const [location, setLocation] = useState(null)

  /* fallback district cho charts */
  const district = location?.district || "Quận 1"

  return(

  <div className="terminal-layout">

    <Sidebar/>

    <div className="dashboard">

      <Header/>

      <MarketTicker/>

      {/* LOCATION SELECTOR */}
      <div className="selector-bar">

        <DistrictSelector
          value={location}
          onChange={setLocation}
        />

      </div>

      <main className="grid">

        {/* MAP */}
        <div className="card map">
          <MapView
            location={location}
          />
        </div>

        {/* AI BOT */}
        <div className="card bot">
          <ChatDemo/>
        </div>

        {/* PRICE CHART */}
        <div className="card chart">
          <PriceChart district={district}/>
        </div>

        {/* FORECAST */}
        <div className="card forecast">
          <ForecastChart district={district}/>
        </div>

        {/* INFRA TIMELINE */}
        <div className="card timeline">
          <InfraTimeline district={district}/>
        </div>

        {/* GROWTH RANK */}
        <div className="card ranking">
          <GrowthChart/>
        </div>

      </main>

      <Footer/>

    </div>

  </div>
  )
}
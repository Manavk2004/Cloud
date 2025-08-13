import './App.css'
import delta from "./assets/delta.png"
import plane1 from "./assets/plane1.jpg"
import plane2 from "./assets/plane2.jpg"
import {useState, useEffect} from "react"

function App() {
  return(
    <>
      <div id="main-background">
        <nav id="navbar">
          <div id="navbar-div">
            <div id='div1'>
              <li>Home</li>
            </div>
            <div id='div2'>
              <li>My Tickets</li>
            </div>
            <div id='div3'>
              <li>Find Flight</li>
            </div>
          </div>
        </nav>
        <div id="left-side-main-background">
          <div id='top-section-left'>
            {/* <div id="section-left-side">
                <div id='section-left-container1'>
                  <h1 id="h1-left-section">Lowest Fares</h1>
                </div>
                <div id='section-left-container2'>
                  <h3>Cloud presents the lowest prices for your convenience</h3>
                  <h3>With a few clicks, view the cheapest options accross supported airlines</h3>
                </div>
            </div> */}
          </div>
          <div id='left-section-bottom'>
          </div>
        </div>
        <div id="middle-section">
          <div id="image-container">
            <img id="delta-logo" src={delta} />
          </div>
        </div>
        <div id="right-side-main-background">
          <div id="section-right-side">

          </div>
        </div>
      </div>
    </>
  )
}

export default App

import './App.css'
import delta from "./assets/delta.png"
import plane1 from "./assets/plane1.jpg"
import plane2 from "./assets/plane2.jpg"
import {useState, useEffect} from "react"
import { DeltaPage } from "./components/deltaHomePage.jsx" 
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<DeltaPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import "./homepage-components/homepages.css"
import {useState, useEffect} from "react"
import { DeltaPage } from "./homepage-components/deltaHomePage.jsx" 
import { UnitedPage } from "./homepage-components/unitedHomePage.jsx"
import { SouthWestPage } from "./homepage-components/southWestPage.jsx"
import { FindFlight } from "./navbar-components/findflight.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

function App() {

  const [ currentPage, setCurrentPage ] = useState(0)


  function setPage(){
    if(currentPage === 3){
      setCurrentPage(() => 0)
    }else{
      setCurrentPage((prev) => prev + 1)
    }
  }

  function currentHomePage(){
    if(currentPage === 0){
      return(
        <>
          <BrowserRouter>
            <Routes>
              <Route path='/home' element={<DeltaPage/>} />
            </Routes>
          </BrowserRouter>
        </>
      )
    }else if(currentPage === 1){
      return(
        <>
          <BrowserRouter>
            <Routes>
              <Route path='/home' element={<UnitedPage/>} />
            </Routes>
          </BrowserRouter>
        </>
      )
    }else if(currentPage === 2){
      return(
        <BrowserRouter>
          <Routes>
            <Route path='/home' element={<SouthWestPage/>} />
          </Routes>
        </BrowserRouter>
      )
    }
  }
  useEffect(() =>{
    setInterval(() => setPage(), 3000)
  }, [])

  useEffect(() =>{
    if(currentPage === 3){
      setCurrentPage(0)
    }
    console.log(currentPage)
  }, [currentPage])



  
  return(
    <>
     {currentHomePage()}
    </>
  )
}

export default App

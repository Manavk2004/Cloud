import "./homepage-components/homepages.css"
import {useState, useEffect} from "react"
import { DeltaPage } from "./homepage-components/deltaHomePage.jsx" 
import { UnitedPage } from "./homepage-components/unitedHomePage.jsx"
import { SouthWestPage } from "./homepage-components/southWestPage.jsx"
import { FindFlight } from "./navbar-components/findflight.jsx"
import { FlightResults } from "./navbar-components/flightresults.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

function App() {

  const [ currentPage, setCurrentPage ] = useState(0)
  const [ isAnimated, setIsAnimated ] = useState(true)

  const variants = {
    initial: { opacity: 0, y: 20, filter:'blur(6px)'},
    animate: { opacity: 1, y: 0, filter: 'blur(0px)'},
    exit: { opaity: 0, y: -20, filter: "blur(6px)"}
  }


  function setPage(){
    if(isAnimated){
      if(currentPage === 3){
        setCurrentPage(() => 0)
      }else{
        setCurrentPage((prev) => prev + 1)
      }
    }
  }

  useEffect(() =>{
    if (isAnimated){
      setInterval(() => setPage(), 3000)
    }
  }, [])

  useEffect(() =>{
    if(currentPage === 3 && isAnimated){

      setCurrentPage(0)
    }
  }, [currentPage])

  useEffect(() =>{
    console.log(isAnimated)
  }, [isAnimated])

  useEffect(() =>{
    if(window.location.href === "http://localhost:5173/findflight"){
      setIsAnimated(false)
    }
  }, [window.location.href])

  
  return(
      <BrowserRouter>
        {isAnimated ? (
          <>
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentPage}
                variants={variants}
                initial='initial'
                animate='animate'
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1]}} 
                style={{ height: "100% "}}
              >
                <Routes>
                  <Route path="/home" element={
                    currentPage === 0 ? <DeltaPage props={isAnimated}/> : 
                    currentPage === 1 ? <UnitedPage props={isAnimated}/> :
                    <SouthWestPage props={isAnimated}/>
                  } />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <Routes>
            <Route path="/findflight" element={<FindFlight setIsAnimated={setIsAnimated}/>}/>
            <Route path="/home" element={
              currentPage === 0 ? <DeltaPage props={isAnimated}/> : 
              currentPage === 1 ? <UnitedPage props={isAnimated}/> :
              <SouthWestPage props={isAnimated}/>
            } />
            <Route path="/flightresults" element={<FlightResults />} />
          </Routes>
        )}
    </BrowserRouter>
  )
}

export default App

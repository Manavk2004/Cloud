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

  const variants = {
    initial: { opacity: 0, y: 20, filter:'blur(6px)'},
    animate: { opacity: 1, y: 0, filter: 'blur(0px)'},
    exit: { opaity: 0, y: -20, filter: "blur(6px)"}
  }


  function setPage(){
    if(currentPage === 3){
      setCurrentPage(() => 0)
    }else{
      setCurrentPage((prev) => prev + 1)
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
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentPage}
          variants={variants}
          initial='initail'
          animate='animate'
          exit="exit"
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1]}} 
          style={{ height: "100% "}}
        >
          {currentPage === 0 && <DeltaPage />}
          {currentPage === 1 && <SouthWestPage />}
          {currentPage === 2 && <UnitedPage />}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default App

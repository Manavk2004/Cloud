import "./findflights.css"
import DatePicker from "react-datepicker"
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import arrow from "../assets/arrow.png"
import rightarrow from "../assets/right-arrow.png"
import leftarrow from "../assets/leftarrow.png"
import "react-datepicker/dist/react-datepicker.css"

export function FindFlight(){

    const navigate = useNavigate()
    const [ deltaPrices, setDeltaPrices ] = useState(null)
    const [ page, setPage ] = useState(0)


    const originRef = useRef(null)
    const destinationRef = useRef(null)
    const tripTypeRef = useRef(null)
    const deparetureDateRef = useRef(null)
    const lastDayRef = useRef(null)
    const numPassengersRef = useRef(null)



    // const monthDict = {
    //     1: "January",
    //     2: "February",
    //     3: "March",
    //     4: "April",
    //     5: "May",
    //     6: "June",
    //     7: "July",
    //     8: "August",
    //     9: "September",
    //     10: "October",
    //     11: "November",
    //     12: "December"
    // }

    const monthDict = {
        "Jan": "January",
        "Feb": "February",
        "Mar": "March",
        "Apr": "April",
        "May": "May",
        "Jun": "June",
        "Jul": "July",
        "Aug": "August",
        "Sep": "September",
        "Oct": "October",
        "Nov": "November",
        "Dec": "December"
    }


    function sendInfo(){
        let departureDateString = deparetureDateRef.current.toString()
        console.log(typeof departureDateString)
        const date = departureDateString.split(" ")
        console.log(date)
        const day = date[2]
        const month = monthDict[date[1]]
        const year = date[3]
        let returnDateString = lastDayRef.current.toString()
        const arrDate = returnDateString.split(" ")
        const arrday = arrDate[2]
        const arrmonth = monthDict[arrDate[1]]
        const arryear = arrDate[3]
        console.log("ArrDate", arrDate)
        fetch('http://localhost:3001/registeredinfo', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                origin: originRef.current.toUpperCase(),
                destination: destinationRef.current.toUpperCase(),
                trip_type: tripTypeRef.current,
                departure_date: [month, day, year],
                coming_back_date: [arrmonth, arrday, arryear],
                num_passengers: numPassengersRef.current
            })
        })
            .then(res => res.json())
            .then(data => setDeltaPrices(data) )
            .catch(err => console.log(err))
        
    }



    function changePage(){
        setPage((prev) => (prev) + 1)
    }

    function backPage(){
        setPage((prev) => (prev) - 1)
    }

    const handleDepartureDate = (date) => {
        deparetureDateRef.current = date
    }

    const handleReturndate = (date) => {
        lastDayRef.current = date
    }

    function changeWindow(){
        navigate("/findflight")
    }

    return(
        <>
            <div id="main-div">
                <div id="left-arrow">
                    <img onClick={backPage} src={leftarrow} />
                </div>
                <div id="right-arrow">
                    <img onClick={changePage} src={rightarrow} />
                </div>

                <nav id="navbar">
                <div id="navbar-div">
                    <div id='div1-delta'>
                    <li>Home</li>
                    </div>
                    <div id='div2-delta'>
                    <li>My Tickets</li>
                    </div>
                    <div id='div3-delta'>
                    <li onClick={() => changeWindow()}>Find Flight</li>
                    </div>
                </div>
                </nav>
                <div class="main-container" id={page===0 ? "overarching-container1" : page === 1 ? "overarching-container2" : "overarching-container3"} >
                    {page === 0 ? 
                        <>
                            <div class="info-arching-container1">
                                <div id="container1">
                                    <h1>From</h1>
                                    <h3>What is your origin?</h3>
                                    <input onChange={(e) => originRef.current = e.target.value} type='text' placeholder="ATL" maxLength={3} value={originRef.current}></input>
                                </div>
                                <div>
                                    <img id="arrow-img" src={arrow} />
                                </div>
                                <div id="container2">
                                    <h1>To</h1>
                                    <h3>What is your destination?</h3>
                                    <input value={destinationRef.current} onChange={(e) => destinationRef.current = e.target.value} type='text' placeholder="MIA" maxLength={3}></input>
                                </div>
                            </div>
                            <div class='button-container'>
                                <button onClick={changePage} class="next-button">Next</button>
                            </div>

                        </>
                    :  page === 1 ?
                        <div class='info-arching-container2'>
                            <div id="container3">
                                <h1>Type of Trip</h1>
                                <select id="typetrip-select" onChange={(e) => tripTypeRef.current = e.target.value} value={tripTypeRef.current}>
                                    <option value="">--Select Trip Type--</option>
                                    <option value="One Way">One Way</option>
                                    <option value="Round Trip">Round Trip</option>
                                    <option value="Multi Way">Multi Way</option>
                                </select>
                            </div>
                            <div class='button-container'>
                                <button onClick={changePage} class="next-button">Next</button>
                            </div>
                        </div>
                    : page === 2 ?
                        <>
                            <div class='info-arching-container2'>
                                <div id="dates-info-container">
                                    <div id='container4'>
                                        <h1 class="dateslabel">Departure Date</h1>
                                        <DatePicker
                                            selected={deparetureDateRef.current}
                                            onChange={handleDepartureDate}
                                            dateFormat="MM/dd/yyyy"
                                            shouldCloseOnSelect={false}
                                        />
                                    </div>
                                    <div id='container6'>
                                        <h1 class='dateslabel'>Return Date</h1>
                                        <DatePicker
                                            selected={lastDayRef.current}
                                            onChange={handleReturndate}
                                            dateFormat="MM/dd/yyyy"
                                            shouldCloseOnSelect={false}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button onClick={changePage} className="next-button">Next</button>
                                </div>
                            </div>
                        </>
                    : 
                        <>
                            <div class='info-arching-container2'>
                                <div id="container5">
                                    <h1>Number of Passengers</h1>
                                    <select value={numPassengersRef.current} onChange={(e) => numPassengersRef.current = e.target.value}>
                                        <option className="options" value="select-option"> --Select Number of Passengers--</option>
                                        <option className="options" value="1"> 1 Passenger </option>
                                        <option className="options" value="2"> 2 Passengers </option>
                                        <option className="options" value="3"> 3 Passengers </option>
                                        <option className="options" value="4"> 4 Passengers </option>
                                        <option className="options" value="5"> 5 Passengers </option>
                                        <option className="options" value="6"> 6 Passengers </option>
                                        <option className="options" value="7"> 7 Passengers </option>
                                        <option className="options" value="8"> 8 Passengers </option>
                                        <option className="options" value="9"> 9 Passengers </option>
                                    </select>
                                </div>
                                <div>
                                    <button className='next-button' onClick={sendInfo}>Submit</button>
                                </div>
                            </div>
                        </>
                    }
                    
                </div>
            </div>
        </>
    )
}
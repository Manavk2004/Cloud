import "./findflights.css"
import DatePicker from "react-datepicker"
import { useState, useEffect } from "react"

export function FindFlight(){

    const [ startDate, setStartDate ] = useState(null)
    const [ origin, setOrigin ] = useState(null)
    const [ destination, setDestination ] = useState(null)
    const [ tripType, setTripType ] = useState(null)
    const [ departureDate, setDepartureDate ] = useState(null)
    const [ lastDay, setLastDay ] = useState(null)
    const [ numPassengers, setNumPassengers] = useState(null)


    function sendInfo(){
        fetch('http://localhost:3001/registeredinfo', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Origin: origin,
                Destination: destination,
                TripType: tripType,
                DepartDate: departureDate,
                LasDay: lastDay,
                NumberPassengers: numPassengers
            })
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
        
    }

    useEffect(() =>{
        console.log(origin)
    }, [origin])

    useEffect(() =>{
        console.log(destination)
    }, [destination])

    useEffect(() =>{
        console.log(tripType)
    }, [tripType])

    useEffect(() =>{
        console.log(departureDate)
    }, [departureDate])

    useEffect(() =>{
        console.log(lastDay)
    }, [lastDay])

    useEffect(() =>{
        console.log(numPassengers)
    }, [numPassengers])

    return(
        <>
            <div id="main-div">
                <div id="container1">
                    <h1>Where are you coming from</h1>
                    <input onChange={(e) => setOrigin(e.target.value)} type='text' placeholder="ATL" maxlength={3}></input>
                </div>
                <div id="container2">
                    <h1>Where are you heading?</h1>
                    <input onChange={(e) => setDestination(e.target.value)} type='text' placeholder="MIA" maxlength={3}></input>
                </div>
                <div id="container3">
                    <h1>Type of Trip</h1>
                    <select onChange={(e) => setTripType(e.target.value)}>
                        <option value="">--Select and Option--</option>
                        <option value="One Way">One Way</option>
                        <option value="Round Trip">Round Trip</option>
                        <option value="Multi Way">Multi Way</option>
                    </select>
                </div>
                <div id='container4'>
                    <h1>Departure Date</h1>
                    <input onChange={(e) => setDepartureDate(e.target.value)} type='date'></input>
                </div>
                <div id='container6'>
                    <h1>Arrival Date</h1>
                    <input type='date' onChange={(e) => setLastDay(e.target.value)}></input>
                </div>
                <div id="container5">
                    <h1>Number of Passengers</h1>
                    <select onChange={(e) => setNumPassengers(e.target.value)}>
                        <option className="options" value="1"> 1 Passenger </option>
                        <option className="options" value="2"> 3 Passenger </option>
                        <option className="options" value="3"> 2 Passenger </option>
                        <option className="options" value="4"> 4 Passenger </option>
                        <option className="options" value="5"> 5 Passenger </option>
                        <option className="options" value="6"> 6 Passenger </option>
                        <option className="options" value="7"> 7 Passenger </option>
                        <option className="options" value="8"> 8 Passenger </option>
                        <option className="options" value="9"> 9 Passenger </option>
                    </select>
                </div>
                <div>
                    <button onClick={sendInfo}>Submit</button>
                </div>
            </div>
        </>
    )
}
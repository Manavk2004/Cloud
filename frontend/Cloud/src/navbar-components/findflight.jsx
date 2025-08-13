import "./findflights.css"
import DatePicker from "react-datepicker"
import { useState, useEffec } from "react"

export function FindFlight(){

    const [ startDate, setStartDate ] = useState(null)

    return(
        <>
            <div id="main-div">
                <div id="container1">
                    <h1>Where are you coming from</h1>
                    <input type='text' placeholder="ATL"></input>
                </div>
                <div id="container2">
                    <h1>Where are you heading?</h1>
                    <input type='text' placeholder="MIA"></input>
                </div>
                <div id="container3">
                    <h1>Type of Trip</h1>
                    <select>
                        <option value="">--Select and Option--</option>
                        <option value="One Way">One Way</option>
                        <option value="Round Trip">Round Trip</option>
                        <option value="Multi Way">Multi Way</option>
                    </select>
                </div>
                <div id='container4'>
                    <h1>Leave Date</h1>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="MM/dd/yyyy"
                        calendarClassName="big-calendar"
                        placeholderText="MM/dd/yyyy"
                        minDate={new Date()}
                        showPopperArrow={false}
                        className="hidden"
                        
                    />
                </div>
            </div>
        </>
    )
}
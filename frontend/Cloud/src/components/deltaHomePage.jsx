import "../App.css"
import delta from "../assets/delta.png"

export function DeltaPage(){
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
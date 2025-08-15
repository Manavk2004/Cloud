import unitedWing from "../assets/unitedWing.jpg"
import unitedPlane from "../assets/unitedPlane.jpg"
import unitedLogo from "../assets/unitedLogo.png"
import "./homepages.css"

export function UnitedPage(props){
    function changeWindow(){
        return window.location.href="/findflight"
    }

    return(
        <>
            <div id="main-background-united">
                <nav id="navbar">
                <div id="navbar-div">
                    <div id='div1-united'>
                    <li>Home</li>
                    </div>
                    <div id='div2-united'>
                    <li>My Tickets</li>
                    </div>
                    <div id='div3-united'>
                    <li onClick={ () => changeWindow()}>Find Flight</li>
                    </div>
                </div>
                </nav>
                <div id="left-side-main-background-united">
                </div>
                <div id="middle-section-united">
                <div id="image-container">
                    <img id="united-logo" src={unitedLogo} />
                </div>
                </div>
                <div id="right-side-main-background-united">
                </div>
            </div>
        </>
    )
}
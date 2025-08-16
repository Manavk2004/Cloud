import "./homepages.css"
import delta from "../assets/delta.png"
export function DeltaPage(){
    function changeWindow(){
        return window.location.href="/findflight"
    }

    return(
        <>
            <div id="main-background-delta">
                <nav id="navbar">
                <div id="navbar-div">
                    <div id='div1-delta'>
                    <li>Home</li>
                    </div>
                    <div id='div2-delta'>
                    <li>My Tickets</li>
                    </div>
                    <div id='div3-delta'>
                    <li onClick={ () => changeWindow()}>Find Flight</li>
                    </div>
                </div>
                </nav>
                <div id="left-side-main-background-delta">
                </div>
                <div id="middle-section-delta">
                <div id="image-container">
                    <img id="delta-logo" src={delta} />
                </div>
                </div>
                <div id="right-side-main-background-delta">
                </div>
            </div>
        </>
    )
}
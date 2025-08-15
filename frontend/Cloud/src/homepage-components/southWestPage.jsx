import southwestlogo from "../assets/southwestlogo.png"

export function SouthWestPage(props){
    function changeWindow(){
        props.isAnimated=false
        return window.location.href="/findflight"
    }

    return(
        <>
            <div id="main-background-southwest">
                <nav id="navbar">
                <div id="navbar-div">
                    <div id='div1-southwest'>
                    <li>Home</li>
                    </div>
                    <div id='div2-southwest'>
                    <li>My Tickets</li>
                    </div>
                    <div id='div3-southwest'>
                    <li onClick={ () => changeWindow()}>Find Flight</li>
                    </div>
                </div>
                </nav>
                <div id="left-side-main-background-southwest">
                </div>
                <div id="middle-section-southwest">
                <div id="image-container">
                    <img id="united-logo" src={southwestlogo} />
                </div>
                </div>
                <div id="right-side-main-background-southwest">
                </div>
            </div>
        </>
    )
}
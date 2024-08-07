import React from 'react'
import '../styles.css'

function Info() {
    return (
        <div className="info-menu">
            <div className="white title"> Info </div>

            <div className="white subtitle"> About </div>
            <div className="white text"> Replica game of the originial <a target="_blank" href="https://orteil.dashnet.org/cookieclicker/"> cookie clicker </a> created using React. </div>
            <div className="white text"> This was initially created as a fun project just to learn React over the summer. </div>
            <div className="text"> All of the source code can be found <a target="_blank" href="https://github.com/notjing/cookieclicker"> here </a> </div>

            <div className="white subtitle"> Version History </div>
            <div className="white text"> There is no point in having a version history but you can look through the <a target="_blank" href="https://github.com/notjing/cookieclicker/commits/master/"> commit history</a>.</div>

        </div>
    )
}

export default Info

import React from 'react'
import "../styles.css";

function BackgroundBuilding(props) {

    const {img, x, y} = props;

    return (
        <div className="background-building">
            <img src={img}></img>
        </div>
    )
}

export default BackgroundBuilding

import React from 'react'
import "../styles.css";

function BackgroundBuilding(props) {

    const {img, x, y} = props;

    const imgStyle = {
        transform: `translate(${x}px, ${y}px)`
    };

    return (
        <div className="background-building">
            {
                console.log(x)
            }
            <img src={img} style={imgStyle}/>
        </div>
    )
}

export default BackgroundBuilding

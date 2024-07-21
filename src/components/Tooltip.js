import React from 'react';
import ReactDOM from 'react-dom';
import '../tooltipStyles.css';

function remToPx(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}


function Tooltip({ x, y, width, children }) {
    const dividerWidth = remToPx(0.75)
    const toolTipWidth = remToPx(23);
    const tooltipStyle = {
        top: y - remToPx(9), // Adjust this value to position the tooltip below the element
        left: x - dividerWidth - toolTipWidth/2, // Center the tooltip horizontally
    };

    return ReactDOM.createPortal(
        <div className="tooltiptext" style={tooltipStyle} >
            {children}
        </div>,
        document.body
    );
}

export default Tooltip;

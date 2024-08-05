import { React, Component, useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import '../tooltipStyles.css';

function remToPx(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function Tooltip({ x, y, width, children })  {
  const[height, changeHeight] = useState(0);
  const tooltipRef = useRef(null);
  const toolTipWidth = remToPx(23);
  const dividerWidth = remToPx(0.75)
  const tooltipStyle = {    
      top: y + height - remToPx(3) > window.innerHeight ? window.innerHeight - height : y - remToPx(3), 
      left: x - dividerWidth - toolTipWidth / 2,
  };

  useEffect(() => {
    if (tooltipRef.current) {
      changeHeight(tooltipRef.current.getBoundingClientRect().height);
      //console.log('Tooltip height:', height);
      console.log('idk what to name this:', y + height);
    }
  }, [children, x, y, width]);

  return ReactDOM.createPortal(
    <div className="tooltiptext" ref={tooltipRef} style={tooltipStyle} >
        {children}
    </div>,
    document.body
);
};

export default Tooltip;


import React, { Component } from 'react';
import Tooltip from './Tooltip';
import "../upgradeStyles.css"
import cookieImage from '../images/cookie.png';
import frame from "../images/upgradeFrame.png"

class Upgrade extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
      imageRef: React.createRef(),
      x: 0,
      y: 0
    };
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseOver = () => {
    this.setState({ hovered: true });
  };

  handleMouseOut = () => {
    this.setState({ hovered: false });
  };

  handleMouseMove = (e) => {
    this.setState({x: e.screenX, y: e.screenY});
  }

  handleClick = () => {
    if(this.props.cookies >= this.props.price) this.props.onClick(this.props.id);
  }

  render() {
    const { id, name, desc, price, unlocked, bought, req, img, quote, borderlessImg, cookies } = this.props;
    const { hovered } = this.state;
    return (
      <div>
        <div className="tooltip">
          <div className= {"mainImage " + (cookies >= price ? "bright" : "")} >
            <img  onMouseEnter={this.handleMouseOver} onMouseOut={this.handleMouseOut} onMouseMove={this.handleMouseMove} className="frame" src={frame}></img>
            <img 
              className="upgrade-image"
              id = {id}
              onMouseMove={this.handleMouseMove}
              ref = {this.state.imageRef}
              src={img} 
              alt={name}
              onMouseEnter={this.handleMouseOver}
              onMouseOut={this.handleMouseOut}
              onClick={this.handleClick}
            />
          </div>

          {hovered && (
            <Tooltip x={this.props.left} y={this.state.y} width={this.state.imageRef.current.getBoundingClientRect().width}>
              <div className="upgradeTooltip">
                <div className="top">
                  <img src={img}></img>
                  <h4>{name}</h4>
                  <p className="price"> 
                    <img src={cookieImage}></img>
                     {price}
                  </p>
                </div>
                
                <div className="mid">
                  <p className="description">{desc}</p>
                  <p className="quote">"{quote}"</p>
                </div>
               
              </div>
              
             </Tooltip>
          )}  
          
        </div>

        
      </div>
    );
  }
}

export default Upgrade;

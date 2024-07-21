import React, { Component } from 'react';
import {useRef} from "react"
import ReactDOM from 'react-dom';
import '../buildingStyles.css';
import '../styles.css';
import { SHOP_OPTIONS, BASE_CPS, COOKIES_BAKED, MULTIPLIER, BUILDINGS } from '../App.js';
import Tooltip from './Tooltip.js';
import cookieImage from '../images/cookie.png';

class Building extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
      buttonRef: React.createRef(),
      x: 0,
      y: 0
    };
    this.handleChangeCookies = this.handleChangeCookies.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseEnter() {
    this.setState({ hovered: true });
  }

  handleMouseLeave() {
    this.setState({ hovered: false });
  }

  handleMouseMove(e){
    this.setState({x: e.screenX, y: e.screenY});
  }

  handleChangeCookies() {
    const { name, totalCookies, changeCookies, price, bulkSelected, operation, calculateSellPrice } = this.props;
    switch (operation) {
      case SHOP_OPTIONS.BUY:
        if (totalCookies >= price * (1 - 1.15 ** bulkSelected) / (1 - 1.15)) {
          changeCookies(totalCookies - price * (1 - 1.15 ** bulkSelected) / (1 - 1.15));
        }
        break;
      case SHOP_OPTIONS.SELL:
        changeCookies(totalCookies + calculateSellPrice(name));
        break;
      default:
        break;
    }
  }

  render() {
    
    const { name, price, amt, dispatch, operation, quote, img, tooltipImg, cps } = this.props;
    const buildingName = name[0].toUpperCase()+name.toLowerCase().substring(1);
    const buildingCps = BASE_CPS[buildingName] * amt * MULTIPLIER[buildingName];
    return (
      <div className="building">
          <button
            ref = {this.state.buttonRef}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            onMouseMove={this.handleMouseMove}
            onClick={() => {
              dispatch({
                building: name,
                operation,
                bulkSelected: this.props.bulkSelected,
                totalCookies: this.props.totalCookies,
                changeTotalCookies: this.props.changeCookies,
              });
              this.handleChangeCookies();
            }}
          >
            <div className="button-contents">
              <img src={img}></img>
              <div className="col-left">
                <div className="name bold-white">{name} </div>
                <br />
                <img className="cookie-symbol" src={cookieImage}></img>
                {price}
              </div>
              <div className="col-right">{amt}</div>
            </div>
            
          </button>

          {this.state.hovered &&
            <Tooltip x={this.state.buttonRef.current.getBoundingClientRect().x} y={this.state.y} width={this.state.buttonRef.current.getBoundingClientRect().width}>
               <div className="buildingTooltip">
                <div className="top">
                  <img src={tooltipImg}></img>
                  <h4>{name}</h4>
                  <p className="price"> 
                    <img src={cookieImage}></img>
                     {price}
                  </p>
                </div>
                
                <div className="mid">
                  <p className="quote">"{quote}"</p>
                </div>

                {
                  amt > 0 && 
                  <div className="bot">
                    <ul>
                      <li> each {name.toLowerCase()} produces <div className="bold-white"> {BASE_CPS[buildingName] * MULTIPLIER[buildingName]} cookies </div> per second </li>
                      <li> {amt} {name.toLowerCase()} producing <div className="bold-white">{buildingCps} cookies </div> per second (<div className="bold-white">{buildingCps*100/cps}%</div> of cps)</li>
                      <li> <div className="bold-white">{Math.round(COOKIES_BAKED[buildingName])}</div> cookies baked so far </li>
                    </ul>
                  </div> 
                }
               
              </div>
            </Tooltip>
          }
      </div>
    );
  }
}

export default Building;

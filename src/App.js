import React, { useState, useReducer, useEffect, useRef } from "react";
import './App.css';
import "./styles.css?v=1.0";
import cookieImage from './images/cookie.png';
import poleImage from './images/woodenseperator.png';
import horizontalPoleImage from "./images/woodenseperatorhorizontal.png"
import menuTopImage from "./images/menuTop.png"
import menuBottomImage from "./images/menuBottom.png"
import icons from "./images/icons.png"
import shine from "./images/shine.png"
import Building from "./components/Building";
import Upgrade from "./components/Upgrade";
import Info from "./components/Info";
import NumberAbbreviator from "./components/NumberAbbreviator";

export const BUILDINGS = {
  CURSOR: "Cursor",
  GRANDMA: "Grandma",
  FARM: "Farm",
  MINE: "Mine",
  FACTORY: "Factory",
  BANK: "Bank",
  TEMPLE: "Temple",
  WIZARD: "Wizard",
  SHIPMENT: "Shipment",
  ALCHEMY: "Alchemy",
  PORTAL: "Portal",
  TIME: "Time",
  ANTIMATTER: "Antimatter",
  PRISM: "Prism",
  CHANCE: "Chance",
  FRACTAL: "Fractal",
  JAVASCRIPT: "Javascript",
  IDLE: "Idle",
  CORTEX: "Cortex",
  YOU: "You"
};

const BUILDINGS_INDEX = {
  [BUILDINGS.CURSOR]: 0,
  [BUILDINGS.GRANDMA]: 1,
  [BUILDINGS.FARM]: 2,
  [BUILDINGS.MINE]: 3,
  [BUILDINGS.FACTORY]: 4,
  [BUILDINGS.BANK]: 5,
  [BUILDINGS.TEMPLE]: 6,
  [BUILDINGS.WIZARD]: 7,
  [BUILDINGS.SHIPMENT]: 8,
  [BUILDINGS.ALCHEMY]: 9,
  [BUILDINGS.PORTAL]: 10,
  [BUILDINGS.TIME]: 11,
  [BUILDINGS.ANTIMATTER]: 12,
  [BUILDINGS.PRISM]: 13,
  [BUILDINGS.CHANCE]: 14,
  [BUILDINGS.FRACTAL]: 15,
  [BUILDINGS.JAVASCRIPT]: 16,
  [BUILDINGS.IDLE]: 17,
  [BUILDINGS.CORTEX]: 18,
  [BUILDINGS.YOU]: 19
}

export const BASE_PRICE = {
  [BUILDINGS.CURSOR]: 1.5e1,
  [BUILDINGS.GRANDMA]: 1e2,
  [BUILDINGS.FARM]: 1.1e3,
  [BUILDINGS.MINE]: 1.2e4,
  [BUILDINGS.FACTORY]: 1.3e5,
  [BUILDINGS.BANK]: 1.4e6,
  [BUILDINGS.TEMPLE]: 2e7,
  [BUILDINGS.WIZARD]: 3.3e8,
  [BUILDINGS.SHIPMENT]: 5.1e9,
  [BUILDINGS.ALCHEMY]: 7.5e10,
  [BUILDINGS.PORTAL]: 1e12,
  [BUILDINGS.TIME]: 1.4e13,
  [BUILDINGS.ANTIMATTER]: 1.7e14,
  [BUILDINGS.PRISM]: 2.1e15,
  [BUILDINGS.CHANCE]: 2.6e16,
  [BUILDINGS.FRACTAL]: 3.1e17,
  [BUILDINGS.JAVASCRIPT]: 7.1e19,
  [BUILDINGS.IDLE]: 1.2e21,
  [BUILDINGS.CORTEX]: 1.9e23,
  [BUILDINGS.YOU]: 5.4e25
};

export const BASE_CPS = {
  [BUILDINGS.CURSOR]: 0.1,
  [BUILDINGS.GRANDMA]: 1,
  [BUILDINGS.FARM]: 8,
  [BUILDINGS.MINE]: 4.7e1,
  [BUILDINGS.FACTORY]: 2.62,
  [BUILDINGS.BANK]: 1.4e3,
  [BUILDINGS.TEMPLE]: 7.8e3,
  [BUILDINGS.WIZARD]: 4.4e4,
  [BUILDINGS.SHIPMENT]: 2.6e5,
  [BUILDINGS.ALCHEMY]: 1.6e6,
  [BUILDINGS.PORTAL]: 1e7,
  [BUILDINGS.TIME]: 6.5e7,
  [BUILDINGS.ANTIMATTER]: 4.3e8,
  [BUILDINGS.PRISM]: 2.9e9,
  [BUILDINGS.CHANCE]: 2.1e10,
  [BUILDINGS.FRACTAL]: 1.5e11,
  [BUILDINGS.JAVASCRIPT]: 1.1e12,
  [BUILDINGS.IDLE]: 8.3e12,
  [BUILDINGS.CORTEX]: 6.4e13,
  [BUILDINGS.YOU]: 5.1e14
};

export const COOKIES_BAKED = {
  [BUILDINGS.CURSOR]: 0,
  [BUILDINGS.GRANDMA]: 0,
  [BUILDINGS.FARM]: 0,
  [BUILDINGS.MINE]: 0,
  [BUILDINGS.FACTORY]: 0,
  [BUILDINGS.BANK]: 0,
  [BUILDINGS.TEMPLE]: 0,
  [BUILDINGS.WIZARD]: 0,
  [BUILDINGS.SHIPMENT]: 0,
  [BUILDINGS.ALCHEMY]: 0,
  [BUILDINGS.PORTAL]: 0,
  [BUILDINGS.TIME]: 0,
  [BUILDINGS.ANTIMATTER]: 0,
  [BUILDINGS.PRISM]: 0,
  [BUILDINGS.CHANCE]: 0,
  [BUILDINGS.FRACTAL]: 0,
  [BUILDINGS.JAVASCRIPT]: 0,
  [BUILDINGS.IDLE]: 0,
  [BUILDINGS.CORTEX]: 0,
  [BUILDINGS.YOU]: 0
};

export const MULTIPLIER = {
  [BUILDINGS.CURSOR]: 1,
  [BUILDINGS.GRANDMA]: 1,
  [BUILDINGS.FARM]: 1,
  [BUILDINGS.MINE]: 1,
  [BUILDINGS.FACTORY]: 1,
  [BUILDINGS.BANK]: 1,
  [BUILDINGS.TEMPLE]: 1,
  [BUILDINGS.WIZARD]: 1,
  [BUILDINGS.SHIPMENT]: 1,
  [BUILDINGS.ALCHEMY]: 1,
  [BUILDINGS.PORTAL]: 1,
  [BUILDINGS.TIME]: 1,
  [BUILDINGS.ANTIMATTER]: 1,
  [BUILDINGS.PRISM]: 1,
  [BUILDINGS.CHANCE]: 1,
  [BUILDINGS.FRACTAL]: 1,
  [BUILDINGS.JAVASCRIPT]: 1,
  [BUILDINGS.IDLE]: 1,
  [BUILDINGS.CORTEX]: 1,
  [BUILDINGS.YOU]: 1
};

export const SHOP_OPTIONS = {
  BUY: "Buy",
  SELL: "Sell",
  ONE: 1,
  TEN: 10,
  ONE_HUNDRED: 100
};

function buildingReducer(state, { building, operation, bulkSelected, totalCookies, changeTotalCookies }) {
  switch (operation) {
    case SHOP_OPTIONS.BUY:
      if (totalCookies >= state.prices[BUILDINGS_INDEX[building]] * (1 - 1.15 ** bulkSelected) / (1 - 1.15)) {
        changeTotalCookies(totalCookies - state.prices[BUILDINGS_INDEX[building]] * (1 - 1.15 ** bulkSelected) / (1 - 1.15));
        return {
          ...state,
          amts: state.amts.map((amt, index) =>
            index === BUILDINGS_INDEX[building]
              ? amt + bulkSelected 
              : amt
          ),
          prices: state.prices.map((price, index) =>
            index === BUILDINGS_INDEX[building]
              ? Math.ceil(BASE_PRICE[building] * 1.15 ** (state.amts[BUILDINGS_INDEX[building]] + bulkSelected)) 
              : price
          )
        };
      }
      return state;
    case SHOP_OPTIONS.SELL:
      return {
        ...state,
        amts: state.amts.map((amt, index) =>
          index === BUILDINGS_INDEX[building]
            ? Math.max(state.amts[BUILDINGS_INDEX[building]] - bulkSelected, 0)
            : amt
        ),
        prices: state.prices.map((price, index) =>
          index === BUILDINGS_INDEX[building]
            ? Math.ceil(BASE_PRICE[building] * 1.15 ** (Math.max(state.amts[BUILDINGS_INDEX[building]] - bulkSelected, 0))) 
            : price
        )
      };
    default:
      return state;
  }
}


function findImage(image, row, col) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const above = row - 1, left = col - 1;
      const startX = left * 48;
      const startY = above * 48;
      const squareSize = 48;

      const croppedCanvas = document.createElement('canvas');
      const croppedCtx = croppedCanvas.getContext('2d');
      croppedCanvas.width = squareSize;
      croppedCanvas.height = squareSize;
      croppedCtx.drawImage(img, startX, startY, squareSize, squareSize, 0, 0, squareSize, squareSize);

      resolve(croppedCanvas.toDataURL());
    };
    img.onerror = reject; // Handle image load errors
  });

}


const buildingImages = require.context('./images/buildings', false);
const buildingImagesList = buildingImages.keys().map(image => buildingImages(image));

const buildingBackgroundImages = require.context('./images/buildingBackgrounds', false);
const buildingBackgroundImagesList = buildingBackgroundImages.keys().map(image => buildingBackgroundImages(image));

const milkImages = require.context('./images/milk', false);
const milkImagesList = milkImages.keys().map(image => milkImages(image));

export const upgrades = [
  {
    id: 0, name: "Reinforced index finger", desc: "The mouse and cursors are twice as efficient.", quote: "prod prod", price: 100, unlocked: 0, bought: 0, req: { "building": [[BUILDINGS.CURSOR, 1]] }, img: await findImage(icons, 1, 1), afford: false
  },
  {
    id: 1, name: "Carpal tunnel prevention cream", desc: "The mouse and cursors are twice as efficient.", quote: "it... it hurts to click...", price: 500, unlocked: 0, bought: 0, req: { "building": [[BUILDINGS.CURSOR, 1]] }, img: await findImage(icons, 2, 1), afford: false
  },
  {
    id: 2, name: "Ambidextrous", desc: "The mouse and cursors are twice as efficient.", quote: "Look ma, both hands!", price: 10000, unlocked: 0, bought: 0, req: { "building": [[BUILDINGS.CURSOR, 10]] }, img: await findImage(icons, 3, 1), afford: false
  },
  {
    id: 3, name: "Thousand fingers", desc: "The mouse and cursors gain +0.1 cookies for each non-cursor object owned.", quote: "clickity", price: 1e5, unlocked: 0, bought: 0, req: { "building": [[BUILDINGS.CURSOR, 25]] }, img: await findImage(icons, 14, 1), afford: false
  },
  {
    id: 4, name: "Million fingers", desc: "Multiplies the gain from Thousand fingers by 5.", quote: "clickityclickity", price: 1e7, unlocked: 0, bought: 0, req: { "building": [[BUILDINGS.CURSOR, 50]] }, img: await findImage(icons, 15, 1), afford: false
  },
  {
    id: 5, name: "Billion fingers", desc: "Multiplies the gain from Thousand fingers by 10.", quote: "clickityclickityclickity", price: 1e8, unlocked: 0, bought: 0, req: { "building": [[BUILDINGS.CURSOR, 100]] }, img: await findImage(icons, 16, 1), afford: false
  },
  {
    id: 6, name: "Trillion fingers", desc: "Multiplies the gain from Thousand fingers by 20.", quote: "clickityclickityclickityclickity", price: 1e9, unlocked: 0, bought: 0, req: { "building": [[BUILDINGS.CURSOR, 150]] }, img: await findImage(icons, 17, 1), afford: false
  },
  {
    id: 7, name: "Quadrillion fingers", desc: "Multiplies the gain from Thousand fingers by 20.", quote: "clickityclickityclickityclickityclick", price: 1e10, unlocked: 0, bought: 0, req: { "building": [[BUILDINGS.CURSOR, 200]] }, img: await findImage(icons, 18, 1), afford: false
  },
  {
    id: 8, name: "Quintillion fingers", desc: "Multiplies the gain from Thousand fingers by 20.", quote: "man, just go click click click click click, it’s real easy, man.", price: 1e13, unlocked: 0, bought: 0, req: { "building": [[BUILDINGS.CURSOR, 250]] }, img: await findImage(icons, 19, 1), afford: false
  },
  {
    id: 9, name: "Sextillion fingers", desc: "Multiplies the gain from Thousand fingers by 20.", quote: "sometimes things just click", price: 1e16, unlocked: 0, bought: 0, req: { "building": [[BUILDINGS.CURSOR, 300]] }, img: await findImage(icons, 20, 1), afford: false
  },
  {
    id: 10, name: "Septillion fingers", desc: "Multiplies the gain from Thousand fingers by 20.", quote: "[cursory flavor text]", price: 1e19, unlocked: 0, bought: 0, req: { "building": [[BUILDINGS.CURSOR, 350]] }, img: await findImage(icons, 29, 1), afford: false
  },
  {
    id: 11, name: "Octillion fingers", desc: "Multiplies the gain from Thousand fingers by 20.", quote: "Turns out you can quite put your finger on it.", price: 1e22, unlocked: 0, bought: 0, req: { "building": [[BUILDINGS.CURSOR, 400]] }, img: await findImage(icons, 31, 1), afford: false
  },
  {
    id: 12, name: "Nonillion fingers", desc: "Multiplies the gain from Thousand fingers by 20.", quote: "Only for the freakiest handshakes.", price: 1e25, unlocked: 0, bought: 0, req: { "building": [[BUILDINGS.CURSOR, 450]] }, img: await findImage(icons, 32, 1), afford: false
  },
  {
    id: 13, name: "Decillion fingers", desc: "Multiplies the gain from Thousand fingers by 20.", quote: "Only for the freakiest handshakes.", price: 1e28, unlocked: 0, bought: 0, req: { "building": [[BUILDINGS.CURSOR, 500]] }, img: await findImage(icons, 35, 1), afford: false
  },
  {
    id: 14, name: "Undecillion fingers", desc: "Multiplies the gain from Thousand fingers by 20.", quote: "Only for the freakiest handshakes.", price: 1e31, unlocked: 0, bought: 0, req: { "building": [[BUILDINGS.CURSOR, 550]] }, img: await findImage(icons, 37, 1), afford: false
  },


];



function App() {
  const [username, changeUsername] = useState("Default Username");
  const [perClick, changePerClick] = useState(1);
  const [totalCookies, changeTotalCookies] = useState(1e50);
  const [primarySelected, changePrimarySelected] = useState(SHOP_OPTIONS.BUY);
  const [bulkSelected, changeBulkSelected] = useState(SHOP_OPTIONS.ONE);
  const [numAchievements, changeNumAchievements] = useState(0);
  const [numUpgrades, changeNumUpgrades] = useState(0);
  const [unlockedUpgrades, changeUnlockedUpgrades] = useState(0);
  const [currentNews, changeCurrentNews] = useState("News message #0");
  const [incomingNews, changeIncomingNews] = useState("News message #-1");
  const [updateNews, changeUpdateNews] = useState(false);
  const [renderAllUpgrades, changeRenderAllUpgrades] = useState(false);
  const [tooltipImages, changeTooltipImages] = useState([]);

  const [menuHovered, changeMenuHovered] = useState(0); 
  const [menuSelected, changeMenuSelected] = useState("main")
  
  const [{ prices, amts }, buildingDispatch] = useReducer(buildingReducer, {
    prices: [
      BASE_PRICE[BUILDINGS.CURSOR],
      BASE_PRICE[BUILDINGS.GRANDMA],
      BASE_PRICE[BUILDINGS.FARM],
      BASE_PRICE[BUILDINGS.MINE],
      BASE_PRICE[BUILDINGS.FACTORY],
      BASE_PRICE[BUILDINGS.BANK],
      BASE_PRICE[BUILDINGS.TEMPLE],
      BASE_PRICE[BUILDINGS.WIZARD],
      BASE_PRICE[BUILDINGS.SHIPMENT],
      BASE_PRICE[BUILDINGS.ALCHEMY],
      BASE_PRICE[BUILDINGS.PORTAL],
      BASE_PRICE[BUILDINGS.TIME],
      BASE_PRICE[BUILDINGS.ANTIMATTER],
      BASE_PRICE[BUILDINGS.PRISM],
      BASE_PRICE[BUILDINGS.CHANCE],
      BASE_PRICE[BUILDINGS.FRACTAL],
      BASE_PRICE[BUILDINGS.JAVASCRIPT],
      BASE_PRICE[BUILDINGS.IDLE],
      BASE_PRICE[BUILDINGS.CORTEX],
      BASE_PRICE[BUILDINGS.YOU],
    ],

    amts: [
      0 ,
      0 ,
      0 ,
      0 ,
      0 ,
      0 ,
      0 ,
      0 ,
      0 ,
      0 ,
      0 ,
      0 ,
      0 ,
      0 ,
      0 ,
      0 ,
      0 ,
      0 ,
      0 ,
      0 ,
    ]
  });

  const activeTextRef = useRef(null);
  const incomingTextRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    const element = activeTextRef.current;
    const element2 = incomingTextRef.current;
    let animationHandled = false;

    if (element) {
      const handleAnimationStart = () => {
        changeUpdateNews(!updateNews);
      };

      const handleAnimationEnd = (event) => {
        if (!animationHandled && event.animationName === 'fadeIn') {
          animationHandled = true;

          element.style.animation = "invis 10s infinite";
          element2.style.animation = "invis 10s infinite";

          setTimeout(() => {
            element.style.animation = "fadeIn 10s linear 1 reverse, slide-vertical 10s linear 1 forwards";
            element2.style.animation = "fadeInSlow 10s linear 1 forwards, slide-vertical 10s linear 1 forwards";
            animationHandled = false;
          }, 0);
        }
      };

      // Add event listeners
      element.addEventListener('animationstart', handleAnimationStart);
      element.addEventListener('animationend', handleAnimationEnd);

      // Cleanup function to remove event listeners
      return () => {
        if (element) {
          element.removeEventListener('animationstart', handleAnimationStart);
          element.removeEventListener('animationend', handleAnimationEnd);
        }
      };
    }
  }, [updateNews]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      changeTotalCookies(prevTotalCookies => prevTotalCookies + totalCps() / 60);
      for(const building in BUILDINGS){
        COOKIES_BAKED[BUILDINGS[building]] += BASE_CPS[BUILDINGS[building]] * amts[BUILDINGS_INDEX[BUILDINGS[building]]] * MULTIPLIER[BUILDINGS[building]] / 60;
      }
    
    }, 1000 / 60);
    return () => clearInterval(intervalId);
  }, [totalCps()]);

  useEffect(() => {
    changeCurrentNews(incomingNews);
    generateNews();
  }, [updateNews]);

  useEffect(() => {
    for (let i = 0; i < upgrades.length; i++) {
      if (!upgrades[i].bought && !upgrades[i].unlocked && checkRequirements(upgrades[i].req)){
        upgrades[i].unlocked = true
        changeUnlockedUpgrades(unlockedUpgrades + 1)
        console.log("Upgrade Unlocked")
      } 
    }
  }, [totalCookies, amts])

  useEffect(() => {
    for (var i = 0; i < upgrades.length; i++) {
      if (upgrades[i].price <= totalCookies) upgrades[i].afford = true;
    }
  }, [totalCookies])

  useEffect(() => {
    async function loadImage() {
      changeTooltipImages([await findImage(icons, 1, 1), await findImage(icons, 1, 2), await findImage(icons, 1, 3), await findImage(icons, 1, 4), await findImage(icons, 1, 5), 
        await findImage(icons, 1, 16), await findImage(icons, 1, 17), await findImage(icons, 1, 18), await findImage(icons, 1, 6), await findImage(icons, 1, 7), await findImage(icons, 1, 8), 
        await findImage(icons, 1, 9), await findImage(icons, 1, 14), await findImage(icons, 1, 15), await findImage(icons, 1, 20), await findImage(icons, 1, 21), await findImage(icons, 1, 33), 
         await findImage(icons, 1, 34), await findImage(icons, 1, 35), await findImage(icons, 1, 36)])
    }
    loadImage();
  }, []);

  function totalCps() {
    let ret = 0
    for(const building in BUILDINGS){
      const name = BUILDINGS[building];
      ret += amts[BUILDINGS_INDEX[name]] * MULTIPLIER[name] * BASE_CPS[name]
    }
    return ret;
  }

  function usernamePrompt() {
    const newUsername = window.prompt("What is your new username?", username);
    if (newUsername != null) changeUsername(newUsername);
  }

  function cookieClicked() {
    changeTotalCookies(totalCookies + perClick);
  }

  function handleUpgradeEnter() {
    changeRenderAllUpgrades(true);
  }

  function handleUpgradeLeave() {
    changeRenderAllUpgrades(false);
  }

  function handlePrimaryOptionChange(option) {
    changePrimarySelected(option);
  }

  function handleBulkOptionChange(option) {
    changeBulkSelected(option);
  }

  function calculateSellPrice(building) {
        if (amts[BUILDINGS_INDEX[building]] < bulkSelected) return BASE_PRICE[building] * (1 - (1.15 ** amts[BUILDINGS_INDEX[building]])) / (1 - 1.15) * 0.25;
        else return BASE_PRICE[building] * (1.15 ** (amts[BUILDINGS_INDEX[building]] - bulkSelected)) * (1 - (1.15 ** bulkSelected)) / (1 - 1.15) * 0.25;
    
  }

  function handleMenuClicked(menu){
    if(menu == menuSelected) changeMenuSelected("main")
    else{
      changeMenuSelected(menu)
    }
  }

  function implementUpgrades(id) {
    upgrades[id].bought = true;
    changeNumUpgrades(numUpgrades + 1)
    switch (id) {
      case 0: case 1:
        MULTIPLIER[BUILDINGS.CURSOR] *= 2; break;
      
    }
    
  }

  function sortByPrice(a,b){
    return a.price < b.price;
  }

  function renderUpgrades() {
    var ret = [];
    let show = renderAllUpgrades ? upgrades.length : 5;
    let shown = 0;
    for (let i = 0; i < upgrades.length; i++) {
      if (upgrades[i].unlocked && !upgrades[i].bought) {
        ret.push(
          <Upgrade id={upgrades[i].id} name={upgrades[i].name} desc={upgrades[i].desc} quote={upgrades[i].quote} price={upgrades[i].price} req={upgrades[i].req} img={upgrades[i].img}
            borderlessImg={upgrades[i].borderlessImg} afford={upgrades[i].afford} cookies={totalCookies} onClick={implementUpgrades}
            left={rightColRef.current ? rightColRef.current.getBoundingClientRect().left : null}></Upgrade>
        )
        shown++;
      }
      if (shown >= show) break;
    }
    ret.sort(sortByPrice)
    return ret
  }

  function renderBackgrounds(){
    let ret = []
    for(let i = 1; i <= buildingBackgroundImagesList.length; i++){
      if(amts[i] > 0){
        ret.push(
          <>
            <div className="building-background">
              <img src = {buildingBackgroundImagesList[i-1]} /> 
              <img src = {buildingBackgroundImagesList[i-1]} /> 
              <img src = {buildingBackgroundImagesList[i-1]} /> 
              <img src = {buildingBackgroundImagesList[i-1]} /> 
              <img src = {buildingBackgroundImagesList[i-1]} /> 
              <img src = {buildingBackgroundImagesList[i-1]} /> 
            </div>

            <div className="divider-three">
              <img src={horizontalPoleImage}></img>
            </div>
          </>
        
        );
      } 
    }
    return ret;
  }

  function generateNews() {
    changeIncomingNews(prev => `News message #${parseInt(prev.split('#')[1]) + 1}`);
  }

  function checkRequirements(req) {
    if (req["building"]) {
      for (var [building, amt] of req["building"]) {
        if (amt > amts[BUILDINGS_INDEX[building]]) return false;
      }
    }
    if (req["cookies"]) {
      if (totalCookies < req["cookies"]) return false;
    }
    console.log("requirements met")
    return true
  }


  return (
    <div className="layout">
      <div className="left-col">
        <div className="username">
          <button onClick={usernamePrompt}>{username}'s bakery</button>
        </div>

        <div>
          <div className="cookie-count"> <h1> {NumberAbbreviator(totalCookies)} cookies</h1> </div>
          <div className="cookie-rate">per second: {NumberAbbreviator(Math.round(totalCps() * 10) / 10)}</div>
        </div>

        <div className="main-cookie">
        <img className="shine2" src={shine}></img>
          <img className="shine" src={shine}></img>
          <img onClick={cookieClicked} src={cookieImage} alt="cookie" />
        </div>

        <div className="milk">
          <img src={milkImagesList[numAchievements / 25]}></img>

        </div>

      </div>

      <div className="divider-one">
        <img src={poleImage} alt="divider" />
      </div>

      <div className="mid-col">
        <div className="menu">
          <div className="left-menu">
          <img src={menuTopImage} className = {menuHovered === 1 ? "bright" : ""}></img>
          <img src={menuBottomImage} className = {menuHovered === 2 ? "bright" : ""}></img>
            <button className={"options menu-button" + (menuHovered === 1 ? " bright" : "")} onMouseEnter={() => changeMenuHovered(1)} onMouseLeave={() => changeMenuHovered(0)}> Options </button>
            <button className={"stats menu-button" + (menuHovered === 2 ? " bright" : "")} onMouseEnter={() => changeMenuHovered(2)} onMouseLeave={() => changeMenuHovered(0)}> Stats </button>
          </div>

          <div className="mid-menu">
            <h3 className="active-text" ref={activeTextRef}> {currentNews} </h3>
            <h3 className="incoming-text" ref={incomingTextRef}> {incomingNews} </h3>

          </div>

          <div className="right-menu">
            <img className= {"y-reflect" + (menuHovered === 3 || menuSelected === "info" ? " bright" : "")} src={menuTopImage}></img>
            <img className= {"y-reflect" + (menuHovered === 4 ? " bright" : "")} src={menuBottomImage}></img>
            <button className={"info menu-button" + (menuHovered === 3 || menuSelected === "info" ? " bright" : "")} onMouseEnter={() => changeMenuHovered(3)} onMouseLeave={() => changeMenuHovered(0)} onClick={() => handleMenuClicked("info")}> Info </button>
            <button className={"legacy menu-button" + (menuHovered === 4 ? " bright" : "")} onMouseEnter={() => changeMenuHovered(4)} onMouseLeave={() => changeMenuHovered(0)}> Legacy </button>
          </div>
        </div>

        <div className="divider-three">
          <img src={horizontalPoleImage}></img>
        </div>

        {
          menuSelected === "main"?
          <div className="building-backgrounds">
            {renderBackgrounds()}
          </div>
          :
          menuSelected === "info"?
          <Info></Info>
          : null
        }
        

      </div>


      <div className="divider-two">
        <img src={poleImage} alt="divider" />
      </div>

      <div ref={rightColRef} className="right-col">

        <h1 className="white">Store</h1>

        <div className="divider-three">
          <img src={horizontalPoleImage} alt="divider" />
        </div>

        <div onMouseEnter={() => { handleUpgradeEnter() }} onMouseLeave={() => { handleUpgradeLeave() }} className="upgrade-menu">
          {renderUpgrades()}
        </div>


        <div className="divider-three">
          <img src={horizontalPoleImage} alt="divider" />
        </div>


        <div className="shop-options">
          <div className="primary-options">
            <button className={primarySelected === SHOP_OPTIONS.BUY ? "highlight-button" : ""} onClick={() => handlePrimaryOptionChange(SHOP_OPTIONS.BUY)}> Buy </button>
            <button className={primarySelected === SHOP_OPTIONS.SELL ? "highlight-button" : ""} onClick={() => handlePrimaryOptionChange(SHOP_OPTIONS.SELL)}> Sell </button>
          </div>
          <button className={bulkSelected === SHOP_OPTIONS.ONE ? "highlight-button" : ""} onClick={() => handleBulkOptionChange(SHOP_OPTIONS.ONE)}> 1 </button>
          <button className={bulkSelected === SHOP_OPTIONS.TEN ? "highlight-button" : ""} onClick={() => handleBulkOptionChange(SHOP_OPTIONS.TEN)}> 10 </button>
          <button className={bulkSelected === SHOP_OPTIONS.ONE_HUNDRED ? "highlight-button" : ""} onClick={() => handleBulkOptionChange(SHOP_OPTIONS.ONE_HUNDRED)}> 100 </button>
        </div>

        <div className="shop-buildings">
          <Building
            dispatch={buildingDispatch} name={BUILDINGS.CURSOR} price={Math.ceil(primarySelected === SHOP_OPTIONS.BUY ? prices[BUILDINGS_INDEX[BUILDINGS.CURSOR]] * (1 - 1.15 ** bulkSelected) / (1 - 1.15) : calculateSellPrice(BUILDINGS.CURSOR))}
            amt={amts[BUILDINGS_INDEX[BUILDINGS.CURSOR]]} operation={primarySelected} totalCookies={totalCookies} changeCookies={changeTotalCookies} bulkSelected={bulkSelected}
            calculateSellPrice={calculateSellPrice} quote="Autoclicks once every 10 seconds." img={buildingImagesList[5]}
            tooltipImg={tooltipImages[BUILDINGS_INDEX[BUILDINGS.CURSOR]]} cps={totalCps()} cookies={totalCookies} shopOption={primarySelected}
          /> 

          <Building
            dispatch={buildingDispatch} name={BUILDINGS.GRANDMA} price={Math.ceil(primarySelected === SHOP_OPTIONS.BUY ? prices[BUILDINGS_INDEX[BUILDINGS.GRANDMA]] * (1 - 1.15 ** bulkSelected) / (1 - 1.15) : calculateSellPrice(BUILDINGS.GRANDMA))}
            amt={amts[BUILDINGS_INDEX[BUILDINGS.GRANDMA]]} operation={primarySelected} totalCookies={totalCookies} changeCookies={changeTotalCookies} bulkSelected={bulkSelected}
            calculateSellPrice={calculateSellPrice} quote="A nice grandma to bake more cookies." img={buildingImagesList[9]}
            tooltipImg={tooltipImages[BUILDINGS_INDEX[BUILDINGS.GRANDMA]]} cps={totalCps()} cookies={totalCookies} shopOption={primarySelected}
          />

          <Building
            dispatch={buildingDispatch} name={BUILDINGS.FARM} price={Math.ceil(primarySelected === SHOP_OPTIONS.BUY ? prices[BUILDINGS_INDEX[BUILDINGS.FARM]] * (1 - 1.15 ** bulkSelected) / (1 - 1.15) : calculateSellPrice(BUILDINGS.FARM))}
            amt={amts[BUILDINGS_INDEX[BUILDINGS.FARM]]} operation={primarySelected} totalCookies={totalCookies} changeCookies={changeTotalCookies} bulkSelected={bulkSelected}
            calculateSellPrice={calculateSellPrice} quote="Grows cookie plants from cookie seeds." img={buildingImagesList[7]}
            tooltipImg={tooltipImages[BUILDINGS_INDEX[BUILDINGS.FARM]]} cps={totalCps()} cookies={totalCookies} shopOption={primarySelected}
          />

          <Building
            dispatch={buildingDispatch} name={BUILDINGS.MINE} price={Math.ceil(primarySelected === SHOP_OPTIONS.BUY ? prices[BUILDINGS_INDEX[BUILDINGS.MINE]] * (1 - 1.15 ** bulkSelected) / (1 - 1.15) : calculateSellPrice(BUILDINGS.MINE))}
            amt={amts[BUILDINGS_INDEX[BUILDINGS.MINE]]} operation={primarySelected} totalCookies={totalCookies} changeCookies={changeTotalCookies} bulkSelected={bulkSelected}
            calculateSellPrice={calculateSellPrice} quote="Mines out cookie dough and chocolate chips." img={buildingImagesList[12]}
            tooltipImg={tooltipImages[BUILDINGS_INDEX[BUILDINGS.MINE]]} cps={totalCps()} cookies={totalCookies} shopOption={primarySelected}
          />

          <Building
            dispatch={buildingDispatch} name={BUILDINGS.FACTORY} price={Math.ceil(primarySelected === SHOP_OPTIONS.BUY ? prices[BUILDINGS_INDEX[BUILDINGS.FACTORY]] * (1 - 1.15 ** bulkSelected) / (1 - 1.15) : calculateSellPrice(BUILDINGS.FACTORY))}
            amt={amts[BUILDINGS_INDEX[BUILDINGS.FACTORY]]} operation={primarySelected} totalCookies={totalCookies} changeCookies={changeTotalCookies} bulkSelected={bulkSelected}
            calculateSellPrice={calculateSellPrice} quote="Produces large quantities of cookies." img={buildingImagesList[6]}
            tooltipImg={tooltipImages[BUILDINGS_INDEX[BUILDINGS.FACTORY]]} cps={totalCps()} cookies={totalCookies} shopOption={primarySelected}
          />

           <Building
            dispatch={buildingDispatch} name={BUILDINGS.BANK} price={Math.ceil(primarySelected === SHOP_OPTIONS.BUY ? prices[BUILDINGS_INDEX[BUILDINGS.BANK]] * (1 - 1.15 ** bulkSelected) / (1 - 1.15) : calculateSellPrice(BUILDINGS.BANK))}
            amt={amts[BUILDINGS_INDEX[BUILDINGS.BANK]]} operation={primarySelected} totalCookies={totalCookies} changeCookies={changeTotalCookies} bulkSelected={bulkSelected}
            calculateSellPrice={calculateSellPrice} quote="Generates cookies from interest." img={buildingImagesList[2]}
            tooltipImg={tooltipImages[BUILDINGS_INDEX[BUILDINGS.BANK]]} cps={totalCps()} cookies={totalCookies} shopOption={primarySelected}
          />

          <Building
            dispatch={buildingDispatch} name={BUILDINGS.TEMPLE} price={Math.ceil(primarySelected === SHOP_OPTIONS.BUY ? prices[BUILDINGS_INDEX[BUILDINGS.TEMPLE]] * (1 - 1.15 ** bulkSelected) / (1 - 1.15) : calculateSellPrice(BUILDINGS.TEMPLE))}
            amt={amts[BUILDINGS_INDEX[BUILDINGS.TEMPLE]]} operation={primarySelected} totalCookies={totalCookies} changeCookies={changeTotalCookies} bulkSelected={bulkSelected}
            calculateSellPrice={calculateSellPrice} quote="Full of precious, ancient chocolate." img={buildingImagesList[16]}
            tooltipImg={tooltipImages[BUILDINGS_INDEX[BUILDINGS.TEMPLE]]} cps={totalCps()} cookies={totalCookies} shopOption={primarySelected}
          />

          

          <Building
            dispatch={buildingDispatch} name={BUILDINGS.WIZARD} price={Math.ceil(primarySelected === SHOP_OPTIONS.BUY ? prices[BUILDINGS_INDEX[BUILDINGS.WIZARD]] * (1 - 1.15 ** bulkSelected) / (1 - 1.15) : calculateSellPrice(BUILDINGS.WIZARD))}
            amt={amts[BUILDINGS_INDEX[BUILDINGS.WIZARD]]} operation={primarySelected} totalCookies={totalCookies} changeCookies={changeTotalCookies} bulkSelected={bulkSelected}
            calculateSellPrice={calculateSellPrice} quote="Summons cookies with magic spells." img={buildingImagesList[18]}
            tooltipImg={tooltipImages[BUILDINGS_INDEX[BUILDINGS.WIZARD]]} cps={totalCps()} cookies={totalCookies} shopOption={primarySelected}
          />

          <Building
            dispatch={buildingDispatch} name={BUILDINGS.SHIPMENT} price={Math.ceil(primarySelected === SHOP_OPTIONS.BUY ? prices[BUILDINGS_INDEX[BUILDINGS.SHIPMENT]] * (1 - 1.15 ** bulkSelected) / (1 - 1.15) : calculateSellPrice(BUILDINGS.SHIPMENT))}
            amt={amts[BUILDINGS_INDEX[BUILDINGS.SHIPMENT]]} operation={primarySelected} totalCookies={totalCookies} changeCookies={changeTotalCookies} bulkSelected={bulkSelected}
            calculateSellPrice={calculateSellPrice} quote="Turns gold into cookies!" img={buildingImagesList[15]}
            tooltipImg={tooltipImages[BUILDINGS_INDEX[BUILDINGS.SHIPMENT]]} cps={totalCps()} cookies={totalCookies} shopOption={primarySelected}
          />

          <Building
            dispatch={buildingDispatch} name={BUILDINGS.ALCHEMY} price={Math.ceil(primarySelected === SHOP_OPTIONS.BUY ? prices[BUILDINGS_INDEX[BUILDINGS.ALCHEMY]] * (1 - 1.15 ** bulkSelected) / (1 - 1.15) : calculateSellPrice(BUILDINGS.ALCHEMY))}
            amt={amts[BUILDINGS_INDEX[BUILDINGS.ALCHEMY]]} operation={primarySelected} totalCookies={totalCookies} changeCookies={changeTotalCookies} bulkSelected={bulkSelected}
            calculateSellPrice={calculateSellPrice} quote="A nice grandma to bake more cookies." img={buildingImagesList[0]}
            tooltipImg={tooltipImages[BUILDINGS_INDEX[BUILDINGS.ALCHEMY]]} cps={totalCps()} cookies={totalCookies} shopOption={primarySelected}
          />

          <Building
            dispatch={buildingDispatch} name={BUILDINGS.PORTAL} price={Math.ceil(primarySelected === SHOP_OPTIONS.BUY ? prices[BUILDINGS_INDEX[BUILDINGS.PORTAL]] * (1 - 1.15 ** bulkSelected) / (1 - 1.15) : calculateSellPrice(BUILDINGS.PORTAL))}
            amt={amts[BUILDINGS_INDEX[BUILDINGS.PORTAL]]} operation={primarySelected} totalCookies={totalCookies} changeCookies={changeTotalCookies} bulkSelected={bulkSelected}
            calculateSellPrice={calculateSellPrice} quote="Opens the door to the Cookieverse." img={buildingImagesList[13]}
            tooltipImg={tooltipImages[BUILDINGS_INDEX[BUILDINGS.PORTAL]]} cps={totalCps()} cookies={totalCookies} shopOption={primarySelected}
          />

          <Building
            dispatch={buildingDispatch} name={BUILDINGS.TIME} price={Math.ceil(primarySelected === SHOP_OPTIONS.BUY ? prices[BUILDINGS_INDEX[BUILDINGS.TIME]] * (1 - 1.15 ** bulkSelected) / (1 - 1.15) : calculateSellPrice(BUILDINGS.TIME))}
            amt={amts[BUILDINGS_INDEX[BUILDINGS.TIME]]} operation={primarySelected} totalCookies={totalCookies} changeCookies={changeTotalCookies} bulkSelected={bulkSelected}
            calculateSellPrice={calculateSellPrice} quote="Brings cookies from the past, before they were even eaten." img={buildingImagesList[17]}
            tooltipImg={tooltipImages[BUILDINGS_INDEX[BUILDINGS.TIME]]} cps={totalCps()} cookies={totalCookies} shopOption={primarySelected}
          />

          <Building
            dispatch={buildingDispatch} name={BUILDINGS.ANTIMATTER} price={Math.ceil(primarySelected === SHOP_OPTIONS.BUY ? prices[BUILDINGS_INDEX[BUILDINGS.ANTIMATTER]] * (1 - 1.15 ** bulkSelected) / (1 - 1.15) : calculateSellPrice(BUILDINGS.ANTIMATTER))}
            amt={amts[BUILDINGS_INDEX[BUILDINGS.ANTIMATTER]]} operation={primarySelected} totalCookies={totalCookies} changeCookies={changeTotalCookies} bulkSelected={bulkSelected}
            calculateSellPrice={calculateSellPrice} quote="Condenses the antimatter in the universe into cookies." img={buildingImagesList[1]}
            tooltipImg={tooltipImages[BUILDINGS_INDEX[BUILDINGS.ANTIMATTER]]} cps={totalCps()} cookies={totalCookies} shopOption={primarySelected}
          />

          <Building
            dispatch={buildingDispatch} name={BUILDINGS.PRISM} price={Math.ceil(primarySelected === SHOP_OPTIONS.BUY ? prices[BUILDINGS_INDEX[BUILDINGS.PRISM]] * (1 - 1.15 ** bulkSelected) / (1 - 1.15) : calculateSellPrice(BUILDINGS.PRISM))}
            amt={amts[BUILDINGS_INDEX[BUILDINGS.PRISM]]} operation={primarySelected} totalCookies={totalCookies} changeCookies={changeTotalCookies} bulkSelected={bulkSelected}
            calculateSellPrice={calculateSellPrice} quote="Converts light itself into cookies." img={buildingImagesList[14]}
            tooltipImg={tooltipImages[BUILDINGS_INDEX[BUILDINGS.PRISM]]} cps={totalCps()} cookies={totalCookies} shopOption={primarySelected}
          />

          <Building
            dispatch={buildingDispatch} name={BUILDINGS.CHANCE} price={Math.ceil(primarySelected === SHOP_OPTIONS.BUY ? prices[BUILDINGS_INDEX[BUILDINGS.CHANCE]] * (1 - 1.15 ** bulkSelected) / (1 - 1.15) : calculateSellPrice(BUILDINGS.CHANCE))}
            amt={amts[BUILDINGS_INDEX[BUILDINGS.CHANCE]]} operation={primarySelected} totalCookies={totalCookies} changeCookies={changeTotalCookies} bulkSelected={bulkSelected}
            calculateSellPrice={calculateSellPrice} quote="Generates cookies out of thin air through sheer luck." img={buildingImagesList[3]}
            tooltipImg={tooltipImages[BUILDINGS_INDEX[BUILDINGS.CHANCE]]} cps={totalCps()} cookies={totalCookies} shopOption={primarySelected}
          />

          <Building
            dispatch={buildingDispatch} name={BUILDINGS.FRACTAL} price={Math.ceil(primarySelected === SHOP_OPTIONS.BUY ? prices[BUILDINGS_INDEX[BUILDINGS.FRACTAL]] * (1 - 1.15 ** bulkSelected) / (1 - 1.15) : calculateSellPrice(BUILDINGS.FRACTAL))}
            amt={amts[BUILDINGS_INDEX[BUILDINGS.FRACTAL]]} operation={primarySelected} totalCookies={totalCookies} changeCookies={changeTotalCookies} bulkSelected={bulkSelected}
            calculateSellPrice={calculateSellPrice} quote="Turns cookies into even more cookies." img={buildingImagesList[8]}
            tooltipImg={tooltipImages[BUILDINGS_INDEX[BUILDINGS.FRACTAL]]} cps={totalCps()} cookies={totalCookies} shopOption={primarySelected}
          />

          <Building
            dispatch={buildingDispatch} name={BUILDINGS.JAVASCRIPT} price={Math.ceil(primarySelected === SHOP_OPTIONS.BUY ? prices[BUILDINGS_INDEX[BUILDINGS.JAVASCRIPT]] * (1 - 1.15 ** bulkSelected) / (1 - 1.15) : calculateSellPrice(BUILDINGS.JAVASCRIPT))}
            amt={amts[BUILDINGS_INDEX[BUILDINGS.JAVASCRIPT]]} operation={primarySelected} totalCookies={totalCookies} changeCookies={changeTotalCookies} bulkSelected={bulkSelected}
            calculateSellPrice={calculateSellPrice} quote="Create cookies from the very code this game was written in." img={buildingImagesList[11]}
            tooltipImg={tooltipImages[BUILDINGS_INDEX[BUILDINGS.JAVASCRIPT]]} cps={totalCps()} cookies={totalCookies} shopOption={primarySelected}
          />

          <Building
            dispatch={buildingDispatch} name={BUILDINGS.IDLE} price={Math.ceil(primarySelected === SHOP_OPTIONS.BUY ? prices[BUILDINGS_INDEX[BUILDINGS.IDLE]] * (1 - 1.15 ** bulkSelected) / (1 - 1.15) : calculateSellPrice(BUILDINGS.IDLE))}
            amt={amts[BUILDINGS_INDEX[BUILDINGS.IDLE]]} operation={primarySelected} totalCookies={totalCookies} changeCookies={changeTotalCookies} bulkSelected={bulkSelected}
            calculateSellPrice={calculateSellPrice} quote="There's been countless other idle universes running alongside our own. You've finally found a way to hijack their production and convert whatever they've been making into cookies!" img={buildingImagesList[10]}
            tooltipImg={tooltipImages[BUILDINGS_INDEX[BUILDINGS.IDLE]]} cps={totalCps()} cookies={totalCookies} shopOption={primarySelected}
          />

          <Building
            dispatch={buildingDispatch} name={BUILDINGS.CORTEX} price={Math.ceil(primarySelected === SHOP_OPTIONS.BUY ? prices[BUILDINGS_INDEX[BUILDINGS.CORTEX]] * (1 - 1.15 ** bulkSelected) / (1 - 1.15) : calculateSellPrice(BUILDINGS.CORTEX))}
            amt={amts[BUILDINGS_INDEX[BUILDINGS.CORTEX]]} operation={primarySelected} totalCookies={totalCookies} changeCookies={changeTotalCookies} bulkSelected={bulkSelected}
            calculateSellPrice={calculateSellPrice} quote="These artificial brains the size of planets are capable of simply dreaming up cookies into existence. Time and space are inconsequential. Reality is arbitrary." img={buildingImagesList[4]}
            tooltipImg={tooltipImages[BUILDINGS_INDEX[BUILDINGS.CORTEX]]} cps={totalCps()} cookies={totalCookies} shopOption={primarySelected}
          />

          <Building
            dispatch={buildingDispatch} name={BUILDINGS.YOU} price={Math.ceil(primarySelected === SHOP_OPTIONS.BUY ? prices[BUILDINGS_INDEX[BUILDINGS.YOU]] * (1 - 1.15 ** bulkSelected) / (1 - 1.15) : calculateSellPrice(BUILDINGS.YOU))}
            amt={amts[BUILDINGS_INDEX[BUILDINGS.YOU]]} operation={primarySelected} totalCookies={totalCookies} changeCookies={changeTotalCookies} bulkSelected={bulkSelected}
            calculateSellPrice={calculateSellPrice} quote="You, alone, are the reason behind all these cookies. You figure if there were more of you... maybe you could make even more." img={buildingImagesList[19]}
            tooltipImg={tooltipImages[BUILDINGS_INDEX[BUILDINGS.YOU]]} cps={totalCps()} cookies={totalCookies} shopOption={primarySelected}
          />

          <br></br> <br></br> <br></br>



        </div>

      </div>
    </div>
  );
}

export default App;


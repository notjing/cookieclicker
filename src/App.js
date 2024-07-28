import React, { useState, useReducer, useEffect, useRef } from "react";
import './App.css';
import "./styles.css?v=1.0";
import cookieImage from './images/cookie.png';
import poleImage from './images/woodenseperator.png';
import horizontalPoleImage from "./images/woodenseperatorhorizontal.png"
import menuImage from "./images/menu.png"
import icons from "./images/icons.png"
import Building from "./components/Building";
import Upgrade from "./components/Upgrade";

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
  ANTIMATER: "Antimater",
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
  [BUILDINGS.ANTIMATER]: 12,
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
  [BUILDINGS.ANTIMATER]: 1.7e14,
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
  [BUILDINGS.ANTIMATER]: 4.3e8,
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
  [BUILDINGS.ANTIMATER]: 0,
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
  [BUILDINGS.ANTIMATER]: 1,
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
  console.log(building)
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

const buildingTooltipImages = require.context('./images/buildings_tooltip', false);
const buildingTooltipImagesList = buildingTooltipImages.keys().map(image => buildingTooltipImages(image));

const milkImages = require.context('./images/milk', false);
const milkImagesList = milkImages.keys().map(image => milkImages(image));

export const upgrades = [
  {
    id: 0, name: "Reinforced index finger", desc: "The mouse and cursors are twice as efficient.", quote: "prod prod", price: 100, unlocked: 0, bought: 0, req: { "building": [[BUILDINGS.CURSOR, 1]] }, img: await findImage(icons, 1, 1), afford: false
  },
  {
    id: 1, name: "Carpal tunnel prevention cream", desc: "The mouse and cursors are twice as efficient.", quote: "it... it hurts to click...", price: 500, unlocked: 0, bought: 0, req: { "building": [[BUILDINGS.CURSOR, 1]] }, img: await findImage(icons, 2, 1), afford: false
  },

];



function App() {
  const [username, changeUsername] = useState("Default Username");
  const [perClick, changePerClick] = useState(1);
  const [totalCookies, changeTotalCookies] = useState(0);
  const [primarySelected, changePrimarySelected] = useState(SHOP_OPTIONS.BUY);
  const [bulkSelected, changeBulkSelected] = useState(SHOP_OPTIONS.ONE);
  const [numAchievements, changeNumAchievements] = useState(0);
  const [currentNews, changeCurrentNews] = useState("News message #0");
  const [incomingNews, changeIncomingNews] = useState("News message #-1");
  const [updateNews, changeUpdateNews] = useState(false);
  const [renderAllUpgrades, changeRenderAllUpgrades] = useState(false);
  const [tooltipImages, changeTooltipImages] = useState([]);
  const [{ prices, amts }, buildingDispatch] = useReducer(buildingReducer, {
    prices: [
      BASE_PRICE[BUILDINGS.CURSOR],
      BASE_PRICE[BUILDINGS.GRANDMA]
    ],

    amts: [
      0 ,
      0
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
      COOKIES_BAKED[BUILDINGS.CURSOR] += BASE_CPS[BUILDINGS.CURSOR] * amts[BUILDINGS_INDEX[BUILDINGS.CURSOR]] / 60;
    }, 1000 / 60);
    return () => clearInterval(intervalId);
  }, [totalCps()]);

  useEffect(() => {
    changeCurrentNews(incomingNews);
    generateNews();
  }, [updateNews]);

  useEffect(() => {
    for (let i = 0; i < upgrades.length; i++) {
      if (!upgrades[i].bought && !upgrades[i].unlocked && checkRequirements(upgrades[i].req)) upgrades[i].unlocked = true
    }
  }, [totalCookies, amts])

  useEffect(() => {
    for (var i = 0; i < upgrades.length; i++) {
      if (upgrades[i].price <= totalCookies) upgrades[i].afford = true;
    }
  }, [totalCookies])

  useEffect(() => {
    async function loadImage() {
      changeTooltipImages([await findImage(icons, 1, 1), await findImage(icons, 1, 2)])
    }
    loadImage();
  }, []);

  function totalCps() {
    return amts[BUILDINGS_INDEX[BUILDINGS.CURSOR]] * MULTIPLIER[BUILDINGS.CURSOR] * BASE_CPS[BUILDINGS.CURSOR];
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
    switch (building) {
      case BUILDINGS.CURSOR:
        if (amts[BUILDINGS_INDEX[BUILDINGS.CURSOR]] < bulkSelected) return BASE_PRICE[BUILDINGS.CURSOR] * (1 - (1.15 ** amts[BUILDINGS_INDEX[BUILDINGS.CURSOR]])) / (1 - 1.15) * 0.25;
        else return BASE_PRICE[BUILDINGS.CURSOR] * (1.15 ** (amts[BUILDINGS_INDEX[BUILDINGS.CURSOR]] - bulkSelected)) * (1 - (1.15 ** bulkSelected)) / (1 - 1.15) * 0.25;
      default:
        return 0;
    }
  }

  function implementUpgrades(id) {
    switch (id) {
      case 0:
        upgrades[id].bought = true;
        MULTIPLIER[BUILDINGS.CURSOR] *= 2;
    }
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
    return ret
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
    return true
  }


  return (
    <div className="layout">
      <div className="left-col">
        <div className="username">
          <button onClick={usernamePrompt}>{username}'s bakery</button>
        </div>

        <div>
          <div className="cookie-count"> <h1> {Math.floor(totalCookies)} cookies</h1> </div>
          <div className="cookie-rate">per second: {Math.round(totalCps() * 10) / 10}</div>
        </div>

        <div className="main-cookie">
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
            <img src={menuImage}></img>
            <button className="options"> Options </button>
            <button className="stats"> Stats </button>
          </div>

          <div className="mid-menu">
            <h3 className="active-text" ref={activeTextRef}> {currentNews} </h3>
            <h3 className="incoming-text" ref={incomingTextRef}> {incomingNews} </h3>

          </div>

          <div className="right-menu">
            <img className="y-reflect" src={menuImage}></img>
            <button className="info"> Info </button>
            <button className="legacy"> Legacy </button>
          </div>



        </div>

        <div className="divider-three">
          <img src={horizontalPoleImage}></img>
        </div>

        <div className="building-backgrounds">

        </div>

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
          {console.log(prices)}
          <Building
            dispatch={buildingDispatch} name={BUILDINGS.CURSOR} price={Math.ceil(primarySelected === SHOP_OPTIONS.BUY ? prices[BUILDINGS_INDEX[BUILDINGS.CURSOR]] * (1 - 1.15 ** bulkSelected) / (1 - 1.15) : calculateSellPrice(BUILDINGS.CURSOR))}
            amt={amts[BUILDINGS_INDEX[BUILDINGS.CURSOR]].amt} operation={primarySelected} totalCookies={totalCookies} changeCookies={changeTotalCookies} bulkSelected={bulkSelected}
            calculateSellPrice={calculateSellPrice} quote="Autoclicks once every 10 seconds." img={buildingImagesList[BUILDINGS_INDEX[BUILDINGS.CURSOR]]}
            tooltipImg={tooltipImages[BUILDINGS_INDEX[BUILDINGS.CURSOR]]} cps={totalCps()} cookies={totalCookies} shopOption={primarySelected}
          /> 

          <Building
            dispatch={buildingDispatch} name={BUILDINGS.GRANDMA} price={Math.ceil(primarySelected === SHOP_OPTIONS.BUY ? prices[BUILDINGS_INDEX[BUILDINGS.GRANDMA]] * (1 - 1.15 ** bulkSelected) / (1 - 1.15) : calculateSellPrice(BUILDINGS.GRANDMA))}
            amt={amts[BUILDINGS_INDEX[BUILDINGS.GRANDMA]].amt} operation={primarySelected} totalCookies={totalCookies} changeCookies={changeTotalCookies} bulkSelected={bulkSelected}
            calculateSellPrice={calculateSellPrice} quote="A nice grandma to bake more cookies." img={buildingImagesList[BUILDINGS_INDEX[BUILDINGS.GRANDMA]]}
            tooltipImg={tooltipImages[BUILDINGS_INDEX[BUILDINGS.GRANDMA]]} cps={totalCps()} cookies={totalCookies} shopOption={primarySelected}
          />

        </div>

      </div>
    </div>
  );
}

export default App;


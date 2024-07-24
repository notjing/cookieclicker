import React, { useState, useReducer, useEffect, useRef } from "react";
import './App.css';
import "./styles.css?v=1.0";
import cookieImage from './images/cookie.png';
import poleImage from './images/woodenseperator.png';
import horizontalPoleImage from "./images/woodenseperatorhorizontal.png"
import menuImage from "./images/menu.png"
import Building from "./components/Building";
import Upgrade from "./components/Upgrade";

export const BUILDINGS = {
  CURSOR: "Cursor",
  GRANDMA: "Grandma"
};

const BUILDINGS_INDEX = {
  CURSOR: 0
}

export const BASE_PRICE = {
  [BUILDINGS.CURSOR]: 15
};

export const BASE_CPS = {
  [BUILDINGS.CURSOR]: 0.1
};

export const COOKIES_BAKED = {
  [BUILDINGS.CURSOR]: 0
};

export const MULTIPLIER = {
  [BUILDINGS.CURSOR]: 1
};

export const SHOP_OPTIONS = {
  BUY: "Buy",
  SELL: "Sell",
  ONE: 1,
  TEN: 10,
  ONE_HUNDRED: 100
};

function buildingReducer(state, { building, operation, bulkSelected, totalCookies, changeTotalCookies }) {
  switch (building) {
    case BUILDINGS.CURSOR:
      switch (operation) {
        case SHOP_OPTIONS.BUY:
          if (totalCookies >= state.prices[BUILDINGS_INDEX.CURSOR].price * (1 - 1.15 ** bulkSelected) / (1 - 1.15)) {
            changeTotalCookies(totalCookies - state.prices[BUILDINGS_INDEX.CURSOR].price * (1 - 1.15 ** bulkSelected) / (1 - 1.15));
            return {
              ...state,
              amts: state.amts.map((amtObj, index) =>
                index === BUILDINGS_INDEX.CURSOR
                  ? { ...amtObj, amt: amtObj.amt + bulkSelected }
                  : amtObj
              ),
              prices: state.prices.map((priceObj, index) =>
                index === BUILDINGS_INDEX.CURSOR
                  ? { ...priceObj, price: Math.ceil(BASE_PRICE[BUILDINGS.CURSOR] * 1.15 ** (state.amts[BUILDINGS_INDEX.CURSOR].amt + bulkSelected)) }
                  : priceObj
              )
            };
          }
          return state;
        case SHOP_OPTIONS.SELL:
          return {
            ...state,
            amts: state.amts.map((amtObj, index) =>
              index === BUILDINGS_INDEX.CURSOR
                ? { ...amtObj, amt: Math.max(state.amts[BUILDINGS_INDEX.CURSOR].amt - bulkSelected, 0) }
                : amtObj
            ),
            prices: state.prices.map((priceObj, index) =>
              index === BUILDINGS_INDEX.CURSOR
                ? { ...priceObj, price: Math.ceil(BASE_PRICE[BUILDINGS.CURSOR] * 1.15 ** (Math.max(state.amts[BUILDINGS_INDEX.CURSOR].amt - bulkSelected, 0))) }
                : priceObj
            )
          };
        default:
          return state;
      }
    default:
      return state;
  }
}


const images = require.context('./images/upgrades', false);
const imageList = images.keys().map(image => images(image));

const borderlessImages = require.context('./images/upgrades_borderless', false);
const borderlessImageList = borderlessImages.keys().map(image => borderlessImages(image));

const buildingImages = require.context('./images/buildings', false);
const buildingImagesList = buildingImages.keys().map(image => buildingImages(image));

const buildingTooltipImages = require.context('./images/buildings_tooltip', false);
const buildingTooltipImagesList = buildingTooltipImages.keys().map(image => buildingTooltipImages(image));

const milkImages = require.context('./images/milk', false);
const milkImagesList = milkImages.keys().map(image => milkImages(image));

export const upgrades = [
  {
    id: 0, name: "Reinforced index finger", desc: "The mouse and cursors are twice as efficient", quote: "prod prod", price: 100, unlocked: 0, bought: 0, req: [], img: imageList[0], borderlessImg: borderlessImageList[0], afford: false
  }
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
  const [newsNum, changeNewsNum] = useState(1);
  const [updateNews, changeUpdateNews] = useState(false);
  const [{ prices, amts }, cursorDispatch] = useReducer(buildingReducer, {
    prices: [
      { id: 0, price: BASE_PRICE[BUILDINGS.CURSOR] }

    ],

    amts: [
      { id: 0, amt: 0 }
    ]

  });

  const activeTextRef = useRef(null);
  const incomingTextRef = useRef(null);

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
      COOKIES_BAKED[BUILDINGS.CURSOR] += BASE_CPS[BUILDINGS.CURSOR] * amts[BUILDINGS_INDEX.CURSOR].amt / 60;
    }, 1000 / 60);
    return () => clearInterval(intervalId);
  }, [totalCps()]);

  useEffect(() => {
    changeCurrentNews(incomingNews);
    generateNews();
  }, [updateNews]);

  useEffect(() => {
    if (amts[BUILDINGS_INDEX.CURSOR].amt !== "undefined" && amts[BUILDINGS_INDEX.CURSOR].amt >= 1) upgrades[0].unlocked = 1;
  }, [amts])

  useEffect(() => {
    for (var i = 0; i < upgrades.length; i++) {
      if (upgrades[i].price <= totalCookies) upgrades[i].afford = true;
    }
  }, [totalCookies])

  function totalCps() {
    return amts[BUILDINGS_INDEX.CURSOR].amt * MULTIPLIER[BUILDINGS.CURSOR] * BASE_CPS[BUILDINGS.CURSOR];
  }

  function usernamePrompt() {
    const newUsername = window.prompt("What is your new username?", username);
    if (newUsername != null) changeUsername(newUsername);
  }

  function cookieClicked() {
    changeTotalCookies(totalCookies + perClick);
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
        if (amts[BUILDINGS_INDEX.CURSOR].amt < bulkSelected) return BASE_PRICE[BUILDINGS.CURSOR] * (1 - (1.15 ** amts[BUILDINGS_INDEX.CURSOR].amt)) / (1 - 1.15) * 0.25;
        else return BASE_PRICE[BUILDINGS.CURSOR] * (1.15 ** (amts[BUILDINGS_INDEX.CURSOR].amt - bulkSelected)) * (1 - (1.15 ** bulkSelected)) / (1 - 1.15) * 0.25;
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
    for (let i = 0; i < upgrades.length; i++) {
      if (upgrades[i].unlocked && !upgrades[i].bought) {
        ret.push(
          <Upgrade id={upgrades[i].id} name={upgrades[i].name} desc={upgrades[i].desc} quote={upgrades[i].quote} price={upgrades[i].price} req={upgrades[i].req} img={upgrades[i].img}
            borderlessImg={upgrades[i].borderlessImg} afford={upgrades[i].afford} cookies={totalCookies} onClick={implementUpgrades}></Upgrade>
        )
      }
    }
    return ret
  }

  function generateNews() {
    console.log((incomingNews.split('#')))
    changeIncomingNews(prev =>  `News message #${parseInt(prev.split('#')[1]) + 1}`);
    
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

      <div className="right-col">

        <h1>Store</h1>

        <div className="divider-three">
          <img src={horizontalPoleImage} alt="divider" />
        </div>

        <div className="upgrade-menu">
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
            dispatch={cursorDispatch}
            name={BUILDINGS.CURSOR}
            price={Math.ceil(primarySelected === SHOP_OPTIONS.BUY ? prices[BUILDINGS_INDEX.CURSOR].price * (1 - 1.15 ** bulkSelected) / (1 - 1.15) : calculateSellPrice(BUILDINGS.CURSOR))}
            amt={amts[BUILDINGS_INDEX.CURSOR].amt}
            operation={primarySelected}
            totalCookies={totalCookies}
            changeCookies={changeTotalCookies}
            bulkSelected={bulkSelected}
            calculateSellPrice={calculateSellPrice}
            quote="Autoclicks once every 10 seconds"
            img={buildingImagesList[BUILDINGS_INDEX.CURSOR]}
            tooltipImg={buildingTooltipImagesList[BUILDINGS_INDEX.CURSOR]}
            cps={totalCps()}
            cookies={totalCookies}
          />

        </div>
      </div>
    </div>
  );
}

export default App;


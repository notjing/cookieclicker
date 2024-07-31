import React from 'react'

function NumberAbbreviator(number) {
  if(number >= 1e63) return `${Math.floor(number * 1000/1e63) / 1000} vigintillion`
  if(number >= 1e60) return `${Math.floor(number * 1000/1e60) / 1000} novemdecillion`
  if(number >= 1e57) return `${Math.floor(number * 1000/1e57) / 1000} octodecillion`
  if(number >= 1e54) return `${Math.floor(number * 1000/1e54) / 1000} septdecillion`
  if(number >= 1e51) return `${Math.floor(number * 1000/1e51) / 1000} sexdecillion`
  if(number >= 1e48) return `${Math.floor(number * 1000/1e48) / 1000} quindecillion`
  if(number >= 1e45) return `${Math.floor(number * 1000/1e45) / 1000} quattuordecillion`
  if(number >= 1e42) return `${Math.floor(number * 1000/1e42) / 1000} tredecillion`
  if(number >= 1e39) return `${Math.floor(number * 1000/1e39) / 1000} duodecillion`
  if(number >= 1e36) return `${Math.floor(number * 1000/1e36) / 1000} undecillion`
  if(number >= 1e33) return `${Math.floor(number * 1000/1e33) / 1000} decillion`
  if(number >= 1e30) return `${Math.floor(number * 1000/1e30) / 1000} nonillion`
  if(number >= 1e27) return `${Math.floor(number * 1000/1e27) / 1000} octillion`
  if(number >= 1e24) return `${Math.floor(number * 1000/1e24) / 1000} septillion`
  if(number >= 1e21) return `${Math.floor(number * 1000/1e21) / 1000} sextillion`
  if(number >= 1e18) return `${Math.floor(number * 1000/1e18) / 1000} quintillion`
  if(number >= 1e15) return `${Math.floor(number * 1000/1e15) / 1000} quadrillion`
  if(number >= 1e12) return `${Math.floor(number * 1000/1e12) / 1000} trilion`
  if(number >= 1e9) return `${Math.floor(number * 1000/1e9) / 1000} billion`
  if(number >= 1e6) return `${Math.floor(number * 1000/1e6) / 1000} million`
  return number
}

export default NumberAbbreviator

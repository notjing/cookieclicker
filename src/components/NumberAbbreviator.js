import React from 'react'

function NumberAbbreviator(number) {
  if(number >= 1e63) return `${Math.floor(number * 1000/1e63) / 1000} Vigintillion`
  if(number >= 1e60) return `${Math.floor(number * 1000/1e60) / 1000} Novemdecillion`
  if(number >= 1e57) return `${Math.floor(number * 1000/1e57) / 1000} Octodecillion`
  if(number >= 1e54) return `${Math.floor(number * 1000/1e54) / 1000} Septdecillion`
  if(number >= 1e51) return `${Math.floor(number * 1000/1e51) / 1000} Sexdecillion`
  if(number >= 1e48) return `${Math.floor(number * 1000/1e48) / 1000} Quindecillion`
  if(number >= 1e45) return `${Math.floor(number * 1000/1e45) / 1000} Quattuordecillion`
  if(number >= 1e42) return `${Math.floor(number * 1000/1e42) / 1000} Tredecillion`
  if(number >= 1e39) return `${Math.floor(number * 1000/1e39) / 1000} Duodecillion`
  if(number >= 1e36) return `${Math.floor(number * 1000/1e36) / 1000} Undecillion`
  if(number >= 1e33) return `${Math.floor(number * 1000/1e33) / 1000} Decillion`
  if(number >= 1e30) return `${Math.floor(number * 1000/1e30) / 1000} Nonillion`
  if(number >= 1e27) return `${Math.floor(number * 1000/1e27) / 1000} Octillion`
  if(number >= 1e24) return `${Math.floor(number * 1000/1e24) / 1000} Septillion`
  if(number >= 1e21) return `${Math.floor(number * 1000/1e21) / 1000} Sextillion`
  if(number >= 1e18) return `${Math.floor(number * 1000/1e18) / 1000} Quintillion`
  if(number >= 1e15) return `${Math.floor(number * 1000/1e15) / 1000} Quadrillion`
  if(number >= 1e12) return `${Math.floor(number * 1000/1e12) / 1000} Trilion`
  if(number >= 1e9) return `${Math.floor(number * 1000/1e9)} Billion`
  if(number >= 1e6) return `${Math.floor(number * 1000/1e6)} Million`
  return number
}

export default NumberAbbreviator

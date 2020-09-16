const randomInteger = (min, max) =>
  Math.round((Math.floor(Math.random() * (max - min + 1)) + min) / 1000) * 1000
export default randomInteger

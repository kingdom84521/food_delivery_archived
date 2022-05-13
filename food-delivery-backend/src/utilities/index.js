const randomTwoChar = () => {
    return Math.random().toString(36).replace(/[^a-z]+/g,"").substr(0,2).toUpperCase()
}

module.exports = { 
    randomTwoChar
 }
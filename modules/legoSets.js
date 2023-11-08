const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];


function initialize () {
    return new Promise((resolve, reject) => {
        setData.forEach(newSet => {
            let selectedTheme = themeData.find(elem => elem.id == newSet.theme_id)
            newSet.theme = selectedTheme.name
            sets.push(newSet)
        })
        resolve()
    })
}
// initialize()

function getAllSets(){
    return new Promise((resolve, reject) => {
        resolve(sets);
    })
}
// console.log(getAllSets())

function getSetByNum(setNum){
    return new Promise((resolve, reject) => {
        let chosenSet = setData.find(elem => elem.set_num == setNum)
        if(chosenSet.length == 0){
            reject("unable to find requested set")
        }else{
            resolve(chosenSet);
        }
    })
}

// console.log(getSetByNum("0011-2"))

function getSetsByTheme(theme){
    return new Promise((resolve, reject) => {
        let themeSets = sets.filter((elem) => elem.theme.toUpperCase().includes(theme.toUpperCase()))
        if(themeSets.length == 0){
            reject("unable to find requested sets")
        }else{
            resolve(themeSets);
        }
    })
}

// console.log(getSetsByTheme("town"))

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme }



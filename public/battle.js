
const baseURL = 'http://localhost:9009/api/babies'

const babyContainer = document.querySelector(".babiesContainer2")
const baby1 = document.querySelector("#baby1")
const baby2 = document.querySelector("#baby2")
const duelBtn = document.querySelector(".duelBtn")
// const chooseBaby = document.querySelector(".choose")

const getAllBabies = () => {
    console.log("Hello")
    axios.get(`${baseURL}`)
    .then((res) => {
        console.log(res)
        // alert(res.data)
        displayBabies(res.data)
    })
    .catch(err => console.log(err))
}

function displayBabies(arr) {
    babyContainer.innerHTML = ``
    for(let i=0; i<arr.length; i++){
        createBabyCard(arr[i])
    }
}

function createBabyCard(baby) {
    const babyCard = document.createElement('div')
    babyCard.classList.add("babiesCard")
    babyCard.innerHTML += 
    `<img alt="baby picture" src=${baby.imageURL} class="babyPicture"/>
    <div class="babyButtonContainer" id="id${baby.id}">
        <button class="choose" onclick="chooseBaby('${baby.id}')">Choose Baby</button>
    </div>
    <p class="babyName">${baby.name}<br>HP=${baby.health}</p>
    <p><u>Action 1:</u><br>${baby.action1.name}<br><u>Action 2:</u><br>${baby.action2.name}<br><u>Action 3:</u><br>${baby.action3.name}</p>
    `
    babyContainer.appendChild(babyCard)
}

const chooseBaby = (id) => {
    axios.get(`${baseURL}?ID=${id}`)
    .then((res) => {
        console.log(res.data[id-1])
        ringBaby(res.data[id-1])
    })
    .catch(err => console.log(err))
}

function ringBaby(baby) {
    baby1.innerHTML = `
    <p class ="babyName2">${baby.name}</p>
    <div class ="actionButtons" id="id${baby.id}">
    <button class="action1Btn" onclick="chooseAction(1, ${baby.id}-1)">${baby.action1.name}</button><br>
    <button class="action2Btn" onclick="chooseAction(2, ${baby.id}-1)">${baby.action2.name}</button><br>
    <button class="action3Btn" onclick="chooseAction(3, ${baby.id}-1)">${baby.action3.name}</button>
    </div><br>
    <img alt="baby picture" src="${baby.imageURL}" class="babyPicture1"/>
    `
    chooseOpponent()
    selectAction()
}

const chooseOpponent = () => {
    let id = Math.floor(Math.random()*10)
    axios.get(`${baseURL}?ID=${id}`)
    .then((res) => {
        // console.log(res.data[id])
        showOpponent(res.data[id])
    })
    .catch(err => console.log(err))
}
function showOpponent(baby) {
    saveOpponent(baby)
    baby2.innerHTML = `
    <p class="babyName2">${baby.name}</p>
    <img alt="baby picture" src="${baby.imageURL}" class="babyPicture2"/>
    `
    // let opponent = baby
    // return opponent
}
// function saveOpponent(baby){
//     return baby
// }
// let opponent = saveOpponent()
// console.log(opponent)

const chooseAction = (num, id) => {
    axios.get(`${baseURL}?=${id}`)
    .then((res)=> {
        console.log(res.data[id])
        actionSelected(num, res.data[id])
    })
    .catch(err=> console.log(err))
}
function actionSelected(num, baby){
    if(num === 1){
        console.log("first chosen")
        console.log(baby.action1URL)
        baby1.innerHTML = `
        <p class ="babyName2">${baby.name}</p>
        <div class ="actionButtons" id="id${baby.id}">
        <button class="action1Btn" onclick="chooseAction(1, ${baby.id}-1)">${baby.action1.name}</button><br>
        <button class="action2Btn" onclick="chooseAction(2, ${baby.id}-1)">${baby.action2.name}</button><br>
        <button class="action3Btn" onclick="chooseAction(3, ${baby.id}-1)">${baby.action3.name}</button>
        </div><br>
        <img alt="baby picture" src="${baby.action1URL}" class="babyPicture1"/>
        <p id="action">${baby.action1.name}</p>
        `
        duelBtn.innerHTML = `<button id="duelBtn" onclick="pressDuel(${baby.action1.class}, opponent)">Duel!</button>`
    }else if(num===2){
        console.log("second chosen")
        baby1.innerHTML = `
        <p class ="babyName2">${baby.name}</p>
        <div class ="actionButtons" id="id${baby.id}">
        <button class="action1Btn" onclick="chooseAction(1, ${baby.id}-1)">${baby.action1.name}</button><br>
        <button class="action2Btn" onclick="chooseAction(2, ${baby.id}-1)">${baby.action2.name}</button><br>
        <button class="action3Btn" onclick="chooseAction(3, ${baby.id}-1)">${baby.action3.name}</button>
        </div><br>
        <img alt="baby picture" src="${baby.action2URL}" class="babyPicture1"/>
        <p id="action">${baby.action2.name}</p>
        `
        duelBtn.innerHTML = `<button id="duelBtn" onclick="pressDuel(${baby.action2.class}, opponent)">Duel!</button>`
    }else if(num===3){
        console.log("third chosen")
        baby1.innerHTML = `
        <p class ="babyName2">${baby.name}</p>
        <div class ="actionButtons" id="id${baby.id}">
        <button class="action1Btn" onclick="chooseAction(1, ${baby.id}-1)">${baby.action1.name}</button><br>
        <button class="action2Btn" onclick="chooseAction(2, ${baby.id}-1)">${baby.action2.name}</button><br>
        <button class="action3Btn" onclick="chooseAction(3, ${baby.id}-1)">${baby.action3.name}</button>
        </div><br>
        <img alt="baby picture" src="${baby.action3URL}" class="babyPicture1"/>
        <p id="action">${baby.action3.name}</p>
        `
        duelBtn.innerHTML = `<button id="duelBtn" onclick="pressDuel(${baby.action3.class}, opponent)">Duel!</button>`
    }
}

const pressDuel = (act1, opp) => {
    console.log(act1)
    console.log(opp)
}
function duel(){

}

function showDuelBtn() {
    duelBtn.innerHTML = `<button id="duelBtn" onclick="pressDuel()">Duel!</button>`
}
function selectAction() {
    duelBtn.innerHTML = `<h4 id="selectAction">Select Your Action</h4>`
}


getAllBabies()
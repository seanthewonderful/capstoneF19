
const baseURL = 'http://localhost:9009/api/babies'

const babyContainer = document.querySelector(".babiesContainer2")
const baby1 = document.querySelector("#baby1")
const baby2 = document.querySelector("#baby2")
const duelBtn = document.querySelector(".duelBtn")
const playAgainBtn = document.querySelector("#reset")

const getAllBabies = () => {
    console.log("Hello")
    axios.get(`${baseURL}`)
    .then((res) => {
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
    babyCard.innerHTML += `
    <img alt="baby picture" src=${baby.imageURL} class="babyPicture"/>
    <div class="babyButtonContainer" id="id${baby.id}">
        <button class="choose" onclick="chooseBaby('${baby.id}')">Choose Baby</button>
    </div>
    <p class="babyName">${baby.name}<br>HP=${baby.health}</p>
    <p><u>Action 1:</u><br>${baby.action1.name}<br><u>Action 2:</u><br>${baby.action2.name}<br><u>Action 3:</u><br>${baby.action3.name}</p>
    `
    babyContainer.appendChild(babyCard)
}
const chooseBaby = (id) => {
    // baby1.innerHTML = ``
    axios.get(`${baseURL}?ID=${id}`)
    .then((res) => {
        // console.log(res.data[id-1])
        ringBaby(res.data[id-1])
        globalThis.baby = res.data[id-1]
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
        globalThis.opponent = res.data[id]
        showOpponent(opponent)
    })
    .catch(err => console.log(err))
}
function showOpponent(baby) {
    baby2.innerHTML = `
    <p class="babyName2">${baby.name}</p>
    <img alt="baby picture" src="${baby.imageURL}" class="babyPicture2"/>
    `
}
const chooseAction = (num, id) => {
    axios.get(`${baseURL}?=${id}`)
    .then((res)=> {
        actionSelected(num, res.data[id])
    })
    .catch(err=> console.log(err))
}
function actionSelected(num, baby){
    if(num === 1){
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
        duelBtn.innerHTML = `<button id="duelBtn" onclick="pressDuel('${baby.action1.class}', opponent)">Duel!</button>`
    }else if(num===2){
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
        duelBtn.innerHTML = `<button id="duelBtn" onclick="pressDuel('${baby.action2.class}', opponent)">Duel!</button>`
    }else if(num===3){
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
        duelBtn.innerHTML = `<button id="duelBtn" onclick="pressDuel('${baby.action3.class}', opponent)">Duel!</button>`
    }
}
const pressDuel = async(act1, opponent) => {
    let choice = (Math.floor(Math.random()*3)+1).toString()
    let url = "action"+choice+"URL"
    let action = "action"+(choice)
    baby2.innerHTML = `
    <p class ="babyName2">${opponent.name}</p>
    <br>
    <img alt="baby picture" src="${opponent[url]}" class="babyPicture1"/>
    <p id="action">${opponent[action].name}</p>
    `
    setTimeout(() => {
        startDuel(act1, choice)
    }, 1000)

    setTimeout(() => {
        duel(act1, choice)
    }, 3000)
}
const duel = async(player, comp) => {
    if(player == comp){
        tieGame()
    }else if(player == 1){
        if(comp == 2){
            computerWins()
        }else if(comp == 3){
            playerWins()
        }
    }else if(player == 2){
        if(comp == 1){
            playerWins()
        }else if(comp == 3){
            computerWins()
        }
    }else if(player == 3){
        if(comp == 1){
            computerWins()
        }else if(comp == 2){
            playerWins()
        }
    }
}
const startDuel = (player, computer) => {
    let myAction = baby["action"+player+"URL"]
    let myActionName = baby["action"+player].name
    let compAction = opponent["action"+computer+"URL"]
    let compActionName = opponent["action"+computer].name
    
    document.getElementById('player1img').src = myAction
    document.getElementById('player2img').src = compAction
    document.getElementById('p1Name').textContent = myActionName
    document.getElementById('p2Name').textContent = compActionName

    let fade1 = baby1
    let fade2 = baby2
    const fadeEffect = setInterval(function() {
        if(!fade1.style.opacity){
            fade1.style.opacity = 1
        }if(fade1.style.opacity>0){
            fade1.style.opacity -= 0.2
        }if(!fade2.style.opacity){
            fade2.style.opacity = 1
        }if(fade2.style.opacity>0){
            fade2.style.opacity -= 0.2
        }else {
            clearInterval(fadeEffect)
        }
    }, 50)
}
function playerWins(){
    duelBtn.innerHTML = `
    <div class="winner">
    <p>The Winner Is...</p>
    <img src="${baby.imageURL}" id="victor"/>
    <p class="babyName2">${baby.name}</p>
    </div>
    `
    setTimeout(() => {
        playAgain()
    }, 3000)
}
function computerWins(){
    duelBtn.innerHTML = `
    <div class="winner">
    <p>The Winner Is...</p>
    <img src="${opponent.imageURL}" id="victor"/>
    <p class="babyName2">${opponent.name}</p>
    </div>
    `
    setTimeout(() => {
        playAgain()
    }, 3000)
}
function tieGame(){
    duelBtn.innerHTML = `
    <div class="winner">
    <p>The Winner Is...</p>
    <img src="/public/images/baby-pouting.png" id="victor"/>
    <p class="babyName2">Tie Game</p>
    </div>
    `
    setTimeout(() => {
        playAgain()
    }, 2400)
}
function playAgain(){
    duelBtn.innerHTML +=`
    <div class="reset">
    <button id="reset" onclick="resetRing()">Play Again</button>
    </div>
    `
}
function resetRing(){
    document.querySelector("#player1").innerHTML = `
    <img src="" id="player1img"/>
    <p id="p1Name"></p>
    `
    document.querySelector("#player2").innerHTML =`
    <img src="" id="player2img"/>
        <p id="p2Name"></p>
    `
    baby1.innerHTML = ``
    baby1.style.opacity = "1"
    baby2.innerHTML = ``
    baby2.style.opacity = "1"
    duelBtn.innerHTML = ``
}
function selectAction() {
    duelBtn.innerHTML = `<h4 id="selectAction">Select Your Action</h4>`
}

getAllBabies()
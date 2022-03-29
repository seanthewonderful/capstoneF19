
const baseURL = 'http://localhost:9009/api/babies'

const babyContainer = document.querySelector(".babiesContainer2")
const baby1 = document.querySelector("#baby1")
const baby2 = document.querySelector("#baby2")
const baby22 = document.querySelector("#baby22")
const duelBtn = document.querySelector(".duelBtn")

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
        globalThis.opponent = res.data[id]
        showOpponent(opponent)
    })
    .catch(err => console.log(err))
}
function showOpponent(baby) {
    console.log(`${baby.id}`)
    console.log(opponent)
    baby2.innerHTML = `
    <p class="babyName2">${baby.name}</p>
    <img alt="baby picture" src="${baby.imageURL}" class="babyPicture2"/>
    `
}

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
        duelBtn.innerHTML = `<button id="duelBtn" onclick="pressDuel('${baby.action1.class}', opponent)">Duel!</button>`
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
        duelBtn.innerHTML = `<button id="duelBtn" onclick="pressDuel('${baby.action2.class}', opponent)">Duel!</button>`
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
        duelBtn.innerHTML = `<button id="duelBtn" onclick="pressDuel('${baby.action3.class}', opponent)">Duel!</button>`
    }
}

const pressDuel = async(act1, opponent) => {
    let choice = (Math.floor(Math.random()*3)+1).toString()
    let url = "action"+choice+"URL"
    let action = "action"+(choice)
    console.log(act1, choice)
    baby2.innerHTML = `
    <p class ="babyName2">${opponent.name}</p>
    <br>
    <img alt="baby picture" src="${opponent[url]}" class="babyPicture1"/>
    <p id="action">${opponent[action].name}</p>
    `
    setTimeout(() => {
        duel(act1, choice)
    }, 3000)
}
const duel = async(act1, choice) => {
    console.log(act1, choice)
    // alert("begin")
    if(act1 == choice){
        alert("Tie Game Set Match")
    }else if(act1 == 1){
        if(choice == 2){
            // computerWins()
            alert("Computer beat you, what a loser")
            return
        }else if(choice == 3){
            // playerWins()
            alert("You Win you glorious bastard")
            return
        }
    }else if(act1 == 2){
        if(choice == 1){
            // playerWins()
            alert("You Win you glorious bastard")
            return
        }else if(choice == 3){
            // computerWins()
            alert("Computer beat you...pathetic")
            return
        }
    }else if(act1 == 3){
        if(choice == 1){
            // computerWins()
            alert("Computer wins hehehehehe")
            return
        }else if(choice == 2){
            // playerWins()
            alert("You Win you glorious bastard")
            return
        }
    }
}

function playerWins(){

}
function computerWins(){

}

// function showDuelBtn() {
//     duelBtn.innerHTML = `<button id="duelBtn" onclick="pressDuel()">Duel!</button>`
// }
function selectAction() {
    duelBtn.innerHTML = `<h4 id="selectAction">Select Your Action</h4>`
}


getAllBabies()
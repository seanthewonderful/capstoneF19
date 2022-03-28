

const baseURL = 'http://localhost:9009/api/babies'

const babyContainer = document.querySelector(".babiesContainer2")
const baby1 = document.querySelector("#baby1")
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
    // baby1.innerHTML = ``
    // const babyReady = document.createElement('div')
    // babyReady.classList.add("baby1div")
    baby1.innerHTML = 
    `<img alt="baby picture" src="${baby.imageURL}" class="babyPicture"/>
    <p class ="babyName">${baby.name}</p>
    <div class ="actionButtons" id="id${baby.id}">
        <button class="action1Btn" onclick="chooseAction(1)">${baby.action1.name}</button>
        <button class="action2Btn" onclick="chooseAction(2)">${baby.action2.name}</button>
        <button class="action3Btn" onclick="chooseAction(3)">${baby.action3.name}</button>
    </div>
    `
    // baby1.appendChild(babyReady)
}


getAllBabies()
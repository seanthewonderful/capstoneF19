const baseURL = 'http://localhost:9009/api/babies'

const newBaby = document.querySelector(".newBaby")
const submit = document.querySelector("#submit")
const babyContainer = document.querySelector(".babiesContainer")

// const createNewBaby = (body) => {
//     axios.post(baseURL, body)
//     .then(babyCallback).catch(err=> console.log(err))
// }
const getAllBabies = () => {
    console.log("Hello")
    axios.get(`${baseURL}`)
    .then((res) => {
        console.log(res)
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
    <p class="babyName">${baby.name}<br>HP=${baby.health}</p>
    <p><u>Action 1:</u><br>${baby.action1.name}<br><u>Action 2:</u><br>${baby.action2.name}<br><u>Action 3:</u><br>${baby.action3.name}</p>
    `
    babyContainer.appendChild(babyCard)
}

function submitHandler(e){
    e.preventDefault()
    let name = document.querySelector("#newBabyInput")
    let image = document.querySelector("#newBabyURL")
    let a1 = document.getElementById("newBabyAction1")
    let a2 = document.getElementById("newBabyAction2")
    let a3 = document.getElementById("newBabyAction3")
    let babyObj = {
        name: name.value,
        health: 100,
        imageURL: image.value,
        action1URL: image.value,
        action1: {
            class: 1,
            name: a1.value
        },
        action2URL: image.value,
        action2: {
            class: 2,
            name: a2.value
        },
        action3URL: image.value,
        action3: {
            class: 3,
            name: a3.value
        }
    }
    console.log("submitted")
    axios.post(baseURL, babyObj)
    .then(getAllBabies)
    .catch(err=> console.log(err))
}

getAllBabies()
submit.addEventListener("click", submitHandler)
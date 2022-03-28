const baseURL = 'http://localhost:9009/api/babies'

const babyContainer = document.querySelector(".babiesContainer2")

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
    // console.log(baby)
    // let action1 = baby.action1.name
    // console.log(typeof action1)
    const babyCard = document.createElement('div')
    babyCard.classList.add("babiesCard")
    babyCard.innerHTML += `<img alt="baby picture" src=${baby.imageURL} class="babyPicture"/>
    <div class="babyButtonContainer" id="id${baby.id}">
        <button class="choose" onclick="chooseBaby()">Choose Baby</button>
    </div>
    <p class="babyName">${baby.name}<br>HP=${baby.health}</p>
    <p><u>Action 1:</u><br>${baby.action1.name}<br><u>Action 2:</u><br>${baby.action2.name}<br><u>Action 3:</u><br>${baby.action3.name}</p>
    `
    babyContainer.appendChild(babyCard)
}

getAllBabies()
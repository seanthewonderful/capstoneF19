const baseURL = 'http://localhost:9009/api/babies'

const getAll = document.querySelector("#getBabies")
const babyContainer = document.querySelector(".babiesContainer")

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
    babyCard.innerHTML += `<img alt="baby picture" src=${baby.imageURL} class="babyPicture"/>
    <p class="babyName">${baby.name}<br>HP=${baby.health}</p>
    <div class="babyButtonContainer" id="id${baby.id}">
        <button class="show" onclick="showStats('${baby.id}', '${baby.action1.name}', '${baby.action2.name}', '${baby.action3.name}')">Show Stats</button>
    </div>
    `
    babyContainer.appendChild(babyCard)
}

function showStats(id,p1,p2,p3){
    document.querySelector(".show").style.display = "none"
    document.querySelector(`#id${id}`).innerHTML +=
    `<p><u>Action 1:</u><br>${p1}<br><u>Action 2:</u><br>${p2}<br><u>Action 3:</u><br>${p3}</p>`
}


getAll.addEventListener("click", getAllBabies)
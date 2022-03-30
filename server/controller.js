const babies = require("./db.json")
let globalID = 10

module.exports = {
    getBabies: (req, res) => {
        res.status(200).send(babies)
    },
    createBaby: (req, res) => {
        let newBaby = req.body
        newBaby.id = globalID
        babies.push(newBaby)
        res.status(200).send(babies)
        globalID++
    }
}
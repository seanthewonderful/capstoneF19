const babies = require("./db.json")

module.exports = {
    getBabies: (req, res) => {
        res.status(200).send(babies)
    }
}
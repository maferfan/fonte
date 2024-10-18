const { Users } = require("../models/Users");

const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ["id", "name", "email"]
        });
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
    }
}


module.exports = {getUsers};

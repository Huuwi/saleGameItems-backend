const api = require("express").Router()
const CommonController = require("../controller/common.controller.js")
const AuthController = require("../controller/auth.controller.js")

let commonController = new CommonController()
let authController = new AuthController()

api.get("/", (req, res) => {
    const forwardedIp = req.headers['x-forwarded-for'] || req.ip
    res.cookie("test", "test")
    res.status(200).json(
        {
            message: "your ip address : " + forwardedIp
        }
    )
})

api.post("/getNewCaptcha", commonController.getNewCaptcha)
api.post("/login", authController.login)
api.post("/register", authController.register)


module.exports = { api }
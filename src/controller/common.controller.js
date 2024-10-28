const CommonHelper = require("../helper/common.helper.js")
let commonHelper = new CommonHelper()


class CommonController {

    async getNewCaptcha(req, res) {

        try {

            let ipAddress = req.headers["x-forwarded-for"] || req.ip

            if (!ipAddress) {
                return res.status(400).json({
                    message: "not found ip address!"
                })
            }

            let captchaData = await commonHelper.generatorCaptcha(ipAddress)

            if (!captchaData?.state) {
                throw new Error("unknown error when generatorCaptcha")
            }

            return res.status(200).json({
                message: "ok!",
                base64: captchaData.base64
            })



        } catch (error) {

            console.log("error when getNewCaptcha :  ", error);
            return res.status(500).json({
                message: "have wrong!"
            })

        }

    }

    async getSalingItemList(req, res) {
        try {
            let salingItemListData = await globalThis.connection.executeQuery('SELECT * FROM item WHERE isSaling = 1')
                .then(data => { return data })
                .catch(err => console.log(err))
            if (!salingItemListData?.length) {
                return res.status(501).json({
                    message: 'Cannot get salingItemListData'
                })
            }
            return res.status(200).json({
                message: 'ok',
                salingItemListData
            })
        }
        catch (err) {
            console.log(`Error when getSalingItemList: ${err}`);
            res.status(500).json({
                message: 'Have wrong'
            })
        }
    }
}


module.exports = CommonController




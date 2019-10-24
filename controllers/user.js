const User = require('../models/User')


exports.createUser = async (req, res, next) => {

    try {

       const { name, email} = req.body;

       if (!name || !email) {
           return res.status(404).json({
               success: false,
               error: "name and email are required"
           })
       }
        const user = await User.create(req.body)

        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "invalid credentials"
        })
    }
}
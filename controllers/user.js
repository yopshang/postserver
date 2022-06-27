// models
const userModel = require('../models/user');

const userController = {
    // login:async function (req, res){
    //         const users = await userModel.find({email:req.body.email});
    //         const token = await jwt.
    //         res.status(200).json({
    //             status: 'success',
    //             token: token
    //         });
    // },
    add_user:async function (req, res){
        // const password =  await bcrypt.hash(req.body.password, 12);

        const user = await userModel.create({
            name: req.body.name,
            email: req.body.email,
        })
        res.status(200).json({
            status: 'success',
            user: {
                name: req.body.name
            }
        });
        // generateJWT(user, 200, res);
    }

}

module.exports = userController;

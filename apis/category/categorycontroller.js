const usermodel = require('../user/usermodel')
const bcrypt = require('bcrypt')
const saltRoutes = 10

module.exports = {login}

async function login(req,res){
    let validation = []
    if(!req.body.email){
        validation.push('email')
    }
    if(!req.body.password){
        validation.push('password')
    }
    if(validation.length>0){
        res.send({
            success:false,
            status:400,
            message:validation.join(',')+" is/are required"
        })
    }
    else{
        let existinguser = await usermodel.findOne({email:req.body.email})
            if(!existinguser){
                res.send({
                    success:false,
                    status:409,
                    message:"user doesn't exist"
                })
            }
            else{
                let match = bcrypt.compareSync(req.body.password,existinguser.password)
                if(!match){
                    res.send({
                        success:false,
                        status:400,
                        message:"invaild credentials"
                    })
                }
                else{
                    res.send({
                        success:true,
                        status:200,
                        message:"login successfully"
                    })
                }
            }
    }
}

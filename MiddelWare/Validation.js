const {body,validationResult}=require('express-validator')

const signupRules=()=>[

    body('Name','user name is required').notEmpty(),
    body('LastName','LastName is required').notEmpty(),
    body('email','Email not valid').isEmail(),
    body('password','password invalid').isLength({
        min:5,
        max:20
    }),
]

const loginRules=()=>[
 body('email','Email not valid').isEmail(),
 body('password','Pasword invalid').isLength({
    min:5,
    max:20
 }),
]




const validation=async(req,res,next)=>{
    const error=validationResult(req)
    if(error.isEmpty()){
     return  next()
    }
    return res.status(400).send({error:error.array()})
}

module.exports={signupRules,loginRules,validation}
const { StatusCodes } = require('http-status-codes')
const {registerModel,loginModel}=require('../model/auth.js')
const {crypt,compare}=require('../utils/hash.js')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const {makeDb}=require('../library/db.js')
const jwt=require('jsonwebtoken')

const register =async (req, res) => {
    if (!req.body) {
    return  res.status(400).send({
        message: "Content can not be empty!"
      });
    }
   const response=await registerModel(req.body)
   if(response.success){
    return res.status(StatusCodes.CREATED).json(response)
   }else{
    console.log(response);
    return res.status(StatusCodes.BAD_REQUEST).json(response)
   }
  };



const login=async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.send("please provide your credentilas")
    }
    try {
        const rslt=await loginModel(email)
        let [obj]=rslt.rows
        if(rslt.success){
            if(!obj){
                return  res.status(401).json("your not authorized to access this route")
                }
              const isMatch=await compare(obj.password,password)
                if(!isMatch){
                return  res.status(401).json("please verify your password")
                }
                const token=jwt.sign({id:obj.id,name:obj.username},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFE})
                  return  res.status(StatusCodes.OK).json({response:obj,token})
        }
    } catch (error) {
        return  res.status(500).json({error})
    }
       }
    
module.exports={
    register,login
}
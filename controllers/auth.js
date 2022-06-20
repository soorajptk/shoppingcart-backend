const { StatusCodes } = require('http-status-codes')
const User=require('../model/user.js')
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
    const password=await crypt(req.body.password)
    let qry="INSERT INTO customer SET ?"
    try {
        const rows = await makeDb().query(qry,{...req.body,password});
       return res.send({id:rows.insertId,...req.body,password})
    } catch (error) {
      return  res.status(500).send(error)        
    }
  };



const login=async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.send("please provide your credentilas")
        // throw new BadRequestError('please provide your credentials')
    }
    let qry='SELECT * FROM customer WHERE email=?'
    try {
        const rows = await makeDb().query(qry,email);
        const [obj]=rows;
        if(!obj){
            return  res.status(401).json("your not authorized to access this route")
            // throw new BadRequestError("your not authorized to access this route")       
            }
          const isMatch=await compare(obj.password,password)
            if(!isMatch){
            return  res.status(401).json("please verify your password")
                // throw new UnauthenticatedError("please verify your password")
            }
            console.log(obj.username);
            const token=jwt.sign({id:obj.id,name:obj.username},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFE})
              return  res.status(StatusCodes.OK).json({response:obj,token})
         
    } catch (error) {
        return  res.status(500).json({error})

    }
       }
    
module.exports={
    register,login
}
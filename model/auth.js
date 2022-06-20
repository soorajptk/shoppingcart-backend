const {crypt,compare}=require('../utils/hash.js')
const {makeDb}=require('../library/db.js')

  const registerModel=async(rgstr)=>{
  try {
    const password=await crypt(rgstr.password)
      let qry="INSERT INTO customer SET ?"
          const rows = await makeDb().query(qry,{...rgstr,password});
        return {success:true,id:rows.insertId,...rgstr,password}
  } catch (error) {
    return {success:false,error:"Registration failed"}
  }
  }

  const loginModel=async(loginCred)=>{
    try {
      let qry='SELECT * FROM customer WHERE email=?'
          const rows = await makeDb().query(qry,loginCred);
          return {success:true,rows}
        } catch (error) {
      return {success:false,error:"login failed"}

    }
  }
module.exports = {registerModel,loginModel};
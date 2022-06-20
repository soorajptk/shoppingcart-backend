const bcrypt=require('bcryptjs')
const crypt=async(password)=>{
    const salt=await bcrypt.genSalt(10)
    const pass=await bcrypt.hash(password,salt)
    return pass

}
const compare=async function(password,currentpassword){
    return await bcrypt.compare(currentpassword,password)
}
module.exports={crypt,compare}
class UsersController {
  async getAllUsers(req,res){
    try {
      const allUsers = await req.app.services.users.getAllUsers()
      res.status(200).json(allUsers)
    } catch (error) {
      console.log(error);
      res.status(500).json({message:error.message})
    }
  }

  async saveUsers (req,res){
  const {body} = req
  try {
    const user = await req.app.services.users.saveUsers(body)
    res.status(200).json({message:"User Successfully Created",data:user})
  } catch (error) {
    console.log(error);
      res.status(500).json({message:error.message})
    }
  }

  async getUserById(req,res){
    try {
      const {id} = req.params
      const userExist = await req.app.services.users.getUserById(id)
      if(!userExist){
        return res.status(404).json({message:"user  not found"})
      }
      res.status(200).json(userExist)
    } catch (error) {
      res.status(500).json({errorMessage:error.messasge})
    }
  }

  async deleteById (req,res){
    const {id} = req.params
    try {
      const deletedUser = await req.app.services.users.deleteById(id)
     if(deletedUser.deletedCount === 1){
       return res.status(200).json({message:"User Successfully Deleted"})
     }
      return res.status(404).json({ message: "Product not found" })
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    } 
  }

  async updateById (req,res){
    const {id} = req.params
    const {body} = req
    try {
      const updateUser = await req.app.services.users.updateById(id,body)
      res.status(200).json({message:'User Updated'})
    } catch (error) {
      console.log(error);
      res.status(500).json(error)

    }
  }
}


module.exports = UsersController
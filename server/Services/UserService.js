class UsersService {
  constructor(models){
    this.models = models
  }
  async getAllUsers (){
    const allUsers = await this.models.users.find()
    if(allUsers.length === 0){
      return {message:'This is so bad',data:allUsers}
    }
    return {message:'Good Request',data:allUsers}
  }

  async saveUsers(body){
    const user = new this.models.users({...body})
    await user.save()
    return user
  }

  async deleteById(id){
    const deletedUser = await this.models.users.deleteOne({_id:id})
    return deletedUser
  }

  async getUserById(id){
    const user = await  this.models.users.findOne({_id:id})
    if (!user) {
      return { message: 'User not found', data: null };
    }
    return { message: 'User retrieved successfully', data: user };
  } catch (error) {
    return { message: 'Error retrieving user', error: error.message };
  }

  async updateById(id,body){
      const updateUser = await this.models.users.updateOne({_id:id},  {$set:{...body}})
      return updateUser
    }
}

module.exports = UsersService

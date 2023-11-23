import { TUser } from "./user.interface";
import { User } from "./user.model";



const creatUserIntoDB = async (user:TUser) =>{
   const result =  await User.create(user)
   return result;
}

const getAllUserFromDB = async () =>{
    const result = await User.find();
    return result
}

export const userServices = {
    creatUserIntoDB,
    getAllUserFromDB
}
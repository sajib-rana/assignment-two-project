import { TUser } from "./user.interface";
import { User } from "./user.model";



const creatUserIntoDB = async (userData:TUser) =>{
    
    if(await User.isUserExists(userData.userId)){
        throw new Error('are beta user already exist');
    }
     const result =  await User.create(userData)

   return result;
}

const getAllUserFromDB = async () =>{
    const result = await User.find();
    return result
}
const getSingleUserFromBD = async (id:number) =>{
    const result = await User.findOne({userId:id});
    return result
}

export const userServices = {
    creatUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromBD
}
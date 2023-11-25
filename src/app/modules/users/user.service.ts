import { TOrder, TUser } from "./user.interface";
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
const getSingleUserFromBD = async (userId:number) =>{
    const result = await User.findOne({userId:userId});
    return result
}

const updateUserInDB = async (userId: number) => {
  const result = await User.findOne({ userId });
  return result;
}; 

const deleteUserFromDB = async (userId: number)=>{
    const result = await User.deleteOne({userId:userId});
    return result;
} 
const ordersCreateIntoDB = async (userId: number, order: TOrder) => {
  const result = await User.updateOne(
    { userId },
    { $addToSet: { orders: order } },
  );
  return result;
}; 
const getUserAllOrders = async (userId: number) => {
  const result = await User.findOne({userId})
  return result;
}; 
const calculatePriceIntoDB = async (userId: number) => {
  const result = await User.findOne({userId})
  return result;
}; 

export const userServices = {
    creatUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromBD,
    deleteUserFromDB,
    ordersCreateIntoDB,
    calculatePriceIntoDB,
    getUserAllOrders,
    updateUserInDB
}
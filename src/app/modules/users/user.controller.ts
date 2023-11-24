import { Request, Response } from "express";
import { userServices } from "./user.service";



const createUser = async (req : Request,res : Response)=>{
   try{
     const user = req.body.user;
    const result = await userServices.creatUserIntoDB(user);
    
    res.status(200).json({
        success:true,
        message:'user created successfully',
        data:result   
    })
   }
   catch(err:any){
    res.status(500).json({
        success:false,
        message: err.message || 'something wrong',
        error:err
   })
   }
}
const getAllUser = async (req : Request,res : Response)=>{
   try{
    const result = await userServices.getAllUserFromDB();
    res.status(200).json({
        success:true,
        message:'Users fetched successfully!',
        data:result   
    })
   }
   catch(err:any){
    res.status(500).json({
        success:false,
        message: err.message ||'something wrong',
        error:err
   })
   }
}

const getSingleUser = async(req:Request,res:Response) =>{
       try{
        const userId = Number(req.params.userId);
        const result = await userServices.getSingleUserFromBD(userId)
        res.status(200).json({
        success:true,
        message:'User fatched successfully',
        data:result
    })
       }
       catch(err:any){
        res.status(500).json({
        success:false,
        message: err.message ||'User not found',
        error:{
            code:404,
            description:'user not found'
        }
   })
       }
}

export const userControllers = {
    createUser,
    getAllUser,
    getSingleUser
}
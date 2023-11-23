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
   catch(err){
    res.status(500).json({
        success:false,
        message: 'something wrong',
        error:err
   })
   }
}

export const userControllers = {
    createUser
}
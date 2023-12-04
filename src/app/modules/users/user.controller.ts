import { Request, Response } from 'express';
import { userServices } from './user.service';
import { OrderSchema, UserSchema, UserZodModel } from './user.validation';



const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const zodParseData = UserZodModel.parse(user);
    const result = await userServices.creatUserIntoDB(zodParseData);

    res.status(200).json({
      success: true,
      message: 'user created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something wrong',
      error: err,
    });
  }
};
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something wrong',
      error: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await userServices.getSingleUserFromBD(userId);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'User fatched successfully',
        data: result,
      });
    } else {
      res.json({
        error: {
          code: 404,
          description: 'user not found',
        },
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something wrong',
      error: err,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    await userServices.deleteUserFromDB(userId);
    
        res.status(200).json({
        success: true,
        message: 'User deleted successfully',
        data: null,
      });
    
  } catch (err:any) {
     res.status(500).json({
       success: false,
       message: err.message || 'something wrong',
       error: err,
     });
  }
};

const addOrderToUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const orderData = req.body;
    const zodPerData = OrderSchema.parse(orderData)
    await userServices.ordersCreateIntoDB(userId,zodPerData);
    
     res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
    }
    catch (err:any) {
    res.status(500).json({
      success: false,
      message: err.message,
       err,
    });
  }
};

const calculateTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const user = await userServices.calculatePriceIntoDB(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        data: null,
      });
    }
  
    const totalPrice = user?.orders?.reduce(
      (sum, order) => sum + order.price * order.quantity,
      0,
    );

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: totalPrice?.toFixed(2), 
      },
    });
  } catch (err:any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something wrong',
      error: err,
    });
  }
};
const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const user = await userServices.getUserAllOrders(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        data: null,
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'All orders are Here',
      data: user.orders
    });
  } catch (err:any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something wrong',
      error: err,
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const updatedData = req.body;
    const user = await userServices.updateUserInDB(userId,updatedData);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: 'All updated data are Here',
      data: user,
    });
  } catch (err:any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something wrong',
      error: err,
    });
  }
};


export const userControllers = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteUser,
  addOrderToUser,
  calculateTotalPrice,
  getUserOrders,
  updateUser
};

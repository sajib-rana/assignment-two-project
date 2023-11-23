import { Schema, model } from "mongoose";
import validator from 'validator';
import { TAddress, TFullName, TOrder, TUser } from "./user.interface";

const FullNameSchema = new Schema<TFullName>({
  firstName:{type:String,
            required:[true,'first name is required'],
            trim:true,
            maxlength:[20,'first name can not be more than 20 character'],
            validate:{
                validator:function(value:string){
                    const firstNameStr = value.charAt(0).toUpperCase()+value.slice(1)
                    return firstNameStr === value;
                },
                message:'{VALUE} is not capitalize format'
            }
        },
  lastName: {type:String,
             required:[true,'last name is required also'],
             trim:true,
              maxlength:[20,'last name can not be more than 20 character'],
              validate:{
                validator:(value:string)=>validator.isAlpha(value),
                message:'{VALUE} is not valid'
            }
       },
});

const AddressSchema = new Schema<TAddress>({
  street:{type: String},
  city: {type:String},
  country: {type:String},
});

const OrderSchema = new Schema<TOrder>({
  productName: {type:String},
  price: {type:Number},
  quantity: {type: Number},
});

const UserSchema = new Schema<TUser>({
  userId: {type:Number,unique:true},
  username: {type: String,unique:true},
  password: {type: String},
  fullName: FullNameSchema,
  age: {type: Number},
  email: {type: String},
  isActive: {type: Boolean},
  hobbies: [String],
  address: AddressSchema,
  orders: [OrderSchema],
});

export const User = model('User', UserSchema);
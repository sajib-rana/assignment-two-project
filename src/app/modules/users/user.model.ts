import { Schema, model } from "mongoose";
import validator from 'validator';
import bcrypt from 'bcrypt'
import { TAddress, TFullName, TOrder, TUser, userModel } from "./user.interface";
import config from "../../config";

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
  street:{type: String,required:true},
  city: {type:String,required:true},
  country: {type:String,required:true},
});

const OrderSchema = new Schema<TOrder>({
  productName: {type:String,required:true},
  price: {type:Number,required:true},
  quantity: {type: Number,required:true},
});

const UserSchema = new Schema<TUser,userModel>({
  userId: {type:Number,unique:true,required:true},
  username: {type: String,unique:true,required:true},
  password: {type: String,required:true},
  fullName: {type:FullNameSchema,required:true},
  age: {type: Number,required:true},
  email: {type: String,required:true},
  isActive: {type: Boolean},
  hobbies: [String],
  address: {type:AddressSchema,required:true},
  orders: [OrderSchema],
});

UserSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
}

UserSchema.pre('save', async function(next){
 // eslint-disable-next-line @typescript-eslint/no-this-alias
const user = this;
 user.password = await bcrypt.hash(user.password,Number(config.bcrypt_salt_rounds))
 next()
})

UserSchema.pre('find',function(next){
    this.find().projection({username:1,fullName:1,age:1,email:1,address:1})
    next();
})

UserSchema.statics.isUserExists = async function(userId:number){
 const existingUser = await User.findOne({userId});
    return existingUser;
}

export const User = model<TUser,userModel>('User', UserSchema);
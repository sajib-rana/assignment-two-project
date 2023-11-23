import { Schema, model } from "mongoose";
import { TAddress, TFullName, TOrder, TUser } from "./user.interface";

const FullNameSchema = new Schema<TFullName>({
  firstName: String,
  lastName: String,
});

const AddressSchema = new Schema<TAddress>({
  street: String,
  city: String,
  country: String,
});

const OrderSchema = new Schema<TOrder>({
  productName: String,
  price: Number,
  quantity: Number,
});

const UserSchema = new Schema<TUser>({
  userId: Number,
  username: String,
  password: String,
  fullName: FullNameSchema,
  age: Number,
  email: String,
  isActive: Boolean,
  hobbies: [String],
  address: AddressSchema,
  orders: [OrderSchema],
});

const User = model('User', UserSchema);
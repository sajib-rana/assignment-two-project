import { z } from 'zod';
import validator from 'validator';

const FullNameSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(20, { message: 'First name cannot be more than 20 characters' })
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      { message: 'First name must be in capitalize format' },
    ),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .max(20, { message: 'Last name cannot be more than 20 characters' })
    .refine((value) => validator.isAlpha(value), {
      message: 'Last name is not valid',
    }),
});

const AddressSchema = z.object({
  street: z.string().min(1, { message: 'Street is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
});

export const OrderSchema = z.object({
  productName: z.string().min(1, { message: 'Product name is required' }),
  price: z
    .number()
    .min(0, { message: 'Price must be greater than or equal to 0' }),
  quantity: z
    .number()
    .min(1, { message: 'Quantity must be greater than or equal to 1' }),
});

export const UserSchema = z.object({
  userId: z.number(),
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  fullName: FullNameSchema,
  age: z.number().min(0, { message: 'Age must be greater than or equal to 0' }),
  email: z.string().email({ message: 'Invalid email address' }),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: AddressSchema,
  orders: z.array(OrderSchema).optional(),
});

export const UserZodModel = UserSchema;

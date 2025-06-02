import mongoose, { Document, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    roles: [{ type: String, required: true }],
    isDesigner: { type: Boolean, required: true },
    status: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export type UserRoles = 'ADMIN' | 'USER';

export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  roles: UserRoles[];
  isDesigner: boolean;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;

import mongoose, { Document, Schema } from 'mongoose';

const SessionSchema = new Schema(
  {
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export interface ISession extends Document {
  _id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const SessionModel = mongoose.model<ISession>('Session', SessionSchema);

export default SessionModel;

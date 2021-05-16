import mongoose from 'mongoose';
import { Password } from '../utils';

/**
 * @interface UserType
 * That describes the properties that are required to create a new User
 */
interface UserType {
  email: string;
  password: string;
}

/**
 * @interface UserModel
 * That describes the properties that a User Model has
 */
interface UserModel extends mongoose.Model<UserDoc> {
  createUser(attr: UserType): UserDoc;
}

/**
 * @interface UserDoc
 * That describes the properties that a User document has
 */
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      versionKey: false,
      transform(_, ret) {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
      },
    },
  }
);

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  next();
});

UserSchema.statics.createUser = (user: UserType) => new User(user);

const User = mongoose.model<UserDoc, UserModel>('users', UserSchema);

export default User;

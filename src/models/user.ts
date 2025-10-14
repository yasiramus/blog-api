import { Schema, model, Document } from 'mongoose';

import bcrypt from 'bcrypt';

/**type */
export type UserRole = 'admin' | 'user';
export interface IUser {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  socialLinks?: {
    website?: string;
    x?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
    tiktok?: string;
  };
  matchPassword(enteredPassword: string): Promise<boolean>;
}

//URL field with custom messages
const createUrlField = (platform: string) => ({
  type: String,
  maxLength: [100, `${platform} Profile URL cannot exceed 100 characters`],
  match: [/^https?:\/\/.+/, `Invalid ${platform} URL format`],
});

//Sub schema for social links (dynamic + readable)
const socialLinksSchema = new Schema(
  {
    website: createUrlField('Website'),
    x: createUrlField('X'),
    facebook: createUrlField('Facebook'),
    instagram: createUrlField('Instagram'),
    youtube: createUrlField('YouTube'),
    linkedin: createUrlField('LinkedIn'),
    tiktok: createUrlField('TikTok'),
  },
  { _id: false },
);

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required'],
      maxLength: [20, 'Username cannot exceed 20 characters'],
      unique: [true, 'Username must be unique'],
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Email is required'],
      maxLength: [50, 'Email cannot exceed 50 characters'],
      unique: [true, 'Email must be unique'],
      validate: {
        validator: (value: string) => /^\S+@\S+\.\S+$/.test(value),
        message: 'Invalid email format',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: '{VALUE} is not supported',
      },
      default: 'user',
    },
    firstName: {
      type: String,
      maxLength: [20, 'First name cannot exceed 20 characters'],
    },
    lastName: {
      type: String,
      maxLength: [20, 'Last name cannot exceed 20 characters'],
    },
    socialLinks: socialLinksSchema,
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
    return;
  }

  //hash password
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Custom method for password comparison
userSchema.methods.matchPassword = async function (
  enteredPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = model<IUser>('User', userSchema);

export default User;

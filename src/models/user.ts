import { Schema, model } from "mongoose";

/**type */
export interface IUser {
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'user'
    firstName?: string;
    lastName?: string
    socialLinks?: {
        website?: string
        x?: string;
        facebook?: string;
        instagram?: string;
        youtube?: string;
        linkedin?: string;
        tiktok?: string
    }
};

//URL field with custom messages
const createUrlField = (platform: string) => ({
    type: String,
    maxLength: [100, `${platform} Profile URL cannot exceed 100 characters`],
    match: [/^https?:\/\/.+/, `Invalid ${platform} URL format`]
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
        tiktok: createUrlField('TikTok')
    },
    { _id: false }
);

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        trim: true,
        required: [true, 'Username is required'],
        maxLength: [20, 'Username cannot exceed 20 characters'],
        unique: [true, 'Username must be unique'],
        set: (v: string) => v.toLowerCase()
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
            message: 'Invalid email format'
        }
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password is required'],
        select: false
    },
    role: {
        type: String,
        // The role field is not required; it defaults to 'user'
        enum: {
            values: ['admin', 'user'],
            message: '{VALUE} is not supported'
        },
        default: 'user'
    },
    firstName: {
        type: String,
        maxLength: [20, 'First name cannot exceed 20 characters']
    },
    lastName: {
        type: String,
        maxLength: [20, 'Last name cannot exceed 20 characters']
    },
    socialLinks: socialLinksSchema
},
    { timestamps: true }
);

// Indexes for performance
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });

const User = model<IUser>('User', userSchema);

export default User;
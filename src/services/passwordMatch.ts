
/**custom module */
import User from '@/models/user';

export const passwordMatch = async (value: string, { req }: any) => {
    const { email } = req.body as { email: string };

    const user = await User.findOne({ email }).select("+password").exec();
    if (!user) throw new Error("User email or password is invalid");

    const passwordMatches = await user.matchPassword(value);
    if (!passwordMatches) throw new Error("User email or password is invalid");
};
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import User from "../../../backend/models/user";
import dbConnect from "../../../backend/config/dbConnect";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        dbConnect();

        const { email, password } = credentials;
        if (!email || !password)
          throw new Error("Please enter an email or password");

        const user = await User.findOne({ email }).select("+password");
        if (!user) throw new Error("Invalid Credentials");

        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) throw new Error("Invalid Credentials");

        return Promise.resolve(user);
      },
    }),
  ],
  callbacks: {
    jwt: async (token, user) => {
      user && (token.user = user);
      return Promise.resolve(token);
    },
    session: async (session, user) => {
      session.user = user.user;
      return Promise.resolve(session);
    },
  },
});

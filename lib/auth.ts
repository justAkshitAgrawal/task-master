import connectDB from "@/utils/db";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { User } from "@/models/userModel";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as any;

        await connectDB();

        try {
          const user = await User.findOne({ email });

          const isSamePassword = await bcrypt.compare(password, user.password);

          if (!user || !isSamePassword) {
            throw new Error("Invalid credentials");
          }

          return user;
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.password = token.password;
      }

      return session;
    },

    async jwt({ token, user }) {
      // connectDB();
      if (user) {
        token.id = user.id;
        return token;
      }

      const loggedUser = await User.findById(token.id);

      // token.password = loggedUser?.password;

      return token;
    },
  },
};

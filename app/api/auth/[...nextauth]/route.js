import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import { connectToDB } from "@utils/database";

// console.log({
//   clientId: process.env.GOOGLE_ID,
//   clientSecret: process.env.GOOGLE_SECRET_KEY,
// });

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
    }),
  ],
  callbacks: {
    async session({ session }) {
      console.log("kerem");
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      // console session.user.email?
      console.log(session.user.email);
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        console.log("DB connected ");
        // chech if a user already exist
        const userExists = await User.findOne({ email: profile.email });
        console.log(`Checking for ${profile.email} in DB`);

        //if user does not exist
        if (!userExists) {
          console.log(`Creating ${profile.email} in DB`);
          await User.create({
            email: profile.email,
            username: profile.name.replaceAll(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        console.log("Before error");
      } catch (error) {
        console.log("Inside error");
        console.log(error);
        throw new Error("Sign-in process failed. Please try again later.");
      }
    },
  },
});
console.log("before export");
export { handler as GET, handler as POST };

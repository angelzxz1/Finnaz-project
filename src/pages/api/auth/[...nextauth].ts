import NextAuth from "next-auth";
import { authOptions } from "Finnaz/server/auth";

export default NextAuth(authOptions);

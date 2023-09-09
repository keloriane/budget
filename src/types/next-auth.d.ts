import NextAuth from "next-auth";


declare module "next-auth" {
    interface User {
        id: string;
        username: string;
        email: string;
        firstname: string;
        lastname: string;
    }
    interface Session {
        user: User & {username: string}
        token: { username: string; }
    }
}
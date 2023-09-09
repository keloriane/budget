import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {hash} from "bcrypt";
import * as z from "zod";


const userSchema = z.object({
    email: z.string().email(),
    username: z.string().min(3).max(20),
    password: z.string().min(6).max(100),
    firstname: z.string().min(3).max(20),
    lastname: z.string().min(3).max(20),

    })



export async function POST(req:Request) {
    try {
        const body = await req.json();
        const {email , username ,password , firstname , lastname} = userSchema.parse(body);
        const existingUserByEmail = await db.user.findUnique({
            where: {
                email
            }
        })
        const existingUserByUsername = await db.user.findUnique({
            where: {
                username
            }
        })
        if(existingUserByEmail) {
            return NextResponse.json({user:null , error: 'Email already exists'} , {status: 409})
        }
        if(existingUserByUsername) {
            return NextResponse.json({user:null , error: 'username already exists'} , {status: 409})
        }

        const hashedPassword = await hash(password , 10);
        const newUser = await db.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
                firstname,
                lastname,

            }
        })

        const {password: newUserPassword , ...user} = newUser;





        return NextResponse.json({user: user , error: null , message:"User created successfully"} ,{status: 201})
    } catch (err:any) {
        console.log(err.message)
        return NextResponse.json({ user: null, error: err.message }, { status: 500 });
    }
}
import React from "react";
import { getServerSession } from "next-auth";
import {authOptions} from "@/lib/auth";

const Admin: React.FC = async () => {
    const session = await getServerSession(authOptions)
    console.log(session);
    return (
        <div>
            <h1>Welcome {session?.user.name} </h1>
        </div>
    )
}
export default Admin;
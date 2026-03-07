import { dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";

export async function PATCH(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { name, image } = await req.json();

        const result = await dbConnect("users").updateOne(
            { email: session.user.email },
            { $set: { name, image } }
        );

        if (result.acknowledged) {
            return NextResponse.json({ message: "Profile updated successfully" });
        } else {
            return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

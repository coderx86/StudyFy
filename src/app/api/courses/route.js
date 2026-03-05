import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const courses = await dbConnect("courses").find({}).toArray();
        return NextResponse.json(courses, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch courses" },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();

        const { title, shortDescription, fullDescription, price, duration, thumbnail, instructor } = body;

        if (!title || !shortDescription || !price) {
            return NextResponse.json(
                { error: "Title, short description, and price are required" },
                { status: 400 }
            );
        }

        const course = {
            title,
            shortDescription,
            fullDescription: fullDescription || "",
            price: parseFloat(price),
            duration: duration || "Self-paced",
            thumbnail: thumbnail || "",
            instructor: instructor || "StudyFy Instructor",
            category: body.category || "General",
            createdAt: new Date().toISOString(),
        };

        const result = await dbConnect("courses").insertOne(course);

        return NextResponse.json(
            { message: "Course created successfully", id: result.insertedId.toString() },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create course" },
            { status: 500 }
        );
    }
}

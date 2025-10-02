// app/api/me/route.ts
import { getUserDetails } from "@/app/data/user/get-user-details";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getUserDetails();

    // If suspended / deleted, send JSON instead of redirect
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.status === "SUSPENDED") {
      return NextResponse.json({ error: "Account suspended" }, { status: 403 });
    }

    if (user.status === "DELETED") {
      return NextResponse.json({ error: "Account deleted" }, { status: 410 });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error("API /me error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

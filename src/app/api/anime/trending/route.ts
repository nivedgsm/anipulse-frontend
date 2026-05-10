import { NextResponse } from "next/server";
import { getTrendingAnime } from "@/lib/anilist";

export async function GET() {
  try {
    const anime = await getTrendingAnime();

    return NextResponse.json({
      success: true,
      data: anime,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch anime",
      },
      {
        status: 500,
      }
    );
  }
}
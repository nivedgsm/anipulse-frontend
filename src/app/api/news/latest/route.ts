import { NextResponse } from "next/server";
import { getLatestAnimeNews } from "@/lib/news";

export async function GET() {
  try {
    const news = await getLatestAnimeNews();

    return NextResponse.json({
      success: true,
      data: news,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch news",
      },
      {
        status: 500,
      }
    );
  }
}
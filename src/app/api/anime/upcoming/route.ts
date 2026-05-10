import { NextResponse } from "next/server";

import {
  getUpcomingAnime,
} from "@/lib/anilist";

export async function GET() {

  try {

    const anime =
      await getUpcomingAnime();

    return NextResponse.json({
      success: true,
      data: anime,
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to fetch upcoming anime",
      },
      {
        status: 500,
      }
    );

  }
}
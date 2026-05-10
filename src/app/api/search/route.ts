import { NextResponse } from "next/server";

import { searchAnime } from "@/lib/anilist";

export async function GET(
  request: Request
) {

  const { searchParams } =
    new URL(request.url);

  const query =
    searchParams.get("query");

  if (!query) {

    return NextResponse.json({
      success: true,
      data: [],
    });

  }

  try {

    const anime =
      await searchAnime(query);

    return NextResponse.json({
      success: true,
      data: anime,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Search failed",
      },
      {
        status: 500,
      }
    );

  }

}
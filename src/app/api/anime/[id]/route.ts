import { NextResponse } from "next/server";

import { getAnimeById } from "@/lib/anilist";

export async function GET(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  try {

    const { id } =
      await context.params;

    const anime =
      await getAnimeById(id);

    return NextResponse.json({
      data: anime,
    });

  } catch (error) {

    console.error(
      "Anime API Error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to fetch anime",
      },
      {
        status: 500,
      }
    );

  }

}
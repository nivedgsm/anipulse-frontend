import { NextResponse } from "next/server";

import {
  getAnimeById,
} from "@/lib/anilist";

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

    if (!id || Number.isNaN(Number(id))) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid anime id",
        },
        {
          status: 400,
        }
      );
    }

    const anime =
      await getAnimeById(id);

    if (!anime) {
      return NextResponse.json(
        {
          success: false,
          error: "Anime not found",
          data: null,
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: anime,
    });
  } catch (error) {
    console.error(
      "Anime detail route error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to fetch anime",
        data: null,
      },
      {
        status: 500,
      }
    );
  }
}
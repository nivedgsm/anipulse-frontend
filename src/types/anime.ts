export interface AnimeTitle {
  romaji?: string | null;
  english?: string | null;
  native?: string | null;
}

export interface AnimeCoverImage {
  extraLarge?: string | null;
  large?: string | null;
  medium?: string | null;
}

export interface AnimeStudio {
  name: string;
}

export interface AnimeStudios {
  nodes?: AnimeStudio[];
}

export interface AnimeTrailer {
  id?: string | null;
  site?: string | null;
  thumbnail?: string | null;
}

export interface AnimeRanking {
  rank?: number | null;
  type?: string | null;
  context?: string | null;
}

export interface RecommendedAnime {
  id: number;
  title?: AnimeTitle | null;
  coverImage?: AnimeCoverImage | null;
  bannerImage?: string | null;
  averageScore?: number | null;
  genres?: string[] | null;
}

export interface AnimeRecommendationNode {
  mediaRecommendation?: RecommendedAnime | null;
}

export interface AnimeRecommendations {
  nodes?: AnimeRecommendationNode[];
}

export interface Anime {
  id: number;
  title?: AnimeTitle | null;
  description?: string | null;
  bannerImage?: string | null;
  coverImage?: AnimeCoverImage | null;
  averageScore?: number | null;
  episodes?: number | null;
  duration?: number | null;
  status?: string | null;
  genres?: string[] | null;
  season?: string | null;
  seasonYear?: number | null;
  trailer?: AnimeTrailer | null;
  studios?: AnimeStudios | null;
  rankings?: AnimeRanking[] | null;
  recommendations?: AnimeRecommendations | null;
}
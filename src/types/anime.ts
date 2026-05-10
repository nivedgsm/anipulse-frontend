export interface AnimeTitle {
  romaji?: string;
  english?: string;
  native?: string;
}

export interface AnimeCoverImage {
  extraLarge?: string;
  large?: string;
  medium?: string;
}

export interface AnimeTrailer {
  id?: string;
  site?: string;
  thumbnail?: string;
}

export interface AnimeStudio {
  name: string;
}

export interface AnimeStudios {
  nodes: AnimeStudio[];
}

export interface AnimeRecommendationMedia {
  id: number;

  title: AnimeTitle;

  coverImage: AnimeCoverImage;

  bannerImage?: string;

  averageScore?: number;

  genres?: string[];
}

export interface AnimeRecommendationNode {
  mediaRecommendation:
    AnimeRecommendationMedia;
}

export interface AnimeRecommendations {
  nodes:
    AnimeRecommendationNode[];
}

export interface AnimeRanking {
  rank?: number;
  type?: string;
  context?: string;
}

export interface AnimeMedia {
  id: number;

  title: AnimeTitle;

  description?: string;

  bannerImage?: string;

  coverImage:
    AnimeCoverImage;

  averageScore?: number;

  episodes?: number;

  duration?: number;

  status?: string;

  genres?: string[];

  season?: string;

  seasonYear?: number;

  trailer?: AnimeTrailer;

  studios?: AnimeStudios;

  rankings?: AnimeRanking[];

  recommendations?:
    AnimeRecommendations;
}

export interface AnimeNews {
  id: string;

  slug: string;

  title?: string;

  originalLink?: string;

  pubDate?: string;

  content?: string;

  image?: string;
}
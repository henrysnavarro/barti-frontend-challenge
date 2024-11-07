'use strict';
'use client';
/**
 * This interface defines the shape of the data returned by the API
 */
export interface DisneyCharacter {
  _id: number;
  films: string[];
  shortFilms: string[];
  tvShows: string[];
  videoGames: string[];
  parkAttractions: string[];
  allies: string[];
  enemies: string[];
  sourceUrl: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  __v: number;
}

/**
 * This type defines the different values that different components can access
 * and hence appropriate to store in a global state
 */
export type GlobalState = {
  searchTerm: string;
  characters: DisneyCharacter[];
  featuredCharacters: DisneyCharacter[];
  selectedCharacter: DisneyCharacter | null;
  isFetchingCharacters: boolean;
  fetchError: string | null;
};

/**
 * This type is used as a guide rail for the user profile
 *
 */
export type UserProfile = {
  firstName: string;
  lastName: string;
  birthDate: string;
  city?: string;
  state?: string;
  favoriteCharacter?: string;
  favoriteMovie?: string;
  favoritePark?: string;
};

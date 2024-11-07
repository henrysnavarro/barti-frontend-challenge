'use client';
import { useState, useEffect } from 'react';
import useAppState from './useAppState';
import { DisneyCharacter } from '@/types/types';

const url = process.env.NEXT_PUBLIC_DISNEY_CHARACTERS_API_URL || '';
const featuredCharacterCount = parseInt(
  process.env.NEXT_PUBLIC_FEATURED_CHARACTER_COUNT || '4'
);

/**
 * Given an array of Disney characters, returns an array of a length equal to
 * NEXT_PUBLIC_FEATURED_CHARACTER_COUNT. If the array of characters is shorter
 * than NEXT_PUBLIC_FEATURED_CHARACTER_COUNT, the entire array is returned.
 *
 * The characters are shuffled randomly before being returned.
 *
 * @param {DisneyCharacter[]} characters The array of Disney characters to
 *   select from
 * @returns {DisneyCharacter[]} The array of featured characters
 */
const getFeaturedCharacters = (characters: DisneyCharacter[]) => {
  const shuffledCharacters = [...characters].sort(() => Math.random() - 0.5); // shuffle characters

  if (shuffledCharacters.length <= featuredCharacterCount) {
    return shuffledCharacters;
  }
  return shuffledCharacters.slice(0, featuredCharacterCount);
};

/**
 * This hook fetches data from the Disney Characters API at initial
 * launch of the app, and when the search text changes. It uses the
 * NEXT_PUBLIC_DISNEY_CHARACTERS_API_URL environment variable as
 * the base URL for the API call.
 *
 * The hook returns an object with three properties:
 *   - data: The array of Disney characters fetched from the API
 *   - isFetchingCharacters: A boolean indicating whether the
 *     API call is currently in progress
 *   - error: A string containing an error message if the API call
 *     failed. If the API call was successful, this property will be
 *     null
 */
const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const appState = useAppState();
  let abortController = new AbortController();
  let signal = abortController.signal;

  // This effect will be called when the search term changes.
  // The search term comes from the app bar search input and is
  // managed as a global state in the app state hook
  useEffect(() => {
    const appStateSearchTerm = appState.searchTerm.get();
    const isFetchingCharacters = appState.isFetchingCharacters.get();
    const urlToUse = `${url}${
      appStateSearchTerm ? `name=${appStateSearchTerm}` : ''
    }`;

    const fetchData = async () => {
      appState.isFetchingCharacters.set(true);
      try {
        const response = await fetch(urlToUse, { signal });
        if (!response.ok) throw new Error(response.statusText);
        const json = await response.json();
        const charactersData = JSON.parse(JSON.stringify(json.data));
        appState.characters.set(charactersData);
        appState.featuredCharacters.set(getFeaturedCharacters(json.data));
        // A delay is added to make the loading process and
        // the animation smooth
        setTimeout(() => appState.isFetchingCharacters.set(false), 1000);
      } catch (error) {
        appState.fetchError.set(`Could not Fetch Data: ${error}`);
        console.log(error);
        appState.isFetchingCharacters.set(false);
      }
    };

    // If the API call is in progress, attempt to abort it
    // before making a new call with the updated search term
    if (isFetchingCharacters) {
      abortController.abort();
      abortController = new AbortController();
      signal = abortController.signal;
    }
    fetchData();
  }, [appState.searchTerm.get()]);

  return {
    data,
    isFetchingCharacters: appState.isFetchingCharacters.get(),
    error,
  };
};

export default useFetch;

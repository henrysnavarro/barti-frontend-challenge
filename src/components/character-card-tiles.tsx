'use client';

import CharacterCard from './character-card';
import useAppState from '@/hooks/useAppState';

const charactersToLoad = process.env.NEXT_PUBLIC_DEFAULT_CHARACTER_COUNT;

/**
 * CharacterCardTiles is a component that displays a list of
 * CharacterCard components. This component is used to display
 * the search results on the search results page.
 *
 * The component takes no props and uses the appState hook to
 * access the characters and searchTerm state variables.
 *
 * The component renders a div with a className of "w-full bg-[#F1F2F3]"
 * and a heading with the search term. Inside the div, it renders a
 * list of CharacterCard components, with the first "charactersToLoad"
 * characters from the characters array.
 *
 * If the characters array is empty, the component renders null.
 */
export default function CharacterCardTiles() {
  const appState = useAppState();
  const characters = appState.characters
    .get()
    .slice(0, parseInt(charactersToLoad as string));
  const searchTerm = appState.searchTerm.get();
  return characters.length > 0 ? (
    <div className="w-full bg-[#F1F2F3]">
      <h1 className="text-center text-4xl mt-12">
        {`Search Results ${searchTerm ? `- ${searchTerm}` : ''}`}
      </h1>
      <div className="w-full p-24 pt-12 flex flex-wrap flex-row items-center justify-center gap-[12px]">
        {characters.map((character, index) => {
          const characterObject = {
            ...character,
            /* NOTE (TODO):
             * The following fields are arrays of strings from the API.
             * We need to convert them to arrays for the CharacterCard component.
             * because of an apparent bug in the handling of arrays using the
             * useHookState hook (something involving Proxies for arrays).
             * It is a workaround for now.
             */
            films: Array.from(character.films),
            shortFilms: Array.from(character.shortFilms),
            tvShows: Array.from(character.tvShows),
            videoGames: Array.from(character.videoGames),
            parkAttractions: Array.from(character.parkAttractions),
            allies: Array.from(character.allies),
            enemies: Array.from(character.enemies),
          };
          return <CharacterCard key={index} {...characterObject} />;
        })}
      </div>
    </div>
  ) : null;
}

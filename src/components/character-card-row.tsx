'use client';

import CharacterCard from './character-card';
import useAppState from '@/hooks/useAppState';

/**
 * CharacterCardRow is a component that displays a row of
 * CharacterCard components. This component is used to display
 * the featured characters on the main page.
 *
 * The component takes no props and uses the appState hook to
 * access the characters and searchTerm state variables.
 *
 * If the characters array is empty, the component renders null.
 */
export default function CharacterCardRow() {
  const appState = useAppState();
  const characters = appState.featuredCharacters.get();
  return characters.length > 0 ? (
    <div className="w-full bg-[#054553]">
      <h1 className="text-white text-center text-4xl mt-12">
        Featured Characters!
      </h1>
      <div className="w-full p-24 pt-12 flex flex-wrap flex-row items-center justify-center gap-[12px]">
        {characters.map((character, index) => {
          const characterObject = {
            ...character,
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

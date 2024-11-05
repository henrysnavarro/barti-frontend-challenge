'use client';

import CharacterCardRow from '@/components/character-card-row';
import { DisneyCharacter } from '@/types/types';
import { getOrdinalFormattedDate } from '@/utils/date';
import { get } from 'http';
/**
 * Component that displays detailed information about a selected Disney character.
 *
 * It renders the character's image, name, the last updated date, and lists of
 * featured films, short films, and TV shows. The component also includes a button
 * that links to more character details.
 *
 * @param {DisneyCharacter} selectedCharacter - The character to display details for.
 *   This includes the character's name, image URL, updated date, films, short films,
 *   TV shows, and a source URL for more information.
 */
export default function CharacterDetails(selectedCharacter: DisneyCharacter) {
  return (
    <>
      <div className="bg-[#F1F2F3] w-full p-24 pt-12 flex flex-wrap flex-row items-center justify-center gap-[12px]">
        <img
          src={selectedCharacter?.imageUrl}
          alt={selectedCharacter?.name}
          className="w-[438px] rounded-xl shadow-lg"
        />
        <div className="grow h-full p-12 rounded-xl">
          <p className="max-w-[400px] text-3xl font-semibold text-ellipsis">
            {selectedCharacter?.name}
          </p>
          <p className="text-sm mt-8">
            Last Updated{' '}
            {getOrdinalFormattedDate(null, selectedCharacter?.updatedAt)}
          </p>
          <p className="text-xl font-semibold mt-8">Featured Films</p>
          <ul className="list-disc list-inside">
            {selectedCharacter?.films.map((film) => (
              <li key={film} className="text-sm ml-2">
                {film}
              </li>
            ))}
          </ul>
          <p className="text-xl font-semibold mt-8">Short Films</p>
          <ul className="list-disc list-inside">
            {selectedCharacter?.shortFilms.map((shortFilm) => (
              <li key={shortFilm} className="text-sm ml-2">
                {shortFilm}
              </li>
            ))}
          </ul>
          <p className="text-xl font-semibold mt-8">TV Shows</p>
          <ul className="list-disc list-inside">
            {selectedCharacter?.tvShows.map((show) => (
              <li key={show} className="text-sm ml-2">
                {show}
              </li>
            ))}
          </ul>
          <button className="bg-[#054553] text-white p-4 rounded-xl mt-12 shadow-md">
            <a href={selectedCharacter?.sourceUrl} target="_blank">
              Explore More Character Details
            </a>
          </button>
        </div>
      </div>
      <CharacterCardRow />
    </>
  );
}

'use client';

import CharacterCardRow from '@/components/character-card-row';
import useGlobalState from '@/hooks/useGlobalState';
export default function CharacterDetails() {
  const globalState = useGlobalState();
  const selectedCharacter = globalState.selectedCharacter.get();

  return (
    <>
      <div className="bg-[#F1F2F3] w-full p-24 pt-12 flex flex-wrap flex-row items-center justify-center gap-[12px]">
        <img
          src={selectedCharacter?.imageUrl}
          alt={selectedCharacter?.name}
          className="w-[438px] rounded-xl"
        />
        <div className="grow h-full p-12 rounded-xl">
          <h1 className="text-4xl font-semibold">{selectedCharacter?.name}</h1>
          <p className="text-sm mt-8">
            Last Updated{' '}
            {new Date(
              selectedCharacter?.updatedAt as string
            ).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className="text-xl font-semibold mt-8">Featured Films</p>
          {/* <ul>
            {selectedCharacter?.films.map((film) => (
              <li key={film} className="text-sm">
                {film}
              </li>
            ))}
          </ul> */}
          <p className="text-xl font-semibold mt-8">Short Films</p>
          {/* <ul>
            {selectedCharacter?.shortFilms.map((shortFilm) => (
              <li key={shortFilm} className="text-sm">
                {shortFilm}
              </li>
            ))}
          </ul> */}
          <p className="text-xl font-semibold mt-8">TV Shows</p>
          {/* <ul>
            {selectedCharacter?.tvShows.map((show) => (
              <li key={show} className="text-sm">
                {show}
              </li>
            ))}
          </ul> */}
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

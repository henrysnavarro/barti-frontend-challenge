'use client';

import { useEffect, useState } from 'react';
import { DisneyCharacter } from '@/types/types';
import Link from 'next/link';

const getFilmList = (films: string[]) =>
  films?.length ? films.map((film) => `"${film}"`).join(', ') : '(No films)';

/**
 * Component that displays a card for a Disney character.
 *
 * The card includes the character's image, name, and a list of featured films.
 * If the image fails to load, an error message is displayed instead. Clicking
 * on the "VIEW PROFILE" link navigates to the character's detailed profile page.
 *
 * @param {DisneyCharacter} disneyCharacter - The character data to display
 *   including the character's ID, name, image URL, and list of films.
 * @returns {JSX.Element} A JSX element representing the character card.
 */
export default function CharacterCard(disneyCharacter: DisneyCharacter) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageError, setImageError] = useState(false);
  const [dimensionClass, setDimensionClass] = useState('');

  const { _id, name, imageUrl, films } = disneyCharacter;

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = (event) => {
      setImage(img);
      const naturalWidth = (event.target as HTMLImageElement).naturalWidth;
      const naturalHeight = (event.target as HTMLImageElement).naturalHeight;
      if (naturalWidth > naturalHeight) {
        setDimensionClass('h-full');
      } else {
        setDimensionClass('w-full');
      }
    };
    img.onerror = () => {
      setImageError(true);
    };
  }, [imageUrl]);
  return (
    <div className="w-[248px] h-[416px] bg-white">
      <div className="w-[248px] h-[248px] relative inset-0 flex overflow-hidden">
        {image ? (
          <img
            className={`w-full ${dimensionClass} m-auto`}
            src={imageUrl}
            alt={name}
          />
        ) : (
          <div className="w-full h-full bg-red-800 text-white text-center text-sm content-center p-4">
            {imageError ? `Error loading image from ${imageUrl}` : 'Loading...'}
          </div>
        )}
      </div>
      <div className="p-4 w-full h-[168px] flex flex-col items-center justify-evenly">
        <p className="text-center text-lg font-semibold leading-4">{name}</p>
        <div>
          <p className="text-center font-semibold">Featured Films</p>
          <div className="h-8 overflow-hidden text-center text-sm line-clamp-2 leading-4">
            {getFilmList(films)}
          </div>
        </div>
        <p className="text-center font-semibold underline text-xs cursor-pointer">
          <Link
            href={{
              pathname: `/character-details`,
              query: { disneyCharacter: JSON.stringify(disneyCharacter) },
            }}
          >
            VIEW PROFILE
          </Link>
        </p>
      </div>
    </div>
  );
}

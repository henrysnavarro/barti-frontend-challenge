'use client';

import CharacterDetails from '@/components/character-details';
import { useSearchParams } from 'next/navigation';
import { DisneyCharacter } from '@/types/types';

export default function Page() {
  const searchParams = useSearchParams();
  const disneyCharacter = JSON.parse(searchParams.get('disneyCharacter') || '');
  return <CharacterDetails {...(disneyCharacter as DisneyCharacter)} />;
}

'use client';

import CharacterCardTiles from '@/components/character-card-tiles';
import CharacterCardRow from '@/components/character-card-row';
import Loader from '@/components/loader';
import Error from '@/components/error';
import useAppState from '@/hooks/useAppState';

/**
 * Page component that conditionally renders loading, error, or character components.
 *
 * page.tsx is the main entry point for the routes of a Next.js app.  The route or
 * the URL path matches the folder pathname of the page component that is rendered.
 *
 * This component uses the appState hook to determine the state of character data fetching.
 * It displays a Loader component if the characters are being fetched, an Error component if
 * there is a fetch error, or character tiles and rows if data is successfully fetched.
 */
export default function Page() {
  const appState = useAppState();
  if (appState.isFetchingCharacters.get()) {
    return <Loader />;
  }
  if (appState.fetchError.get()) {
    return <Error />;
  }
  return (
    <>
      <CharacterCardTiles />
      <CharacterCardRow />
    </>
  );
}

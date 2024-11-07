'use client';

import Image from 'next/image';
import CompanyLogo from '@/assets/logo.png';
import ProfileIcon from '@/assets/avatar.png';
import { Input } from '@mui/base/Input';
import { useState } from 'react';
import useAppState from '@/hooks/useAppState';
import { useRouter } from 'next/navigation';
import { getStoredUserProfile } from '@/services/user-profile';
import Link from 'next/link';

/**
 * The AppBar component renders the top navigation bar of the application.
 * It includes the company logo, a search input for finding Disney characters,
 * and a profile icon that links to the user profile page.
 *
 * The component uses the useAppState hook to access the app's global state.
 * The component uses the useRouter hook to navigate the user to the home page
 * when the search input value changes.
 *
 * @returns The rendered AppBar component.
 */
export default function AppBar() {
  const [, setSearchTerm] = useState('');

  const appState = useAppState();
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    appState.searchTerm.set(searchTerm);
    router.push('/');
  };

  const storedUserProfile = getStoredUserProfile();

  return (
    <div className="flex flex-row w-full h-12 mt-8 mb-8">
      <Link href="/">
        <Image
          src={CompanyLogo}
          alt="Company Logo"
          className="object-contain"
        />
      </Link>
      <Input
        id="character-search-input"
        className="grow mr-10 ml-10 h-full rounded-full bg-[#F1F2F3]"
        slotProps={{
          input: {
            className:
              'focus:outline-none pl-6 pr-6 bg-transparent h-full w-full',
          },
        }}
        aria-label="character-search-input"
        placeholder="Find a character…"
        onChange={handleChange}
        value={appState.searchTerm.get()}
      />
      <Link href={'/user-profile'}>
        <Image
          src={ProfileIcon}
          alt="Profile Icon"
          className="object-contain"
        />
      </Link>
    </div>
  );
}

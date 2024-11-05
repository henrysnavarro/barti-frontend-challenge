'use client';

import { US_STATES, DISNEY_PARKS } from '@/enumerations/enumerations';
import { getStoredUserProfile } from '@/services/user-profile';
import { useRouter } from 'next/navigation';
import { getOrdinalFormattedDate } from '@/utils/date';

const US_STATES_OPTIONS = US_STATES.map((state) => ({
  label: state.abbreviation,
  value: state.abbreviation,
}));

const DISNEY_PARKS_OPTIONS = DISNEY_PARKS.map((park) => ({
  label: park.name,
  value: park.value,
}));

/**
 * This component renders the user profile page.
 *
 * The user profile page is only visible if a user profile is stored in the browser's cookies.
 * If no user profile is stored, the user is redirected to the user profile edit page.
 *
 * The page displays the user's first name, last name, birth date, location (city, state), favorite character/s, favorite movie, favorite Disney park, and last updated date.
 *
 * The page also displays an "Edit Profile" button that redirects the user to the user profile edit page when clicked.
 */
export default function UserProfile() {
  const router = useRouter();
  const storedUserProfile = getStoredUserProfile();

  if (!storedUserProfile) {
    router.push('/user-profile?mode=edit');
    return;
  }
  const ageInYears =
    new Date().getFullYear() -
    new Date(storedUserProfile.birthDate).getFullYear();

  const handleEditProfile = () => {
    router.push('/user-profile?mode=edit');
  };

  return (
    <div className="w-full flex flex-col gap-4 bg-[#f1f2f3] p-24 pt-12">
      <div className="w-full flex flex-col flex-wrap justify-start gap-5">
        <p className="text-3xl font-semibold">
          {storedUserProfile.firstName} {storedUserProfile.lastName}
        </p>
        <p className="text-sm -mt-4">
          Last updated{' '}
          {getOrdinalFormattedDate(null, storedUserProfile.lastUpdated)}
        </p>
        <p className="text-xl font-semibold">Age: {ageInYears}</p>
        <p className="text-xl font-semibold">
          Location:{' '}
          {storedUserProfile.city ? `${storedUserProfile.city}, ` : ''}{' '}
          {storedUserProfile.state}
        </p>
        <p className="text-xl font-semibold">
          Favorite Character/s: {storedUserProfile.favoriteCharacter}
        </p>
        <p className="text-xl font-semibold">
          Favorite Movie: {storedUserProfile.favoriteMovie}
        </p>
        <p className="text-xl font-semibold">
          Favorite Disney Park:{' '}
          {
            DISNEY_PARKS_OPTIONS.find(
              (park) => park.value === storedUserProfile.favoritePark
            )?.label
          }
        </p>
      </div>
      <div className="w-full flex flex-row justify-start gap-4">
        <button
          className="bg-[#054553] text-white p-4 rounded-lg mt-12 shadow-md"
          onClick={handleEditProfile}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

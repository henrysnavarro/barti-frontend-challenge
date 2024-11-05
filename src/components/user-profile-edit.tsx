'use client';

import Input from '@/components/basic-input';
import Select from '@/components/basic-select';
import DateField from '@/components/date-field';
import { US_STATES, DISNEY_PARKS } from '@/enumerations/enumerations';
import { useEffect, useState } from 'react';
import {
  getStoredUserProfile,
  updateStoredUserProfile,
} from '@/services/user-profile';
import { UserProfile } from '@/types/types';
import { useRouter } from 'next/navigation';

const US_STATES_OPTIONS = US_STATES.map((state) => ({
  label: state.abbreviation,
  value: state.abbreviation,
}));

const DISNEY_PARKS_OPTIONS = DISNEY_PARKS.map((park) => ({
  label: park.name,
  value: park.value,
}));

/**
 * The UserProfileEdit component allows users to edit their profile information,
 * including name, birthdate, city, state, and favorite Disney character, movie, and park.
 * The component uses the getStoredUserProfile and updateStoredUserProfile functions from
 * the user-profile service to fetch and update the user's profile information.
 * The component also uses the useState and useEffect hooks to manage the component's
 * state and side effects.
 *
 * The user profile information is not managed in the global state because only the user
 * profile components are managing it.
 */
export default function UserProfileEdit() {
  const [isValidForm, setIsValidForm] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [favoriteCharacter, setFavoriteCharacter] = useState('');
  const [favoriteMovie, setFavoriteMovie] = useState('');
  const [favoritePark, setFavoritePark] = useState('');

  const router = useRouter();

  useEffect(() => {
    const storedUserProfile = getStoredUserProfile();
    if (!storedUserProfile) {
      return;
    }
    setFirstName(storedUserProfile.firstName);
    setLastName(storedUserProfile.lastName);
    setBirthDate(storedUserProfile.birthDate);
    setCity(storedUserProfile.city);
    setState(storedUserProfile.state);
    setFavoriteCharacter(storedUserProfile.favoriteCharacter);
    setFavoriteMovie(storedUserProfile.favoriteMovie);
    setFavoritePark(storedUserProfile.favoritePark);
  }, []);

  const handleChange = (
    event: React.ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | { target: { id: string; value: string } }
    >
  ) => {
    const { id, value } = event.target as { id: string; value: string };
    const requiredFields = [firstName, lastName, birthDate];
    if (id === 'input-first-name') {
      setFirstName(value);
      requiredFields[0] = value;
    } else if (id === 'input-last-name') {
      setLastName(value);
      requiredFields[1] = value;
    } else if (id === 'input-birth-date') {
      setBirthDate(value);
      requiredFields[2] = value;
    } else if (id === 'input-city') {
      setCity(value);
    } else if (id === 'input-state') {
      setState(value);
    } else if (id === 'input-favorite-character') {
      setFavoriteCharacter(value);
    } else if (id === 'input-favorite-movie') {
      setFavoriteMovie(value);
    } else if (id === 'input-favorite-park') {
      setFavoritePark(value);
    }
    setIsValidForm(
      (requiredFields as string[]).every((field) => field.length > 0)
    );
  };

  const handleUpdateProfile = (cancel = false) => {
    if (cancel) {
      router.push('/user-profile');
      return;
    }
    const userProfile: UserProfile = {
      firstName,
      lastName,
      birthDate,
      city,
      state,
      favoriteCharacter,
      favoriteMovie,
      favoritePark,
    };
    updateStoredUserProfile(userProfile);
    router.push('/user-profile');
  };

  return (
    <div className="w-full flex flex-col gap-4 bg-[#f1f2f3] p-24 pt-12">
      <div className="w-full flex flex-row flex-wrap justify-start gap-4">
        <div>
          <Input
            id="input-first-name"
            label="First Name"
            required
            prompt="First Name"
            width="w-full"
            onChange={handleChange}
            value={firstName}
          />
        </div>
        <div>
          <Input
            id="input-last-name"
            label="Last Name"
            required
            prompt="Last Name"
            width="w-full"
            onChange={handleChange}
            value={lastName}
          />
        </div>
      </div>
      <div className="w-full">
        <DateField
          id="input-birth-date"
          label="Birth Date"
          required
          prompt="Birth Date"
          width="max-w-[200px]"
          onChange={handleChange}
          value={birthDate}
        />
      </div>
      <div className="w-full flex flex-row flex-wrap gap-4">
        <div>
          <Input
            id="input-city"
            label="City"
            prompt="City"
            width="max-w-[300px]"
            value={city}
            onChange={handleChange}
          />
        </div>
        <div>
          <Select
            id="input-state"
            label="State"
            prompt="State"
            width="w-[150px]"
            options={US_STATES_OPTIONS}
            onChange={handleChange}
            value={state}
          />
        </div>
      </div>
      <div className="w-full">
        <Input
          id="input-favorite-character"
          label="Favorite Disney Character"
          prompt="Favorite Disney Character"
          width="max-w-[620px]"
          onChange={handleChange}
          value={favoriteCharacter}
        />
      </div>
      <div className="w-full">
        <Input
          id="input-favorite-movie"
          label="Favorite Disney Movie"
          prompt="Favorite Disney Movie"
          width="max-w-[620px]"
          onChange={handleChange}
          value={favoriteMovie}
        />
      </div>
      <div className="w-full">
        <Select
          id="input-favorite-park"
          label="Favorite Disney Park"
          prompt="Favorite Disney Park"
          width="max-w-[620px]"
          options={DISNEY_PARKS_OPTIONS}
          onChange={handleChange}
          value={favoritePark}
        />
      </div>
      <div className="w-full flex flex-row justify-start gap-4">
        <button
          disabled={!isValidForm}
          className={`${
            isValidForm ? 'bg-[#054553] text-white' : 'text-white bg-[#aaaaaa]'
          } text-white p-4 rounded-lg mt-12 shadow-md`}
          onClick={() => handleUpdateProfile(false)}
        >
          Update Profile
        </button>
        <button
          className="border-[#054553] border-solid border-2 text-[#054553] bg-[#F1F2F3] p-4 rounded-lg mt-12"
          onClick={() => handleUpdateProfile(true)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

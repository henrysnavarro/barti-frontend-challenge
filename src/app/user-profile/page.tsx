'use client';

import UserProfileEdit from '@/components/user-profile-edit';
import UserProfile from '@/components/user-profile';
import { useSearchParams } from 'next/navigation';
import { getStoredUserProfile } from '@/services/user-profile';

export default function Page() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const storedUserProfile = getStoredUserProfile();
  return (
    <div className="w-full">
      {!storedUserProfile || mode === 'edit' ? (
        <UserProfileEdit />
      ) : (
        <UserProfile />
      )}
    </div>
  );
}

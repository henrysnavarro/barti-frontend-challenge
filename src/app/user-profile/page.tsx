'use client';

import UserProfileEdit from '@/components/user-profile-edit';
import UserProfile from '@/components/user-profile';
import { useSearchParams } from 'next/navigation';
export default function Page() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  return (
    <div className="w-full">
      {mode && mode === 'edit' ? <UserProfileEdit /> : <UserProfile />}
    </div>
  );
}

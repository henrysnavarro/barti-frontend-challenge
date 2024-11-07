'use client';

import { UserProfile } from '@/types/types';
import Cookies from 'js-cookie';

/**
 * Updates the stored user profile in the browser cookies.
 *
 * @param {UserProfile} userProfile The new user profile to store.
 */
export function updateStoredUserProfile(userProfile: UserProfile) {
  const lastUpdated = Date.now();
  Cookies.set(
    'DisneyUserProfile',
    JSON.stringify({ ...userProfile, lastUpdated })
  );
}

/**
 * Retrieves the stored user profile from the browser cookies.
 *
 * @returns {UserProfile | null} The user profile stored in the browser cookies, or null if no profile is found.
 */
export function getStoredUserProfile() {
  const userProfile = Cookies.get('DisneyUserProfile');
  return userProfile ? JSON.parse(userProfile) : null;
}

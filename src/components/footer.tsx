'use client';

import Image from 'next/image';
import CompanyLogo from '@/assets/logo.png';
import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="w-full h-12 mt-10 mb-10 flex-wrap items-center justify-center">
      <Link href="/">
        <Image src={CompanyLogo} alt="Company Logo" className="m-auto mb-3" />
      </Link>
      <p className="text-xs text-center">
        For educational use only. All characters and content are the property of
        Disney. This test is for private use and development testing only and
        should not be distributed for public consumption
      </p>
    </footer>
  );
}

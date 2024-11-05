import MickeyMagicImage from '@/assets/mickey-magic.gif';
import Image from 'next/image';
export default function Loader() {
  return (
    <div className="w-[300px] h-[300px] flex items-center justify-center border-8 border-pink-500 rounded-full relative overflow-hidden">
      <Image src={MickeyMagicImage} alt="Mickey Magic" className="h-full" />
      <p className="text-white text-lg absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        Mickey's Working His Magic ...
      </p>
    </div>
  );
}

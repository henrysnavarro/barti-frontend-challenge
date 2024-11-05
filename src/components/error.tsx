import MickeyBlinkImage from '@/assets/mickey-blink.gif';
import Image from 'next/image';
export default function Error() {
  return (
    <div className="w-[300px] h-[300px] flex items-center justify-center border-8 border-red-700 rounded-full relative overflow-hidden">
      <Image src={MickeyBlinkImage} alt="Error" className="h-full opacity-40" />
      <p className="text-red-700 text-xl font-semibold absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        Uh-oh, something went wrong ...
      </p>
    </div>
  );
}

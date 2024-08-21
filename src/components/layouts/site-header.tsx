import Image from 'next/image';
import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="fixed z-50 w-full bg-background/30 backdrop-blur-[12px]">
      <div className="container mx-auto flex w-full max-w-screen-2xl items-center justify-between border-b border-border px-4 py-6 lg:px-[67px]">
        <Link href={'/'}>
          <Image src={'/logo.svg'} alt="logo" width={81} height={41} priority />
        </Link>

        <button className="flex items-center justify-center gap-2 rounded-lg border bg-primary p-3 text-[1.5rem] font-bold">
          Connect wallet
        </button>
      </div>
    </header>
  );
}

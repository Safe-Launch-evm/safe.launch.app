import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/button';

export default function SiteHeader() {
  return (
    <nav className="fixed z-50 w-full bg-background/30 backdrop-blur-[12px]">
      <div className="container mx-auto flex w-full max-w-screen-2xl items-center justify-between border-b border-border px-4 py-6 lg:px-[67px]">
        <Link href="/">
          <Image src={'/logo.svg'} alt="logo" width={81} height={41} priority />
        </Link>
        <Button> Connect wallet</Button>
      </div>
    </nav>
  );
}

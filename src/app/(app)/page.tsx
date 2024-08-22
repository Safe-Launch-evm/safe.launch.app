import { MainTab } from '@/components/filter-tabs';
import { Shell } from '@/components/shell';
import { Button } from '@/components/ui/button';
// import { Star } from "iconsax-react"
import { Search, Star, SortDescIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Banner from './_components/banner';
import TokenCard from '@/components/cards/token-card';

type HomeProps = {
  searchParams: { tab: string };
};

export default function Home({ searchParams }: HomeProps) {
  const currentTab = searchParams.tab === undefined ? 'tokens' : searchParams.tab;

  return (
    <Shell className="pt-[220px]">
      <section className="flex flex-col-reverse items-center justify-center gap-10 lg:flex-row lg:justify-between xl:gap-[213px]">
        <div className="space-y-10">
          <div className="space-y-6">
            <h1 className="text-[2rem] font-bold xl:text-[4.25rem]">
              The Future of Fair and Safe Token Creation
            </h1>
            <p className="text-[1rem]/[2rem] tracking-[0.0125rem] lg:text-[1.25rem]/[2rem]">
              SafeLaunch ensures every token is fair-launched with no presale and no team
              allocation. Join us in making the crypto space safer and more transparent for
              everyone.
            </p>
          </div>
          <Button variant={'secondary'}>Create token</Button>
        </div>

        <div className="px-4">
          <Banner name="SafeCoin" image="/images/banner.png" market_cap={28.22} href="/" />
        </div>
      </section>

      <section className="flex w-full flex-col items-center justify-between gap-4 py-6 lg:flex-row">
        <div className="flex items-center justify-between">
          <div className="flex gap-4 rounded-lg border border-card-foreground bg-card p-2">
            <MainTab selected={currentTab} />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-4 size-6 text-muted" />
            <input
              type="search"
              placeholder="Search anything...."
              className="font-inter w-full max-w-[434px] rounded-lg border border-border bg-card px-4 py-3 pl-11 text-[1.25rem] placeholder:text-[#CECECE]"
            />
          </div>
          <div className="flex size-[44px] items-center justify-center rounded-full border bg-primary lg:size-[54px]">
            <SortDescIcon size={22} />
          </div>
        </div>
      </section>
      <section className="space-y-10">
        <h2 className="text-[1.5rem] font-bold lg:text-[2.5rem]">Tokens</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-7 xl:grid-cols-5">
          {[...Array(25)].map((_, index) => (
            <TokenCard
              key={index}
              name={'Safetoken'}
              symbol={'  SFC'}
              image={'/images/meme_token.png'}
              owner={'K.tiki'}
              market_cap={22.8}
            />
          ))}
        </div>
      </section>
    </Shell>
  );
}

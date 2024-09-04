import Image from 'next/image';
import { Star } from 'lucide-react';
import { AspectRatio } from '../ui/aspect-ratio';
import { PlaceholderImage } from '../placeholder-image';
import Link from 'next/link';

type TokenCardProps = {
  unique_id: string;
  name: string;
  symbol: string;
  image: string;
  owner: string;
  market_cap: number;
};

export default function TokenCard({ ...token }: TokenCardProps) {
  return (
    <Link
      href={`/token/${token.unique_id}`}
      className="flex min-w-full flex-col items-start gap-4 rounded-lg border border-card-foreground bg-card p-4 lg:min-w-[240px]"
    >
      <div className="flex w-full items-center justify-between">
        <dd className="flex items-center justify-center rounded bg-primary px-1 py-[2px] text-[0.5rem] text-white lg:text-[0.875rem]">
          {token.symbol}
        </dd>
        <dd className="text-[0.875rem]/[0.00875rem] font-light">
          Market cap: <span className="text-[#6100FF]">{token.market_cap}</span>
        </dd>
      </div>
      <AspectRatio ratio={2 / 1}>
        {token.image ? (
          <Image
            src={token.image ?? '/images/token-placeholder.webp'}
            alt={`${token.name}-${token.symbol}`}
            className="rounded-lg object-cover"
            sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
            fill
            loading="lazy"
          />
        ) : (
          <PlaceholderImage className="rounded-none" asChild />
        )}
      </AspectRatio>
      {/* <Image
        src={token.image}
        alt={token.name}
        width={208}
        height={134}
       
        className="h-[134px] min-w-[134px] rounded-lg bg-cover bg-no-repeat lg:min-w-[208px]"
        priority
      /> */}
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-4">
          <dt className="text-[1rem]/[0.01rem] font-bold">{token.name}</dt>
          <dd className="text-[0.875rem]/[0.00875rem] font-light text-muted">
            Created by {token.owner}
          </dd>
        </div>
        <div className="flex size-[34px] items-center justify-center rounded-lg border">
          <Star size={16} />
        </div>
      </div>
    </Link>
  );
}

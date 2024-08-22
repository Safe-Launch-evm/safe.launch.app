import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';

export const MainTab = ({ selected }: { selected: string }) => {
  const tabs = ['tokens', 'favorites', 'following', 'scams'];
  return (
    <>
      {tabs.map(tab => {
        const active = selected === tab;
        return (
          <Link
            href={`/?tab=${tab}`}
            key={tab}
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'tab',
                className: `capitalize ${active && 'border-primary text-primary'}`
              })
            )}
          >
            {tab}
          </Link>
        );
      })}
    </>
  );
};

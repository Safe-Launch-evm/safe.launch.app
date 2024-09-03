import { Shell } from '@/components/shell';
import { Progress } from '@/components/ui/progress';
import { SocialIcon, SocialIconType } from '@/components/social-icons';
import Image from 'next/image';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TransactionTable from './_components/transaction-table';
import { Copy, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Comment from './_components/comment';
import BuyAndSellCard from './_components/buy-and-sell-card';

export default function TokenPage() {
  return (
    <Shell className="min-h-screen pt-[160px]">
      <div className="flex flex-col gap-8 md:flex-row md:gap-10">
        {/* details */}
        <div className="flex w-full flex-col gap-10 md:w-3/4">
          <div className="flex items-start gap-4 self-stretch rounded border border-card-foreground bg-card p-4">
            <Image
              src={'/images/meme_token.png'}
              alt=""
              width={150}
              height={150}
              className="size-[150px] rounded border shadow-dip"
              priority
            />

            <div className="flex flex-col gap-6 pt-4">
              <h2 className="text-[1.25rem]/[0.0125rem] font-bold">Description</h2>
              <p className="text-[1.125rem]/[2rem]">
                Safetoken presents a new era in cryptocurrency, where safety, fairness, and
                community are at the forefront. Join us in building a secure future for all
                digital asset enthusiasts.{' '}
              </p>
              <div className="flex items-center justify-end gap-6">
                <SocialIconLink href="#" icon="xTwitter" name="XTwitter" />
                <SocialIconLink href="#" icon="youtube" name="Youtube" />
                <SocialIconLink href="#" icon="discord" name="Discord" />
                <SocialIconLink href="#" icon="telegram" name="Telegram" />
                <SocialIconLink href="#" icon="website" name="website name" />
              </div>
            </div>
          </div>
          <div className="h-[361px] w-full rounded bg-card-foreground" />
          <div className="flex flex-col gap-4 rounded border border-card-foreground bg-card p-4">
            <h2 className="text-[1.25rem]/[0.0125rem] font-bold">Bonding curve</h2>
            <div className="w-full py-4">
              <Progress value={60} />
            </div>
            <p className="text-[1.125rem]/[2rem]">
              There are 800,000,000 Safe tokens available for sale through the bonding curve,
              with the current balance of 0 TRX in the curve. <br /> As the market cap
              progresses and reaches $65,078.04, the entire liquidity from the bonding curve
              will be deposited into Asset chain and subsequently burned, removing it from
              circulation.
            </p>
          </div>
          <Tabs defaultValue="transactions">
            <TabsList>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
            <TabsContent value="transactions">
              <TransactionTable />
            </TabsContent>
            <TabsContent value="comments">
              <section className="flex flex-col gap-4 py-10">
                {[...Array(10)].map((_, index) => (
                  <Comment
                    key={index}
                    username="Bigname001"
                    date="hrs ago"
                    avatar="/images/meme_token.png"
                    comment="LFG🥪"
                  />
                ))}
              </section>
            </TabsContent>
          </Tabs>
        </div>
        <div className="flex w-full flex-col gap-4 md:w-[38%]">
          <div className="flex flex-col items-start gap-4 self-stretch">
            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex flex-col items-start gap-4">
                <h3 className="text-[1.5rem]/[0.015rem] font-bold">Safetoken</h3>
                <div className="flex items-center gap-1">
                  <span> Created by</span>
                  <Link href={''} className="text-primary">
                    K.tiki
                  </Link>
                </div>
              </div>
              <Button variant={'outline'} size={'icon'} className="hover:shadow-dip">
                <Star size={16} />
              </Button>
            </div>
            <div className="flex w-full items-center justify-between text-[1rem]/[0.01rem] font-light">
              <span>Contact:</span> <span> TSdc5y8rSA5nLNuKyEGxwv5weKNJ7JT....</span>{' '}
              <Copy size={24} />
            </div>
          </div>
          <BuyAndSellCard />
        </div>
      </div>
    </Shell>
  );
}

type IconLink = {
  href: string;
  name: string;
  icon: SocialIconType;
};

function SocialIconLink({ href, name, icon }: IconLink) {
  const Icon = SocialIcon[icon];
  return (
    <Link href={href} className="transition-colors duration-200 ease-in hover:text-primary">
      <Icon className="size-6" />
      <span className="sr-only">{name}</span>
    </Link>
  );
}

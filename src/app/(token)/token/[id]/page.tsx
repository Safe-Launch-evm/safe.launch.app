'use client';
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
import { fetchSingleToken } from '@/lib/actions/token';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { PlaceholderImage } from '@/components/placeholder-image';
import AddComment from './_components/add-comment';
import { fetchTokenComments } from '@/lib/actions/comment';
import {
  _formatAddress,
  formatAddress,
  formatDateToNow,
  toIntNumberFormat,
  truncate
} from '@/lib/utils';
import SafeLaunch from '@/contract/safe-launch';
import { useAccount, useWalletClient } from 'wagmi';
import { assetChainTestnet } from 'viem/chains';
import { config } from '@/lib/wagmi-config';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface iCurveStats {
  currentLiquidity: string;
  targetLiquidity: number;
}
interface iMarketStats {
  price: number;
  circulatingSupply: string;
  marketcap: number;
  liquidity: string;
}
function calcCurvePercent(currentLiquidity: number, targetLiquidity: number): number {
  (4.95 * 100) / 200;
  return (currentLiquidity * 100) / targetLiquidity;
}

export default function TokenPage({ params }: { params: { id: string } }) {
  const [socialLinks, setSocialLinks] = useState<any>({});
  const [curveStats, setCurveStats] = useState<iCurveStats>({
    currentLiquidity: '0',
    targetLiquidity: 0
  });
  const [marketStats, setMarketStats] = useState<iMarketStats>({
    price: 0,
    circulatingSupply: '0',
    marketcap: 0,
    liquidity: '0'
  });
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient({
    account: address,
    chainId: assetChainTestnet.id,
    config
  });

  const { data: token, mutate: mutateSingleToken } = useMutation({
    mutationFn: fetchSingleToken
  });
  const { data: comments, mutate: mutateTokenComments } = useMutation({
    mutationFn: fetchTokenComments
  });

  useEffect(() => {
    if (!walletClient || !token) return;

    const safeLaunch = new SafeLaunch(walletClient, address);
    safeLaunch.getTokenCurveStats(token?.contract_address).then(res => setCurveStats(res));
    safeLaunch.getTokenMarketStats(token?.contract_address).then(res => setMarketStats(res));
  }, [walletClient, token]);

  useEffect(() => {
    mutateSingleToken(params.id);
    mutateTokenComments(params.id);
    if (token) {
      setSocialLinks(JSON.parse(token?.social_links));
      setSocialLinks(JSON.parse(token?.social_links));
    }
  }, []);
  return (
    <Shell className="min-h-screen pt-[160px]">
      <div className="flex flex-col gap-8 md:flex-row md:gap-10">
        {/* details */}
        <div className="flex w-full flex-col gap-10 md:w-3/4">
          <div className="flex items-start gap-4 self-stretch rounded border border-card-foreground bg-card p-4">
            {token?.logo_url ? (
              <Image
                src={token.logo_url ?? '/images/token-placeholder.webp'}
                alt={`${token.name}-${token.symbol}`}
                width={150}
                height={150}
                className="size-[150px] rounded border shadow-dip"
                priority
              />
            ) : (
              <PlaceholderImage className="rounded-none" asChild />
            )}

            <div className="flex flex-col gap-6 pt-4">
              <h2 className="text-[1.25rem]/[0.0125rem] font-bold">Description</h2>
              <p className="text-[1.125rem]/[2rem]">{token?.description}</p>
              <div className="flex items-center justify-end gap-6">
                {socialLinks.twitter ? (
                  <SocialIconLink href={socialLinks.twitter} icon="xTwitter" name="XTwitter" />
                ) : null}
                {socialLinks.discord ? (
                  <SocialIconLink href={socialLinks.discord} icon="discord" name="Discord" />
                ) : null}
                {socialLinks.telegram ? (
                  <SocialIconLink
                    href={socialLinks.telegram}
                    icon="telegram"
                    name="Telegram"
                  />
                ) : null}
                {socialLinks.website ? (
                  <SocialIconLink href={socialLinks.website} icon="website" name="Website" />
                ) : null}
              </div>
            </div>
          </div>
          <div className="h-[361px] w-full rounded bg-card-foreground" />
          <div className="flex flex-col gap-4 rounded border border-card-foreground bg-card p-4">
            <h2 className="text-[1.25rem]/[0.0125rem] font-bold">Bonding curve</h2>
            <div className="w-full py-4">
              <Progress
                value={calcCurvePercent(
                  Number(curveStats?.currentLiquidity),
                  curveStats.targetLiquidity
                )}
              />
            </div>
            <p className="text-[1.125rem]/[2rem]">
              There are {toIntNumberFormat(Number(marketStats?.circulatingSupply))} {token?.symbol}{' '}
              available for sale through the bonding curve, with the current balance of{' '}
              {curveStats?.currentLiquidity} RWA in the curve. <br /> As the market cap
              progresses and reaches {curveStats?.targetLiquidity} RWA, the entire liquidity
              from the bonding curve will be subsequently burned, removing it from circulation.
            </p>
          </div>
          <Tabs defaultValue="comments">
            <TabsList>
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
            </TabsList>
            <TabsContent value="comments">
              <AddComment />
              <section className="flex flex-col gap-4 py-10">
                {/* {[...Array(10)].map((_, index) => ( */}
                {comments &&
                  comments?.map(comment => {
                    return (
                      <Comment
                        key={comment.unique_id}
                        username={
                          comment.user.username
                            ? comment.user.username
                            : formatAddress(comment.user.wallet_address)
                        }
                        date={formatDateToNow(comment.created_at)} // {comment.created_at}
                        avatar={
                          comment.user.profile_image ??
                          `https://avatar.vercel.sh/${comment.user.username}?size=150`
                        }
                        comment={comment.message}
                      />
                    );
                  })}
              </section>
            </TabsContent>
            <TabsContent value="transactions">
              <TransactionTable />
            </TabsContent>
          </Tabs>
        </div>
        <div className="flex w-full flex-col gap-4 md:w-[38%]">
          <div className="flex flex-col items-start gap-4 self-stretch">
            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex flex-col items-start gap-4">
                <h3 className="text-[1.5rem]/[0.015rem] font-bold">{token?.name}</h3>
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
              <span>Contract:</span>
              <span>
                <Link
                  target="__blank__"
                  href={`https://scan-testnet.assetchain.org/token/${token?.contract_address}`}
                >
                  {token && _formatAddress(token?.contract_address, 16)}
                </Link>
              </span>
              <Copy size={24} />
            </div>
          </div>
          <BuyAndSellCard token={token} />
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

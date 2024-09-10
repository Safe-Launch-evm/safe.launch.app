'use client';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { createWalletClient, custom } from 'viem';
import { assetChainTestnet } from 'viem/chains';
import { Token } from '@/types';
import SafeLaunch from '@/contract/safe-launch';
import { toIntNumberFormat } from '@/lib/utils';

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

const TokenCurveData = ({ token }: { token: Token }) => {
  const { address, isConnected } = useAccount();
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

  const walletClient = createWalletClient({
    chain: assetChainTestnet,
    transport: custom(window.ethereum!)
  });

  useEffect(() => {
    if (!walletClient || !token) return;

    const safeLaunch = new SafeLaunch(walletClient, address);
    safeLaunch.getTokenCurveStats(token?.contract_address).then(res => setCurveStats(res));
    safeLaunch.getTokenMarketStats(token?.contract_address).then(res => setMarketStats(res));
  }, []);

  return (
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
        {curveStats?.currentLiquidity} RWA in the curve. <br /> As the market cap progresses
        and reaches {curveStats?.targetLiquidity} RWA, the entire LP tokens in the bonding
        curve will be burned, providing a base liquidity for {token?.symbol} tokens in future.
      </p>
    </div>
  );
};

export default TokenCurveData;

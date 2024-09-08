'use client';
import { Icon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Form, { useZodForm } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafeLaunch from '@/contract/safe-launch';
import { swapTokenSchema } from '@/lib/validations/swap-token-schema';
import { useFormik } from 'formik';
import { Token } from '@/types';
import { ArrowBigDown } from 'lucide-react';
import Image from 'next/image';
import { assetChainTestnet } from 'viem/chains';
import { useAccount, useWalletClient } from 'wagmi';
import { config } from '@/lib/wagmi-config';
import { Hex } from 'viem';

export function SellTokenForm({ token }: { token: Token }) {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient({
    account: address,
    chainId: assetChainTestnet.id,
    config
  });

  const formik = useFormik({
    initialValues: {
      amount: 0
    },
    onSubmit: async values => {
      console.log({ values });
      if (!walletClient) {
        console.error('Wallet client not available');
        return;
      }
      if (formik.values.amount == 0) {
        console.error('Enter an amount');
        return;
      }

      const safeLaunch = new SafeLaunch(walletClient, address);
      const result = await safeLaunch
        .sellToken(token?.contract_address as Hex, String(formik.values.amount))
        .then(res => console.log(res));
    }
  });

  return (
    // <Form form={form} onSubmit={form.handleSubmit(onSubmit)}>
    <div className="grid grid-cols-1 gap-4 py-6">
      <div className="flex flex-col items-start justify-center gap-6 rounded border bg-input px-3 py-3.5">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center justify-center gap-2 rounded-[22px] border px-2 py-1">
            <Image
            src={token?.logo_url ?? '/images/xend-icon.svg'}
              alt="RWA"
              width={22}
              height={22}
              className="pointer-events-none size-[22px] rounded-full"
              priority
            />

            <div className="flex items-center gap-2">
              <span className="text-[1rem]">{token?.symbol}</span>{' '}
            </div>
          </div>
          {/* <span className="flex font-inter text-[1rem] text-primary">Set max slippage</span> */}
        </div>
        <Input
          className="border-none px-0 py-0 font-bricolage text-[1.5rem] focus:outline-none"
          placeholder="0.00"
          name="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
        />
      </div>
      {/* <div className="flex w-full items-center justify-between rounded border bg-input px-2.5 py-2">
        <Input
          placeholder="0.00"
          className="border-none p-0 font-bricolage focus:outline-none"
        />
        <div className="flex w-[70px] items-center justify-center gap-2 rounded-[22px] border border-none bg-white/[0.34] px-2 py-[6px]">
          <Image
            src={token?.logo_url ?? '/images/xend-icon.svg'}
            alt="RWA"
            width={22}
            height={22}
            className="pointer-events-none size-[22px] rounded-full"
            priority
          />
        </div>
      </div> */}
      <Button onClick={() => formik.handleSubmit()} type="submit" size={'lg'} className="mt-6">
        Proceed
      </Button>
    </div>
    // </Form>
  );
}

import { Icon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowBigDown } from 'lucide-react';
import Image from 'next/image';

export function BuyTokenForm() {
  return (
    <div className="grid grid-cols-1 gap-4 py-6">
      <div className="flex flex-col items-start justify-center gap-6 rounded border bg-input px-3 py-3.5">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center justify-center gap-2 rounded-[22px] border px-2 py-1">
            <Image
              src={'/images/xend-icon.svg'}
              alt="RWA"
              width={22}
              height={22}
              className="pointer-events-none size-[22px] rounded-full"
              priority
            />

            <div className="flex items-center gap-2">
              <span className="text-[1rem]">RWA</span> <Icon.arrowDown className="size-3.5" />
            </div>
          </div>
          <span className="flex font-inter text-[1rem] text-primary">Set max slippage</span>
        </div>
        <Input
          className="border-none px-0 py-0 font-bricolage text-[1.5rem] focus:outline-none"
          placeholder="0.00"
        />
      </div>
      <div className="flex w-full items-center justify-between rounded border bg-input px-2.5 py-2">
        <Input
          placeholder="0.00"
          className="border-none p-0 font-bricolage focus:outline-none"
        />
        <div className="flex w-[70px] items-center justify-center gap-2 rounded-[22px] border border-none bg-white/[0.34] px-2 py-[6px]">
          <Image
            src={'/images/xend-icon.svg'}
            alt="RWA"
            width={22}
            height={22}
            className="pointer-events-none size-[22px] rounded-full"
            priority
          />

          <span className="text-[1rem]">SF</span>
        </div>
      </div>
      <Button size={'lg'} className="mt-6">
        Pay
      </Button>
    </div>
  );
}

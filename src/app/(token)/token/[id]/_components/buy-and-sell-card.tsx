import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import { BuyTokenForm } from './buy-token-form';

export default function BuyAndSellCard() {
  return (
    <div className="flex w-full items-center rounded border px-[23px] py-[26px]">
      <Tabs defaultValue="buy" className="w-full">
        <TabsList>
          <TabsTrigger variant={'pill'} value="buy" className="rounded-r-none border-r-0">
            Buy
          </TabsTrigger>
          <TabsTrigger value="sell" variant={'pill'} className="rounded-l-none border-l-0">
            sell
          </TabsTrigger>
        </TabsList>
        <TabsContent value="buy">
          <BuyTokenForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

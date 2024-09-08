import { Shell } from '@/components/shell';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';

export default function Profile() {
  return (
    <Shell variant={'center'} className="pt-[150px]">
      <section className="flex w-full max-w-4xl flex-col items-center justify-center gap-10">
        <div className="flex w-full flex-col items-center justify-center gap-6">
          <Image
            src={'/images/banner.png'}
            alt=""
            width={142}
            height={142}
            className="size-[142px] rounded-full border"
          />

          <h1>K.tiki</h1>
          <p>BsD8ieissMcvvCoH49HPtoruQxuiHtSjKZ1JzHMEqM3q</p>
        </div>
        <p className="text-center text-[1.125rem]/[2rem]">
          Safetoken presents a new era in cryptocurrency, where safety, fairness, and community
          are at the forefront. Join us in building a secure future for all digital asset
          enthusiasts. ensuring that every participant has an equal opportunity to acquire and
          benefit from the token.
        </p>
      </section>
      <div className="">
        <Tabs value="created">
          <TabsList variant={'secondary'}>
            <TabsTrigger value="created" variant={'secondary'}>
              Created
            </TabsTrigger>
            <TabsTrigger value="notifications" variant={'secondary'}>
              Notifications
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </Shell>
  );
}

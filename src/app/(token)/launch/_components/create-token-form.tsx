'use client';

import { Icon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Form, { useZodForm } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { formatBytes, truncate } from '@/lib/utils';
import { CreateTokenInput, createTokenSchema } from '@/lib/validations/create-token-schema';
import { STATE_STATUS } from '@/types';
import { ChevronLeft, FileImage, ImagePlus, LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface FormSectionProps {
  [key: string]: React.ReactNode;
}

export const CreateTokenFrom = () => {
  const [data, setData] = React.useState<CreateTokenInput>();
  const [status, setStatus] = React.useState(STATE_STATUS.IDLE);
  const [isPending, startTransition] = React.useTransition();
  const [component, setComponent] = React.useState<number>(0);

  const form = useZodForm({
    schema: createTokenSchema,
    defaultValues: { ...data }
  });

  const image = form.watch('image');

  function AddTokenForm() {
    function onSubmit(data: CreateTokenInput) {
      console.log(data);
      setData(data);
      setComponent(1);
    }
    return (
      <Form form={form} onSubmit={form.handleSubmit(onSubmit)} className="md:w-[570px]">
        <div className="flex flex-col gap-2 px-8 pt-6 text-[1.125rem]/[1.125rem]">
          <span>Image</span>

          <div className="flex items-center justify-center gap-4 pr-4">
            <label
              htmlFor="file-upload"
              className="relative flex size-[64px] cursor-pointer items-center justify-center rounded-lg border"
            >
              {image ? (
                <Image
                  src={URL.createObjectURL(image[0])}
                  alt={image[0].name}
                  width={64}
                  height={64}
                  className="size-[64px] rounded-lg bg-cover bg-center bg-no-repeat"
                />
              ) : (
                <ImagePlus size={35} />
              )}
              <Input
                id="file-upload"
                type="file"
                className="sr-only"
                {...form.register('image')}
              />
            </label>
            <div className="flex flex-col gap-1 text-[1.125rem]">
              <span> {image ? truncate(image[0].name, 32) : 'PNG, JPEG, max 5MB'}</span>
              {image ? <span>{formatBytes(image[0].size)}</span> : null}
            </div>
          </div>
        </div>

        <div className="w-full border-b border-border" />

        <div className="flex w-full flex-col gap-6 px-8 py-6">
          <Input label="Token name" placeholder="Enter name" {...form.register('name')} />
          <Input label="Token symbol" placeholder="Symbol" {...form.register('symbol')} />
          <Textarea
            placeholder="Enter text"
            label="Description"
            helpertext="200 max"
            {...form.register('description')}
          />
          <Input label="Website" name="" placeholder="(optional)" />
          <Input label="Telegram" name="" placeholder="optional" />
          <Input label="Twitter" name="" placeholder="optional" />
        </div>
        <div className="flex w-full items-center justify-center px-8 py-6">
          <Button fullWidth>Create Token</Button>
        </div>
      </Form>
    );
  }

  function AddLiquidity() {
    function handleClick() {
      setComponent(0);
    }

    function onSubmit(data: CreateTokenInput) {
      setStatus(STATE_STATUS.LOADING);
      startTransition(() => {
        console.log(data);
        setStatus(STATE_STATUS.SUCCESS);
      });
    }

    return (
      <div className="relative flex w-full flex-col items-center justify-center gap-10 px-8 py-6">
        <button
          className="absolute left-[32px] top-[26px] z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground md:top-[26px]"
          onClick={handleClick}
        >
          <ChevronLeft className="size-6" />
          <span className="sr-only">Cancel connection</span>
        </button>
        <h2 className="pt-4 text-[1.25rem]/[0.0125rem] font-bold">Add liquidity</h2>
        <p className="text-center text-[1.125rem]/[1.125rem]">
          Buying a small amount of coins helps protect your coin from snipers. This is optional
        </p>

        <Form form={form} onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="flex w-full flex-col gap-6 rounded-lg border bg-input px-2.5 py-3.5">
            <div className="flex justify-end">
              <TokenRWA />
            </div>
            <Input
              className="border-none px-0 py-3 focus:outline-none"
              placeholder="0.00 (Optional)"
            />
          </div>
          <div className="flex w-full items-center justify-center py-6">
            <Button fullWidth>
              {isPending && status === STATE_STATUS.LOADING ? (
                <LoaderCircle size={20} />
              ) : null}
              Launch Token
            </Button>
          </div>
        </Form>
      </div>
    );
  }

  function SuccessTokenCreated() {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-6 px-2 py-6 md:w-[300px]">
        <h2 className="text-[1.125rem]/[1.125rem] font-bold">Successfully created</h2>
        <Image
          src={'/images/meme_token.png'}
          alt=""
          width={185}
          height={140}
          className="size-[180px] rounded"
        />
        <Button asChild className="text-[1.125rem] font-medium">
          <Link href={'/token'}>View token</Link>
        </Button>
      </div>
    );
  }

  const components: FormSectionProps = {
    0: <AddTokenForm />,
    1: <AddLiquidity />
  };

  return (
    <div className="max-w-[570px] gap-10 rounded-lg border bg-card-200">
      {status === STATE_STATUS.SUCCESS ? <SuccessTokenCreated /> : components[component]}
    </div>
  );
};

const TokenRWA = () => (
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
);

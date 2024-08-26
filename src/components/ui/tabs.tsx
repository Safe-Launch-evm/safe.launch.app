'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const tabListVariants = cva('', {
  variants: {
    variant: {
      default: 'inline-flex items-center justify-start',
      pill: 'flex w-full  justify-center items-center self-stretch border rounded-lg'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

interface TabListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabListVariants> {}

const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, TabListProps>(
  ({ className, variant, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabListVariants({ variant }), className)}
      {...props}
    />
  )
);
TabsList.displayName = TabsPrimitive.List.displayName;

const tabTriggerVariants = cva('disabled:pointer-events-none disabled:opacity-50', {
  variants: {
    variant: {
      default:
        'border-b border-card-foreground flex items-start justify-center  p-3 text-[1rem] font-inter text-muted data-[state=active]:border-primary data-[state=active]:text-primary',
      pill: 'flex items-center min-w-[190px] border w-full h-full justify-center p-3 gap-2 rounded-lg text-[1.5rem] font-bold data-[state=active]:text-foreground/[0.8] data-[state=active]:bg-secondary'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

interface TabTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabTriggerVariants> {}

interface TabTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabTriggerVariants> {}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabTriggerProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabTriggerVariants({ variant }), className)}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cn('size-full', className)} {...props} />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };

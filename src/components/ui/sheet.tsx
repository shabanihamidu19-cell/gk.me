import * as React from "react";
import { Drawer } from "vaul";
import { cn } from "@/lib/utils";

type SheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function Sheet({ open, onOpenChange, title, children, className }: SheetProps) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange} shouldScaleBackground={false}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/60" />
        <Drawer.Content
          className={cn(
            "fixed bottom-0 left-1/2 z-50 flex max-h-[92dvh] w-full max-w-[480px] -translate-x-1/2 flex-col rounded-t-lg bg-bg-elevated outline-none",
            className,
          )}
        >
          <div className="mx-auto mt-3 h-1 w-9 rounded-full bg-border" />
          <Drawer.Title className="px-5 pb-2 pt-4 font-display text-xl font-semibold tracking-tight text-fg">
            {title}
          </Drawer.Title>
          <Drawer.Description className="sr-only">{title}</Drawer.Description>
          <div className="overflow-y-auto px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

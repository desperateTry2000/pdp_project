// src/components/JournalingDrawer/JournalingDrawer.tsx
'use client';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";

interface JournalingDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function JournalingDrawer({
  open,
  onOpenChange,
}: JournalingDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {/* asChild makes your button the trigger, no extra wrappers */}
      <SheetTrigger asChild>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Open Journal
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Journal Entry</SheetTitle>
          <SheetDescription>
            Write down your thoughts for {new Date().toLocaleDateString()}.
          </SheetDescription>
          <SheetClose asChild>
            <button className="absolute right-4 top-4">✕</button>
          </SheetClose>
        </SheetHeader>
        <textarea></textarea>
        {/* …your textarea or rich-text editor goes here… */}
      </SheetContent>
    </Sheet>
  );
}

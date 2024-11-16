"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useHeartsModal } from "@/store/use-hearts-modal";

export const HeartsModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useHeartsModal();

  useEffect(() => setIsClient(true), []);

  const onClick = () => {
    close();
    router.push("/store");
  };

  if (!isClient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-5 flex w-full items-center justify-center">
            <Image
              src="/mascot_bad.svg"
              alt="Mascot Bad"
              height={80}
              width={80}
            />
          </div>

          <DialogTitle className="text-center text-2xl font-bold">
            Você está sem corações!
          </DialogTitle>

          <DialogDescription className="text-center text-base">
            Obtenha o Pro para corações ilimitados, ou compre eles na loja.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mb-4">
          <div className="flex w-full flex-col gap-y-4">
            <Button
              variant="primary"
              className="w-full"
              size="lg"
              onClick={onClick}
            >
              Obtenha corações ilimitados
            </Button>

            <Button
              variant="primaryOutline"
              className="w-full"
              size="lg"
              onClick={close}
            >
              Não obrigado
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

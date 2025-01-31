"use client"

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

interface CTAButtonProps {
  children: React.ReactNode;
}

export function CTAButton({ children }: CTAButtonProps) {
  const router = useRouter();
  const { user } = useAuth();

  const handleClick = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/signin');
    }
  };

  return (
    <Button
      size="lg"
      className="relative z-10 min-w-[200px] bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
      onClick={handleClick}
    >
      <span className="relative z-10">{user ? 'Go to Dashboard' : children}</span>
    </Button>
  );
}

"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function BackButton({ className }: { readonly className?: string}) {
  const router = useRouter();
  return <Button className={className} onClick={() => router.back()}>Back</Button>;
}

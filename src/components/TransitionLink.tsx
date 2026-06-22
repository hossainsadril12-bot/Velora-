"use client";

import React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "./TransitionProvider";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  direction?: "forward" | "backward";
}

export default function TransitionLink({ children, href, className, direction = "forward", ...props }: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { startTransition } = useTransition();

  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const hrefStr = href.toString();
    const isHash = hrefStr.startsWith("#");
    const isCurrentPage = pathname === hrefStr;
    const isExternal = hrefStr.startsWith("http") || hrefStr.startsWith("//");

    if (isHash || isCurrentPage || isExternal) {
      return;
    }

    e.preventDefault();
    startTransition(() => {
      router.push(hrefStr);
    }, direction);
  };

  return (
    <Link href={href} onClick={handleTransition} className={className} {...props}>
      {children}
    </Link>
  );
}

"use client";

import type { ComponentProps, MouseEvent } from "react";
import Link from "next/link";
import { useExperience } from "@/components/providers/experience-provider";

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, "href"> &
  Readonly<{
    href: string;
    transitionLabel?: string;
    transitionAccent?: string;
  }>;

export function TransitionLink({
  href,
  transitionLabel,
  transitionAccent,
  onClick,
  target,
  ...props
}: TransitionLinkProps) {
  const { transitionTo } = useExperience();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      target === "_blank"
    ) {
      return;
    }

    event.preventDefault();
    transitionTo(href, { label: transitionLabel, accent: transitionAccent });
  };

  return (
    <Link
      {...props}
      href={href}
      target={target}
      scroll={false}
      onClick={handleClick}
    />
  );
}

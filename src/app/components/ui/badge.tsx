"use client";

import * as React from "react";
import { cn } from "@/app/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline";
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
          variant === "default" && "bg-gray-200 text-gray-800",
          variant === "outline" && "border border-gray-300 text-gray-800",
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";
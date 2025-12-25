"use client";

import Link from "next/link";
import useGuardedRouter from "hooks/useGuardedRouter";

export default function ProgressLink({ 
  href, 
  children, 
  className, 
  onClick,
  ...props 
}) {
  const { push: routerPush } = useGuardedRouter();

  const handleClick = (e) => {
    // Call original onClick if provided
    if (onClick) {
      onClick(e);
    }
  };

  const handleProgrammaticNavigation = () => {
    routerPush(href);
  };

  // If it's a programmatic navigation (no children), use router.push
  if (!children) {
    return (
      <button 
        onClick={handleProgrammaticNavigation}
        className={className}
        {...props}
      />
    );
  }

  return (
    <Link 
      href={href} 
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
}

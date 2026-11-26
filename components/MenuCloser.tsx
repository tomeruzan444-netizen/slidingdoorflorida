"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * The header menus are native <details>. The header lives in the root layout, so it is not
 * re-rendered on client-side navigation and an open menu would stay open over the new page.
 * This closes every header menu when a link inside it is tapped, when the route changes,
 * on Escape, and on a tap outside the menu. Renders nothing.
 */
export function MenuCloser() {
  const pathname = usePathname();

  useEffect(() => {
    closeAll();
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const openMenus = document.querySelectorAll<HTMLDetailsElement>("header details[open]");
      openMenus.forEach((d) => {
        // A link inside the menu: close it so the new page is visible once it loads.
        if (target.closest("a") && d.contains(target)) d.open = false;
        // A tap outside the menu: close it.
        else if (!d.contains(target)) d.open = false;
      });
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}

function closeAll() {
  document.querySelectorAll<HTMLDetailsElement>("header details[open]").forEach((d) => {
    d.open = false;
  });
}

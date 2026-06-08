"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { siteConfig } from "@/lib/site-data";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { label: "About", href: "/about/" },
  { label: "Experience", href: "/experience/" },
  { label: "Projects", href: "/projects/" },
  { label: "Labs", href: "/labs/" },
  { label: "Workbench", href: "/workbench/" },
  { label: "Writing", href: "/blog/" },
  { label: "Resume", href: "/resume/" },
  { label: "Contact", href: "/contact/" }
];

const searchNavItem = { label: "Search", href: "/search/" };

function normalizePath(path) {
  if (!path) {
    return "/";
  }

  if (path === "/") {
    return path;
  }

  return path.endsWith("/") ? path.slice(0, -1) : path;
}

function isActivePath(pathname, href) {
  const current = normalizePath(pathname);
  const target = normalizePath(href);

  if (target === "/") {
    return current === "/";
  }

  return current === target || current.startsWith(`${target}/`);
}

function NavLinks({ pathname, onNavigate }) {
  return navItems.map((item) => (
    <Link
      key={item.label}
      href={item.href}
      aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
      onClick={onNavigate}
    >
      {item.label}
    </Link>
  ));
}

export function SiteHeader() {
  const pathname = usePathname();
  const disclosureRef = useRef(null);

  useEffect(() => {
    if (disclosureRef.current?.open) {
      disclosureRef.current.open = false;
    }
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="page-shell header-shell">
        <Link href="/" className="brand" aria-label={`${siteConfig.shortName} home`}>
          <span className="brand-mark">{siteConfig.initials}</span>
          <span className="brand-copy">
            <strong>{siteConfig.shortName}</strong>
            <span>{siteConfig.title}</span>
          </span>
        </Link>

        <div className="header-actions">
          <nav className="site-nav desktop-nav" aria-label="Primary">
            <NavLinks pathname={pathname} />
          </nav>

          <Link
            href={searchNavItem.href}
            className="search-nav-link"
            aria-current={isActivePath(pathname, searchNavItem.href) ? "page" : undefined}
            aria-label="Search"
          >
            {searchNavItem.label}
            <kbd className="kbd-hint" aria-hidden="true">⌘K</kbd>
          </Link>

          <div className="desktop-theme-toggle">
            <ThemeToggle />
          </div>

          <details className="nav-disclosure" ref={disclosureRef}>
            <summary>Menu</summary>
            <nav className="site-nav disclosure-nav" aria-label="Mobile primary">
              <div className="mobile-theme-toggle">
                <ThemeToggle />
              </div>
              <NavLinks
                pathname={pathname}
                onNavigate={() => {
                  if (disclosureRef.current) {
                    disclosureRef.current.open = false;
                  }
                }}
              />
              <Link
                href={searchNavItem.href}
                aria-current={isActivePath(pathname, searchNavItem.href) ? "page" : undefined}
                onClick={() => {
                  if (disclosureRef.current) {
                    disclosureRef.current.open = false;
                  }
                }}
              >
                {searchNavItem.label}
              </Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

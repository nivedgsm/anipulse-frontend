"use client";

import Link from "next/link";

import { Menu } from "lucide-react";

import { ThemeToggle } from "./theme-toggle";

import { SearchModal } from "./search-modal";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

const navItems = [
  {
    label: "News",
    href: "/news",
  },
  {
    label: "Trending",
    href: "/trending",
  },
  {
    label: "Anime",
    href: "/anime",
  },
  {
    label: "Reviews",
    href: "/reviews",
  },
];

export function Navbar() {

  return (

    <header className="relative z-50 border-b border-border/50 bg-background">

      <div className="container relative overflow-visible mx-auto flex h-16 items-center justify-between px-4">

        {/* LEFT */}
        <div className="flex items-center gap-10">

          {/* LOGO */}
          <Link
            href="/"
            className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-2xl font-black tracking-tight text-transparent"
          >

            AniPulse

          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-6 md:flex">

            {navItems.map((item) => (

              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >

                {item.label}

              </Link>

            ))}

          </nav>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">

          <SearchModal />

          <ThemeToggle />

          {/* MOBILE MENU */}
          <Sheet>

            <SheetTrigger asChild>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:hidden"
              >

                <Menu className="h-5 w-5" />

              </Button>

            </SheetTrigger>

            <SheetContent side="right">

              <div className="mt-10 flex flex-col gap-6">

                {navItems.map((item) => (

                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-lg font-medium"
                  >

                    {item.label}

                  </Link>

                ))}

              </div>

            </SheetContent>

          </Sheet>

        </div>

      </div>

    </header>

  );
}
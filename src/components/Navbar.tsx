import { Link, NavLink } from 'react-router';
import { ModeToggle } from './ui/mode-toggle';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button, buttonVariants } from './ui/button';
import { IoFilm, IoHome, IoMenu, IoPeople, IoTv } from 'react-icons/io5';
import { Eye, Heart } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { FaEye, FaHeart } from 'react-icons/fa6';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur-md">
      <div className=" mx-auto flex justify-between items-center sm:grid-cols-3 h-16 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 w-[200px]">
          <img
            src="/images/light_mode_logo.png"
            alt="Logo"
            className="block dark:hidden h-12"
          />
          <img
            src="/images/dark_mode_logo.png"
            alt="Logo"
            className="hidden dark:block h-12"
          />
          <span className="font-extrabold tracking-wide text-lg sm:text-xl">
            FILM RADAR
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden sm:flex items-center justify-center gap-6 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors py-5 hover:text-primary ${
                isActive
                  ? 'text-primary font-bold border-b border-primary'
                  : 'text-foreground'
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `transition-colors py-5 hover:text-primary ${
                isActive
                  ? 'text-primary font-bold border-b border-primary'
                  : 'text-foreground'
              }`
            }
          >
            Movies
          </NavLink>

          <NavLink
            to="/tv-shows"
            className={({ isActive }) =>
              `transition-colors py-5 hover:text-primary ${
                isActive
                  ? 'text-primary font-bold border-b border-primary'
                  : 'text-foreground'
              }`
            }
          >
            TV Shows
          </NavLink>

          <NavLink
            to="/people"
            className={({ isActive }) =>
              `transition-colors py-5 hover:text-primary ${
                isActive
                  ? 'text-primary font-bold border-b border-primary'
                  : 'text-foreground'
              }`
            }
          >
            People
          </NavLink>
        </nav>

        {/* Right side (theme toggle, sheet for mobile) */}
        <div className="flex justify-end items-center gap-2 md:w-[200px]">
          <div className="hidden sm:flex items-center gap-2">
            <ModeToggle />

            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                twMerge(
                  buttonVariants({ variant: 'outline', size: 'icon' }),
                  isActive ? 'text-primary' : ''
                )
              }
            >
              <Heart />
            </NavLink>

            <NavLink
              to="/watchlist"
              className={({ isActive }) =>
                twMerge(
                  buttonVariants({ variant: 'outline', size: 'icon' }),
                  isActive ? 'text-primary' : ''
                )
              }
            >
              <Eye />
            </NavLink>
          </div>

          <Sheet>
            {/* Hamburger Trigger */}
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="sm:hidden cursor-pointer"
              >
                <IoMenu className="size-7" />
              </Button>
            </SheetTrigger>

            {/* Drawer */}
            <SheetContent
              side="right"
              className="flex flex-col justify-between p-6 bg-background/95 backdrop-blur-md"
            >
              {/* Header */}
              <div>
                <SheetHeader className="mb-8">
                  <div className="flex items-center gap-3">
                    {/* Light/Dark logo */}
                    <img
                      src="/images/light_mode_logo.png"
                      alt="Logo"
                      className="block dark:hidden h-10 w-10"
                    />
                    <img
                      src="/images/dark_mode_logo.png"
                      alt="Logo"
                      className="hidden dark:block h-10 w-10"
                    />
                    <SheetTitle className="text-2xl font-bold tracking-wide">
                      Film Radar
                    </SheetTitle>
                  </div>
                  <SheetDescription className="mt-2 text-muted-foreground">
                    Discover movies, TV shows, and people.
                  </SheetDescription>
                </SheetHeader>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-5 text-lg font-medium">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `flex items-center gap-3 transition-colors hover:text-primary ${
                        isActive ? 'text-primary' : 'text-foreground'
                      }`
                    }
                  >
                    <IoHome className="size-5" />
                    Home
                  </NavLink>

                  <NavLink
                    to="/movies"
                    className={({ isActive }) =>
                      `flex items-center gap-3 transition-colors hover:text-primary ${
                        isActive ? 'text-primary' : 'text-foreground'
                      }`
                    }
                  >
                    <IoFilm className="size-5" />
                    Movies
                  </NavLink>

                  <NavLink
                    to="/tv-shows"
                    className={({ isActive }) =>
                      `flex items-center gap-3 transition-colors hover:text-primary ${
                        isActive ? 'text-primary' : 'text-foreground'
                      }`
                    }
                  >
                    <IoTv className="size-5" />
                    TV Shows
                  </NavLink>

                  <NavLink
                    to="/people"
                    className={({ isActive }) =>
                      `flex items-center gap-3 transition-colors hover:text-primary ${
                        isActive ? 'text-primary' : 'text-foreground'
                      }`
                    }
                  >
                    <IoPeople className="size-5" />
                    People
                  </NavLink>

                  <NavLink
                    to="/favorites"
                    className={({ isActive }) =>
                      `flex items-center gap-3 transition-colors hover:text-primary ${
                        isActive ? 'text-primary' : 'text-foreground'
                      }`
                    }
                  >
                    <FaHeart className="size-5" />
                    Favorites
                  </NavLink>

                  <NavLink
                    to="/watchlist"
                    className={({ isActive }) =>
                      `flex items-center gap-3 transition-colors hover:text-primary ${
                        isActive ? 'text-primary' : 'text-foreground'
                      }`
                    }
                  >
                    <FaEye className="size-5" />
                    Watchlist
                  </NavLink>
                </nav>
              </div>

              {/* Footer (Theme + extras) */}
              <div className="flex items-center justify-between pt-6 border-t">
                <ModeToggle />
                <a
                  href="https://www.anelsahovic.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  @anelsahovic
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

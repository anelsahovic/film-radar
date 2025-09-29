import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { Link } from 'react-router';
import { ModeToggle } from './ui/mode-toggle';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-card text-foreground py-12">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 items-center">
        {/* Branding and Description */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link to="/" className="flex items-center gap-3 w-fit">
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
            <span className="font-extrabold tracking-wide text-xl">
              FILM RADAR
            </span>
          </Link>
          <p className="text-muted-foreground text-sm leading-tight max-w-xs text-center md:text-left">
            Discover movies, TV shows, and people.
          </p>
        </div>

        {/* Main Navigation */}
        <nav className="flex flex-wrap justify-center gap-x-10 gap-y-2 text-base md:gap-x-8">
          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>
          <Link to="/movies" className="hover:text-primary transition">
            Movies
          </Link>
          <Link to="/tv-shows" className="hover:text-primary transition">
            TV Shows
          </Link>
          <Link to="/people" className="hover:text-primary transition">
            People
          </Link>
        </nav>

        {/* Social and Controls */}
        <div className="flex items-center justify-center md:justify-end gap-6">
          <a
            href="https://github.com/anelsahovic"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-primary transition text-xl"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/anelsahovic/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-primary transition text-xl"
          >
            <FaLinkedin />
          </a>
          <ModeToggle />
        </div>
      </div>

      <div className="mt-10 text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()}{' '}
        <a
          href="https://anelsahovic.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition"
        >
          anelsahovic
        </a>
        . All rights reserved.
      </div>
      <div className="mt-2 text-center text-xs text-muted-foreground">
        Data fetched from TMDb API.
      </div>
    </footer>
  );
}

import { Outlet, NavLink } from 'react-router';

export default function Layout() {
  return (
    <div>
      <nav className="flex justify-center gap-2 text-2xl">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'text-indigo-500' : 'text-black'
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/movies"
          className={({ isActive }) =>
            isActive ? 'text-indigo-500' : 'text-black'
          }
        >
          Movies
        </NavLink>

        <NavLink
          to="/tv-shows"
          className={({ isActive }) =>
            isActive ? 'text-indigo-500' : 'text-black'
          }
        >
          Tv Shows
        </NavLink>

        <NavLink
          to="/people"
          className={({ isActive }) =>
            isActive ? 'text-indigo-500' : 'text-black'
          }
        >
          People
        </NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

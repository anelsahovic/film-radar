import { Outlet } from 'react-router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function Layout() {
  return (
    <div className="h-dvh flex flex-col justify-between">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

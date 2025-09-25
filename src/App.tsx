import { Route, Routes } from 'react-router';
import Layout from './Layout';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TvShows from './pages/TvShows';
import People from './pages/People';
import { ThemeProvider } from './components/ui/theme-provider';
import ShowMovie from './pages/ShowMovie';
import ShowTvShow from './pages/ShowTvShow';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<ShowMovie />} />

          <Route path="tv-shows" element={<TvShows />} />
          <Route path="tv-shows/:tvId" element={<ShowTvShow />} />

          <Route path="people" element={<People />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

import { Route, Routes } from 'react-router';
import Layout from './Layout';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TvShows from './pages/TvShows';
import People from './pages/People';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="tv-shows" element={<TvShows />} />
        <Route path="people" element={<People />} />
      </Route>
    </Routes>
  );
}

export default App;

import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MovieDetailsPage";
import FavouriteMoviesPage from "./pages/FavouriteMoviesPage";
import MovieReviewPage from "./pages/MovieReviewPage";
import SiteHeader from './components/SiteHeader'
import UpcomingMoviesPage from './pages/UpcomingMoviesPage';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AuthContextProvider from "./contexts/AuthContext";
import AddMovieReviewPage from './pages/AddMovieReviewPage';
import TVSeriesPage from './pages/TVSeriesPage';
import TVDetailsPage from './pages/TVDetailsPage';
import FavouriteTVPage from './pages/FavouriteTVPage';
import FantasyMovieCreatePage from './pages/FantasyMovieCreatePage';
import FantasyMoviePage from './pages/FantasyMoviePage';
import PlaylistPage from './pages/PlaylistPage';
import PlaylistCreatePage from './pages/PlaylistCreatePage';
import PlaylistDetailPage from './pages/PlaylistDetailPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ConfirmSignUpPage from './pages/ConfirmSignUpPage';
import PrivateRoute from './components/PrivateRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
     <BrowserRouter>
     <AuthContextProvider>
     <SiteHeader />
     <MoviesContextProvider>
      <Routes>
        <Route path="/movies/favourites" element={<PrivateRoute><FavouriteMoviesPage /></PrivateRoute>} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
        <Route path="/tv" element={<TVSeriesPage />} />
        <Route path="/tv/favourites" element={<PrivateRoute><FavouriteTVPage /></PrivateRoute>} />
        <Route path="/tv/:id" element={<TVDetailsPage />} />
        <Route path="/reviews/:id" element={<MovieReviewPage/>} />
        <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
        <Route path="/fantasy-movie" element={<FantasyMoviePage />} />
        <Route path="/fantasy-movie/create" element={<PrivateRoute><FantasyMovieCreatePage /></PrivateRoute>} />
        <Route path="/playlists" element={<PlaylistPage />} />
        <Route path="/playlists/create" element={<PrivateRoute><PlaylistCreatePage /></PrivateRoute>} />
        <Route path="/playlists/:id" element={<PlaylistDetailPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/confirm" element={<ConfirmSignUpPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </MoviesContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />)


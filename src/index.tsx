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
import FantasyMovieCreatePage from './pages/FantasyMovieCreatePage';
import FantasyMoviePage from './pages/FantasyMoviePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

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
        <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
        <Route path="/tv" element={<TVSeriesPage />} />
        <Route path="/tv/:id" element={<TVDetailsPage />} />
        <Route path="/reviews/:id" element={<MovieReviewPage/>} />
        <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
        <Route path="/fantasy-movie" element={<FantasyMoviePage />} />
        <Route path="/fantasy-movie/create" element={<FantasyMovieCreatePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
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


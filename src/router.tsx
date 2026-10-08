// src/router.tsx
import { createBrowserRouter } from 'react-router'
import App from './App'
import HomePage from './pages/HomePage'
import MovieDetailPage from './pages/MovieDetailPage'
import SearchPage from './pages/SearchPage'
import WatchlistPage from './pages/WatchlistPage'
import MyRatingsPage from './pages/MyRatingsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'movie/:id', element: <MovieDetailPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'watchlist', element: <WatchlistPage /> },
      { path: 'my-ratings', element: <MyRatingsPage /> },
    ],
  },
])

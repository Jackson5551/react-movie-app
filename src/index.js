import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Movie from './Movie';
import Show from './Show';
import SearchResults from './SearchResults';
import Results from './components/Results';
import './index.css'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App></App>
  },
  {
    path:"/search/:query/:page",
    // element: <SearchResults></SearchResults>
    element: <Results></Results>
  },
  {
    path:"/movies/:movieId",
    element: <Movie></Movie>
  },
  {
    path:"/tvshows/:showId",
    element: <Show></Show>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

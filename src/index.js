import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Movie from './Movie';
import Show from './Show';
import SearchResults from './SearchResults';
import Results from './components/Results';
import './index.css'
import Person from './Person';
import Movies from './Movies';
import TVShows from './TVShows';
import People from './People';

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
    path:"/movies",
    element: <Movies></Movies>
  },
  {
    path:"/movies/:movieId",
    element: <Movie></Movie>
  },
  {
    path:"/tvshows",
    element: <TVShows></TVShows>
  },
  {
    path:"/tvshows/:showId",
    element: <Show></Show>
  },
  {
    path:"/people",
    element: <People></People>
  },
  {
    path:"/people/:personId",
    element: <Person></Person>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

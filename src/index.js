import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Movie from './pages/Movies/Movie';
import Show from './pages/TV/Show';
import Results from './pages/Search/Results';
import './index.css'
import Person from './pages/People/Person';
import Movies from './pages/Movies/Movies';
import TVShows from './pages/TV/TVShows';
import People from './pages/People/People';
import Collection from './pages/Collections/Collection';

const router = createBrowserRouter([
  {
    path:"/",
    element: <App></App>
  },
  {
    path:"/search/:query/:searchCategory",
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
  },
  {
    path:"/collection/:collectionId",
    element: <Collection></Collection>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

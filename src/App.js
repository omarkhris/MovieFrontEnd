import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './component/Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/header/header'
import Trailor from './component/trailor/Trailor';

import Home from './component/home/Home';
import Reviews from './component/reviews/Reviews';
function App() {

  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);
  const getMovies = async () => {

    try {
      const response = await api.get("/api/v1/movies");
      setMovies(response.data);

    }
    catch (err) {
      console.log(err.message);
    }


  }

  const getMovieData = async (movieId) => {
    try {
        const response = await api.get(`/api/v1/movies/${movieId}`);
        const movieData = response.data;

        // Extracting reviews from the movie data
        const reviews = movieData.reviewIds.map(review => review);

        setMovie(movieData);
        setReviews(reviews);
        
        console.log(response);
        console.log(movieData);
    } catch (error) {
        console.error("Error fetching movie data:", error);
    }
}


  useEffect(() => {
    getMovies();
  }, []);

  return (

    <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home movies={movies}/>}></Route>
            <Route path="/Trailer/:ytTrailerId" element={<Trailor />}></Route>
            <Route path='/Reviews/:movieId' element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews}/>}></Route>
          </Route>
        </Routes>

    </div>
  );
}

export default App;

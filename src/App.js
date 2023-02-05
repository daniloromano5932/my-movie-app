import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Header from "./components/Header";
import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieDetails from "./pages/MovieDetails";
import PersonDetails from "./pages/PersonDetails";
 
function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movies/:slug" element={<Movies />}/>
        <Route path="movie/:movieId" element={<MovieDetails />}/>
        <Route path="person/:personId" element={<PersonDetails />}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

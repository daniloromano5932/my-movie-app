import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function Movies() {

  const [data, setData] = useState([])
  let {slug} = useParams();

  useEffect(function() {
    axios.get(`https://api.themoviedb.org/3/movie/${slug.replace(/-/g, '_')}?api_key=d2f6811ad1ffa9ad4c06382bf50da010&language=en-US&page=1`)
    .then(function(response) {
      setData(response.data.results)
      console.log(data);
    })
  }, [slug, data])
    

  return (
    <div>
      {data.map((item) => {
        return <p key={item.id}>{item.title}</p>
      })}
    </div>
  );
}

export default Movies;

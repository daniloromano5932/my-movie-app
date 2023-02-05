import Accordion from 'react-bootstrap/Accordion';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState, useEffect } from 'react';
import { sortByOptions } from "../constants";
import axios from '../axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



function Filter(props) {
  const [sortBy, setSortBy] = useState(sortByOptions[0])
  const [genres, setGenres] = useState([])
  const [languages, setLanguages] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])
  const [selectedLanguage, setSelectedLanguage] = useState("")

  useEffect(() => {
    fetchLanguages();
    fetchGenres();
  },[])

  function handleClick(option) {
    setSortBy(option)
    props.handleFilter(option.value)
  }

  function fetchGenres() {
    axios
      .get(`/genre/movie/list`)
      .then(function (response) {
        setGenres(response.data.genres);
      })
      .catch(function (error) {
        console.log(error);
      })
    return genres
  }

  function fetchLanguages() {
    axios
      .get(`/configuration/languages`)
      .then(function (response) {
        setLanguages(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  function selectGenre(id) {
    setSelectedGenres(function(prev) {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  function selectLanguage(e) {
    setSelectedLanguage(e.target.value)
  }

  function searchMovies() {
    const selectedGenresString = selectedGenres.join()
    props.searchByGenres(selectedGenresString);
    props.searchByLanguage(selectedLanguage)
  }


  return (
    <div>
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Sort</Accordion.Header>
        <Accordion.Body>
          <p>Sort results by</p>
          <DropdownButton id="dropdown-basic-button" title={sortBy.name}>
            {sortByOptions.map((option) => {
              return <Dropdown.Item key={option.value} onClick={function () { handleClick(option) }}>{option.name}</Dropdown.Item>
            })}
          </DropdownButton>
        </Accordion.Body>
      </Accordion.Item>
      <br />
      <Accordion.Item eventKey="1">
        <Accordion.Header >Filters</Accordion.Header>
        <Accordion.Body>
          <p>Show Me</p>
          <div className="form-check">
            <input className="form-check-input" type="radio" Name="flexRadioDefault" id="flexRadioDefault1" />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Everything
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" Name="flexRadioDefault" id="flexRadioDefault2" />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Movies I Haven't Seen
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" Name="flexRadioDefault" id="flexRadioDefault2" />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Movies I Have Seen
            </label>
          </div>
          <hr />
        </Accordion.Body>
        <Accordion.Body>
          <p>Availabilities</p>
          <input type="checkbox" Name="availabilities" /> <label>Search all availabilities?</label> <br />
          <hr />
        </Accordion.Body>
        <Accordion.Body>
          <p>Release Dates</p>
          <input type="checkbox" Name="release-date" /> <label>Search all releases?</label> <br /><br />
          <label>from</label>  <input type="date" Name="release-date-from" value="" />  <br />
          <label>to</label>  <input type="date" Name="release-date-from" value="" />  <br />
       <hr/>
        </Accordion.Body>
        <Accordion.Body>
          <p>Genres</p>
          {genres.map(function (item) {
            return <button type='button' className={`btn btn-light ${selectedGenres.includes(item.id)? "selected" : null}`} key={item.id} onClick={function () {selectGenre(item.id)}}>{item.name}</button>
          })}
          <hr />
        </Accordion.Body>
        <Accordion.Body>
          <p>Certification</p>
          <button type='button' className="btn btn-light">0</button>
          <button type='button' className="btn btn-light">6</button>
          <button type='button' className="btn btn-light">12</button>
          <button type='button' className="btn btn-light">16</button>
          <button type='button' className="btn btn-light">18</button>
          <hr />
        </Accordion.Body>
        <Accordion.Body>
          <p>Language ?</p>
          <select class="form-select" aria-label="Default select example" onChange={selectLanguage}>
            <option value="none">None Selected</option>
            {languages.map((language) => {
              return <option value={language.iso_639_1}>{language.english_name}</option>
            })}
          </select>
          <hr />
        </Accordion.Body>
        <Accordion.Body>
          <label htmlFor="customRange1" className="form-label">User Score</label>
          <input type="range" className="form-range" id="customRange1" min={0} max={100} step={0} />
          <hr />
        </Accordion.Body>
        <Accordion.Body>
          <label htmlFor="customRange1" className="form-label">Minimum User Votes</label>
          <input type="range" className="form-range" id="customRange1" />
          <hr />
        </Accordion.Body>
        <Accordion.Body>
        <Form.Label>Runtime</Form.Label>
      <Form.Range />
          <hr />
        </Accordion.Body>
        <Accordion.Body>
          <label htmlFor="exampleInputEmail1">Keywords</label>
          <input type="text" Name="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Filter by keywords...' />
          <hr />
        </Accordion.Body>
      </Accordion.Item>
      <br />
      <Accordion.Item>
        <Accordion.Header>Where To Watch</Accordion.Header>
      </Accordion.Item>
    </Accordion>
          <Button id="search-button" variant="light" onClick={searchMovies}>Search</Button>{''}
          </div>
  );
}

export default Filter;
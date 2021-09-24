import { useState, useEffect } from 'react'
import './App.css';
import axios from "axios";


function App() {
  const [movies, setMovies] = useState([
    {
      title: '',
      genre: '',
      year: ''
    }
  ])

  const [movie, setMovie] = useState(
    {
      title: '',
      genre: '',
      year: ''
    }
  )

  const [isPut, setIsPut] = useState(false);
  const [updatedItem, setUpdatedItem] = useState({
    title: "",
    genre: "",
    year: "",
    id: ""
  });

  useEffect(() => {
    fetch('/movies').then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(jsonRes => setMovies(jsonRes))
  })

  function handleChange(e) {
    const { name, value } = e.target;
    setMovie(prevInput => {
      return (
        {
          ...prevInput,
          [name]: value
        }
      )
    })
  }

  function addMovie(e) {
    e.preventDefault();
    alert("movie added")
    const newMovie = {
      title: movie.title,
      genre: movie.genre,
      year: movie.year
    }
    axios.post('/newMovie', newMovie)
  }

  function deleteMovie(id) {
    axios.delete('/delete/' + id);
    alert("movie delte")
  }

  function openUpdate(id) {
    setIsPut(true);
    setUpdatedItem((prevInput) => {
      return {
        ...prevInput,
        id: id,
      };
    });
  }

  function updateItem(id) {
    axios.put("/put/" + id, updatedItem);
    alert("item update")
    console.log(`item with id ${id} updated`);
  }

function handleUpdate(event) {
  const {name, value} = event.target;
  setUpdatedItem((prevInput) => {
    return{
      ...prevInput,
      [name]: value,
    }
  })
}

  return (
    <div className="App">
      {!isPut ? 
      (<div class="main">
        <div class="register">
          <h2>Add Data</h2>
          <form id="register">
            <label>First Name :</label>
            <br></br>
            <input onChange={handleChange} name="title" value={movie.title}></input>
            <br></br>
            <br></br>
            <label>Last Name :</label>
            <br></br>
            <input onChange={handleChange} name="genre" value={movie.genre}></input>
            <br></br>
            <br></br>
            <label>Your Age :</label>
            <br></br>
            <input onChange={handleChange} name="year" value={movie.year}></input>
            <br></br>
            <br></br>
            <button id="submit" onClick={addMovie}>ADD MOVIE</button>
          </form>
        </div>
      </div>
      ) : (
        <div class="main">
        <div class="register">
          <h2>Add Data</h2>
          <form id="register">
            <label>First Name :</label>
            <br></br>
            <input onChange={handleUpdate} name="title" value={updatedItem.title}></input>
            <br></br>
            <br></br>
            <label>Last Name :</label>
            <br></br>
            <input onChange={handleUpdate} name="genre" value={updatedItem.genre}></input>
            <br></br>
            <br></br>
            <label>Your Age :</label>
            <br></br>
            <input onChange={handleUpdate} name="year" value={updatedItem.year}></input>
            <br></br>
            <br></br>
            <button id="submit" onClick={() => updateItem(updatedItem.id)}>UPDATEITEM</button>
          </form>
        </div>
      </div>
      )
            }
      {movies.map(movie => {
        return (
          <div class="table-container">
            <h1 class="heading">Data</h1>
            <table class="table">
            <thead>
            <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>#</th>
            <th>#</th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <td data-lable="First Name">{movie.title}</td>
            <td data-lable="Last Name">{movie.genre}</td>
            <td data-lable="Age">{movie.year}</td>
            <td data-lable="#"><button onClick={() => deleteMovie(movie._id)}>DELETE</button></td>
            <td data-lable="#"><button onClick={() => openUpdate(movie._id)}>UPDATE</button></td>
            </tr>
            </tbody>
            </table>)
            </div>
          )
      })}
          </div>
        );
      }
  
export default App;

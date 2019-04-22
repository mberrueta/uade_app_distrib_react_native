import React, { Component } from 'react';
import {data} from '../data/data.json';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const url = "http://www.omdbapi.com/?&apikey=";
const apikey = "d0b64143";

class Movies extends Component {

    constructor(){
        super();
        this.state = {
          data: data,
          name: "",
          movies: "",
          open: false,
          movieSelected:{
              imdbID: "",
              Title: ""
          }
        }

        this.viewMovie = this.viewMovie.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.ejecutarBusqueda = this.ejecutarBusqueda.bind(this);
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    viewMovie(e,data){
        e.preventDefault();

        const endpoint = `${url}${apikey}&i=${data.imdbID}`;

        fetch(endpoint).then(
            (response) => {
                return response.json();
            }
        ).then(responseData => {
            this.setState({movieSelected: responseData})
            console.log(responseData);
        });

        

        this.handleClickOpen();

    }

    handleClickOpen = () => {
        console.log("entre")
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    ejecutarBusqueda(){

        const endpoint = `${url}${apikey}&s=${this.state.name}`;
        console.log(endpoint)
        fetch(endpoint).then(
            (response) => {
                return response.json();
            }
        ).then(responseData => {
            const results = responseData.Search;
            console.log(results);

            var movieRows = [];

            results.forEach( (movie)=> {
                const movieRow =
                    <div className="col-md-4" key={movie.imdbID} onClick={((e) => this.viewMovie(e,movie))}>
                        <div className="card mt-4" >
                            <div className="card-header" > 
                                <h5>{movie.Title}</h5>
                                <span className="badge badge-pill badge-danger">
                                    {movie.Year}
                                </span>
                            </div>
                            <div className="card-body">
                                <img src={movie.Poster} alt={movie.Title}  />
                            </div>
                        </div> 
                        
                    </div>
                movieRows.push(movieRow);

            })
            

            this.setState({movies: movieRows})
        })
        .catch(error => alert("Error: No se han encontrado resultados o se han encontrado demasiados resultados."));

        //console.log("results", this.state.movies)
        
        

    }

    render(){
        
        return(
            
            <div className="container mt-4">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Buscar peliculas" aria-label="Buscar peliculas" aria-describedby="button-addon2" onChange={this.handleChange('name')}></input>
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button" id="button-addon2" onClick={this.ejecutarBusqueda}>Buscar</button>
                    </div>
                    
                </div>
                <div className="container">
                    <div className="row mt-4">
                        {this.state.movies}
                    </div> 
                </div>

                
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                    <Grid container spacing={24}>
                        <Grid item xs={6}>
                            {this.state.movieSelected.Title}
                        </Grid>
                        <Grid item xs={6}>
                            <span className="badge badge-pill badge-danger">
                                {this.state.movieSelected.Year}
                            </span>
                        </Grid>
                    </Grid>
                    </DialogTitle>             
                    <DialogContent>
                        <DialogContentText>
                            <p><small>Director: <mark>{this.state.movieSelected.Director}</mark>
                            <br/>
                            Actores: <mark>{this.state.movieSelected.Actors}</mark>
                            <br/>
                            Genero: <mark>{this.state.movieSelected.Genre}</mark>
                            <br/>
                            Duracion: <mark>{this.state.movieSelected.Runtime}</mark></small></p>
                        </DialogContentText>

                        <DialogContentText>
                            <img src={this.state.movieSelected.Poster} alt={this.state.movieSelected.Title}  />
                        </DialogContentText>
                        <DialogContentText>
                            {this.state.movieSelected.Plot}
                        </DialogContentText>
                        <br/>
                        <h6>Comentarios:</h6>
                        <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Deja tu comentario..."
                        type="text"
                        fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <button type="button" className="btn btn-secondary" onClick={this.handleClose}>Cancelar</button>
                        <button type="button" className="btn btn-primary" onClick={this.handleClose}>Enviar</button>
                    </DialogActions>
                </Dialog>

            </div>
            
        )
    }
}

export default Movies;
import React, { Component } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { SearchBar, Card, ListItem, Button, Icon, AirbnbRating, Rating } from 'react-native-elements'
import Movie from './Movie';

const url = "http://www.omdbapi.com/?&apikey=";
const apikey = "d0b64143";


class BarSearch extends Component {

    constructor(){
        super();
        this.state = {
          search: "",
          name: "",
          movies: null,
          open: false,
          movieSelected:{
              imdbID: "",
              Title: ""
          }
        }

        // this.viewMovie = this.viewMovie.bind(this);
        // this.handleClickOpen = this.handleClickOpen.bind(this);
         this.ejecutarBusqueda = this.ejecutarBusqueda.bind(this);
    }
    
      updateSearch = search => {
        //alert(search);
        this.setState({ name: search });
        //alert(this.state.name);
      };

      ejecutarBusqueda(){
        //alert(this.state.name);
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
                    <Card key={movie.imdbID}
                        title={movie.Title}
                        image = {{ uri: movie.Poster }}
                        imageStyle= {{width:300, height:444, marginLeft:40}}>
                    <Text >
                        {/* <Image
                            style = {{width:300, height:444}}
                            resizeMode="cover"
                            source={{ uri: movie.Poster }}
                        /> */}
                        
                    </Text>
                    <AirbnbRating
                        count={5}
                        reviews={["Terrible","Bad","Good","Very Good","Excellent"]}
                        defaultRating={4}
                        size={10}
                        />
                    <Button
                        icon={<Icon name='description' color='#ffffff' />}
                        backgroundColor='#03A9F4'
                        buttonStyle={{borderRadius: 0, marginLeft: 10, marginRight: 10, marginBottom: 0}}
                        title='Ver Detalles'
                        onClick={((e) => this.viewMovie(e,movie))} />
                    </Card>
                movieRows.push(movieRow);

            })
            
            //console.log(movieRows);

            this.setState({movies: movieRows});

            console.log("aca llega");
        })
        .catch(error => alert("Error: No se han encontrado resultados o se han encontrado demasiados resultados."));

        //console.log("results", this.state.movies)
        
        

    }
    
    
    render(){

        const { search } = this.state.search;

        //if(this.state.movies="")

        return(
            <View>

                <View>

                <SearchBar
                    placeholder="Buscar pelicula..."
                    onChangeText={this.updateSearch}
                    value={search}
                    platform="ios"
                />

                <Button
                title="Buscar"
                onPress={this.ejecutarBusqueda}
                />

                </View>

                <ScrollView >

                    {this.state.movies}
                    
                </ScrollView>


            </View>

        )

    }

}

export default BarSearch;
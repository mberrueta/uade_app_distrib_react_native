import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { SearchBar, Card, Button, Icon} from 'react-native-elements'
import Config from '../constants/Config';
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";

class MoviesSearch extends Component {

    constructor(props){
        super(props);
        this.state = {
          search: "",
          name: "",
          movies: null,
          open: false,
          type: 'movie',
          movieSelected:{
              imdbID: "",
              Title: ""
          }
        }

         this.search = this.search.bind(this);
    }

      updateSearch = search => {
        this.setState({ name: search });
      };


      viewMovie(movie){
        this.props.navegador.navigate('MovieDetails', {movie: movie, navegador: this.props.navegador});
    }


      search(){
        const endpoint = `${Config.url}${Config.apikey}&Type=${this.state.type}&s=${this.state.name}`;
        fetch(endpoint).then(
            (response) => {
                return response.json();
            }
        ).then(responseData => {
            const results = responseData.Search;
            console.log("datos",results);

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
                    <Button
                        icon={<Icon name='description' color='#ffffff' />}
                        backgroundColor='#03A9F4'
                        buttonStyle={{borderRadius: 0, marginLeft: 10, marginRight: 10, marginBottom: 0}}
                        title='Ver Detalles'
                        onPress={this.viewMovie.bind(this,movie)} />
                    </Card>
                movieRows.push(movieRow);

            })
            
            this.setState({movies: movieRows});
        })
        .catch(error => alert("Error: No se han encontrado resultados o se han encontrado demasiados resultados."));
    }
    
    
    render(){

        const { search } = this.state.search;
        return(
            <View>

                <View style={{flexDirection:'row', justifyContent:'flex-end'}}>

                    <SearchBar
                        placeholder="Buscar pelicula..."
                        onChangeText={this.updateSearch}
                        value={search}
                        platform="ios"
                        containerStyle={{width:300, borderRadius:30, backgroundColor: 'white'}}
                        inputStyle={{borderRadius:30}}
                    />

                    {/* <Button
                    title="Buscar"
                    onPress={this.search}
                    /> */}
                    <AwesomeButtonRick type="primary" height={40} width={100} style={{marginTop: 14}} onPress={this.search}>Buscar</AwesomeButtonRick>

                </View>

                <ScrollView >

                    {this.state.movies}
                    
                </ScrollView>


            </View>

        )

    }

}

export default MoviesSearch;
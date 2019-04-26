import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { SearchBar} from 'react-native-elements';
import CardMedia from 'react-native-card-media';
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
        this.props.browser.navigate('MovieDetails', {movie: movie, browser: this.props.browser});
    }


      search(){
        const endpoint = `${Config.url}${Config.apikey}&Type=${this.state.type}&s=${this.state.name.trim()}`;
        fetch(endpoint).then(
            (response) => {
                return response.json();
            }
        ).then(responseData => {
            const results = responseData.Search;
            var movieRows = [];

            results.forEach( (movie)=> {
                file = [movie.Poster];
                title = `${movie.Title} (${movie.Year})`;
                const movieRow =
                <View style={{margin:5, marginBottom: 10}}>
                    <CardMedia
                        files={file}
                        style={{ height: 200}}
                        title={title}
                        showTitle={true}
                        titleStyle={{ fontSize: 20, fontWeight: '400', lineHeight: 32, color: '#fafafa' }}
                        imageCountStyle={{ fontSize: 20, fontWeight: '500', lineHeight: 28, color: '#fafafa' }}
                        titleTouchable={true}
                        imageTouchable={true}
                        onPress={this.viewMovie.bind(this,movie)}
                    />
                </View>
                movieRows.push(movieRow);

            })
            
            this.setState({movies: movieRows});
        })
        .catch(error => alert("Error: No results found or too many."));
    }
    
    
    render(){

        const { search } = this.state.search;
        const placeholder = `Search ${this.state.type}...`;
        return(
            <View >

                <View style={{flexDirection:'row', justifyContent:'flex-end'}}>

                    <SearchBar
                        placeholder={placeholder}
                        onChangeText={this.updateSearch}
                        value={search}
                        platform="ios"
                        containerStyle={{width:300, borderRadius:30, backgroundColor: '#fff'}}
                        inputStyle={{borderRadius:30}}
                    />
                    <AwesomeButtonRick type="primary" height={40} width={100} style={{marginTop: 14, marginRight:5}} onPress={this.search}>Search</AwesomeButtonRick>
                </View>

                <ScrollView style={{marginBottom:20}}>

                    {this.state.movies}
                    
                </ScrollView>
            </View>

        )

    }

}

export default MoviesSearch;
import React, { Component } from 'react';
import { View, ScrollView, Platform } from 'react-native';
import { SearchBar} from 'react-native-elements';
import CardMedia from 'react-native-card-media';
import Config from '../constants/Config';
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";
import Loader from '../components/Loader';

class MoviesSearch extends Component {

    constructor(props){
        super(props);
        this.state = {
          search: "",
          movies: null,
          open: false,
          type: 'movie',
          loading: false,
          movieSelected:{
              imdbID: "",
              Title: ""
          }
        }

         this.search = this.search.bind(this);
    }

      updateSearch = search => {
        this.setState({ search: search });
      };


      viewMovie(movie){
        this.props.browser.navigate('MovieDetails', {movie: movie, browser: this.props.browser});
    }


      search(){
        this.setState({loading:true});
        const endpoint = `${Config.url}${Config.apikey}&Type=${this.state.type}&s=${this.state.search.trim()}`;
        fetch(endpoint).then(
            (response) => {
                return response.json();
            }
        ).then(responseData => {
            const results = responseData.Search;
            var movieRows = [];

            if(results) {
                results.forEach( (movie)=> {
                    file = [movie.Poster];
                    title = `${movie.Title} (${movie.Year})`;
                    const movieRow =
                    <View style={{margin:5, marginBottom: 10}} key={movie.imdbID} >
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
            }

            this.setState({movies: movieRows, loading:false});
        })
        .catch(error => {
            alert("Error: No results found or too many.")
            console.log(error) // DO NOT DELETE CATCH logs
        });
    }
    
    
    render(){

        const placeholder = `Search ${this.state.type}...`;
        return(
            <View >
                <Loader loading={this.state.loading} />
                <View style={{flexDirection:'row', justifyContent:'flex-end', marginBottom:5}}>

                    <SearchBar
                        placeholder={placeholder}
                        onChangeText={this.updateSearch}
                        value={this.state.search}
                        platform={Platform.OS}
                        containerStyle={{width:300, height:45,borderRadius:30, backgroundColor: '#e6e6e6', marginTop:5}}
                        inputStyle={{borderRadius:30}}
                    />
                    <AwesomeButtonRick type="primary" height={45} width={100} style={{marginTop: 5, marginRight:5}} onPress={this.search}>Search</AwesomeButtonRick>
                </View>

                <ScrollView style={{marginBottom:20}}>

                    {this.state.movies}
                    
                </ScrollView>
            </View>

        )

    }

}

export default MoviesSearch;
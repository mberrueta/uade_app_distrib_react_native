import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { SearchBar, Button, Icon, Divider} from 'react-native-elements';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
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
        const endpoint = `${Config.url}${Config.apikey}&Type=${this.state.type}&s=${this.state.name}`;
        fetch(endpoint).then(
            (response) => {
                return response.json();
            }
        ).then(responseData => {
            const results = responseData.Search;
            console.log("data",results);

            var movieRows = [];

            results.forEach( (movie)=> {
                file = [movie.Poster];
                title = `${movie.Title} (${movie.Year})`;
                console.log("title", title);
                const movieRow =
                <View style={{margin:5, marginBottom: 10}}>
                    <CardMedia
                        files={file}
                        style={{ height: 200}}
                        title={title}
                        showTitle={true}
                        titleStyle={{ fontSize: 20, fontWeight: '400', lineHeight: 32, color: '#fafafa' }}
                        //onPress={() => this.onPress()}
                        //imageIconView={movie.Poster}
                        imageCountStyle={{ fontSize: 20, fontWeight: '500', lineHeight: 28, color: '#fafafa' }}
                        titleTouchable={true}
                        imageTouchable={true}
                        onPress={this.viewMovie.bind(this,movie)}
                    />
                </View>

                    // <Card style={{margin:10, backgroundColor:'#9966ff'}} onPress={this.viewMovie.bind(this,movie)}>
                    //     {/* <Card.Content>
                    //         <Title>{movie.Title} ({movie.Year})</Title>
                    //         <Paragraph>Card content</Paragraph>
                    //     </Card.Content> */}
                    //     <Card.Cover style={{width:100, height:400}} source={{ uri: movie.Poster }} />
                    // </Card>;

                    // <Card key={movie.imdbID}
                    //     title={movie.Title}
                    //     image = {{ uri: movie.Poster }}
                    //     imageStyle= {{width:300, height:444, marginLeft:40}}>
                    // <Text >
                    //     {/* <Image
                    //         style = {{width:300, height:444}}
                    //         resizeMode="cover"
                    //         source={{ uri: movie.Poster }}
                    //     /> */}

                    // </Text>
                    // <Button
                    //     icon={<Icon name='description' color='#ffffff' />}
                    //     backgroundColor='#03A9F4'
                    //     buttonStyle={{borderRadius: 0, marginLeft: 10, marginRight: 10, marginBottom: 0}}
                    //     title='Ver Detalles'
                    //     onPress={this.viewMovie.bind(this,movie)} />
                    // </Card>
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

                    {/* <Button
                    title="Buscar"
                    onPress={this.search}
                    /> */}
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
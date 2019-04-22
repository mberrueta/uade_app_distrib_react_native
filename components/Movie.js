import React, { Component } from 'react';
import { Text, View, StyleSheet, Image} from 'react-native';

// TODO: use global config
const url = 'http://www.omdbapi.com/?&apikey=';
const apikey = 'd0b64143';


class Movie extends Component {

    constructor(props){
        super(props);
        this.state = {
            // imdbID: props.imdbID || 'tt3165576'
            imdbID: props.imdbID || 'tt3165576',
            movie: {
                'Actors': 'Matt Patrick, Bob Why, Stephan Todd',
                'Awards': 'N/A',
                'BoxOffice': 'N/A',
                'Country': 'USA',
                'Director': 'Bob Why',
                'DVD': 'N/A',
                'Genre': 'Animation, Short, Action',
                'imdbID': 'tt3165576',
                'imdbRating': 'N/A',
                'imdbVotes': 'N/A',
                'Language': 'English',
                'Metascore': 'N/A',
                'Plot': 'Halo Advengers is the story of Halo before 4 in a series of video short films. The flood has returned.... well found. And now its up to a select few to take care of the job of policing up ...',
                'Poster': 'N/A',
                'Production': 'N/A',
                'Rated': 'N/A',
                'Released': '21 Aug 2013',
                'Response': 'True',
                'Runtime': 'N/A',
                'Title': 'Halo Advengers',
                'Type': 'movie',
                'Website': 'N/A',
                'Writer': 'Bob Why',
                'Year': '2013',
              }
        }

        // const endpoint = `${url}${apikey}&i=${this.state.imdbID}`;

        // fetch(endpoint).then(
        //     (response) => {
        //         return response.json();
        //     }
        // ).then(responseData => {
        //     this.setState({movie: responseData})
        //     console.log(responseData);
        // });
    }

    render(){
        let image_uri = this.state.movie.Poster != 'N/A' ? {uri: this.state.movie.Poster} : require('.././assets/images/no_image.jpg');

        console.log(image_uri);
        return(
            <View>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                    {'\n'}{'\n'}
                        {this.state.movie.Title} ({this.state.movie.Year}) {'\n'}{'\n'}
                    </Text>
                </View>
                <View style={styles.subTitleView}>
                    <Text style={styles.subTitleText}>
                        {this.state.movie.Genre} | {this.state.movie.Language} | {this.state.movie.Released} ({this.state.movie.Country})
                    </Text>
                </View>


                <View style={styles.imgView}>
                    <Image source={image_uri} style={styles.image}></Image>
                </View>



                <Text>
                    {this.state.movie.Plot}{'\n'}{'\n'}

                    Director: {this.state.movie.Director} {'\n'}
                    Actors: {this.state.movie.Actors}

                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    baseText: {
      fontFamily: 'Cochin',
    },
    titleView: {
        height: 80,
        backgroundColor: 'grey',
        paddingStart: 5,
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white'
    },
    subTitleView: {
        height: 30,
        backgroundColor: 'grey',
        paddingStart: 10,
        paddingBottom: 5,
    },
    subTitleText: {
        fontSize: 12,
        color: 'white'
    },
    imgView: {
        height: 250,
        padding: 10,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgage: {
        height: 200
    }
  });

  export default Movie;
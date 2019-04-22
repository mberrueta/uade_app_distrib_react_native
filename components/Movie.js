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
       
        }

        const endpoint = `${url}${apikey}&i=${this.state.imdbID}`;

        fetch(endpoint).then(
            (response) => {
                return response.json();
            }
        ).then(responseData => {
            this.setState({movie: responseData})
            console.log(responseData);
        });
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
import React, { Component } from 'react';
import { Text, View, StyleSheet, Header, ScrollView} from 'react-native';
import { Card, ListItem, Input, Button } from 'react-native-elements';
import {Textarea} from 'native-base';

// TODO: use global config
const url = 'http://www.omdbapi.com/?&apikey=';
const apikey = 'd0b64143';


const list = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman'
    }
  ]


class Movie extends Component {

    constructor(props){
        super(props);
        this.state = {
            // imdbID: props.imdbID || 'tt3165576'
            imdbID: props.id,
            movie: {}

        }

        const endpoint = `${url}${apikey}&i=${this.state.imdbID}`;
        console.log("endpoint:", endpoint);
        fetch(endpoint).then(
            (response) => {
                return response.json();
            }
        ).then(responseData => {
            this.setState({movie: responseData})
            console.log("Data:",responseData);
        });
    }

    render(){
        //let image_uri = this.state.movie.Poster != 'N/A' ? {uri: this.state.movie.Poster} : require('.././assets/images/no_image.jpg');
        let image_uri = this.state.movie.Poster;
        //console.log(image_uri);
        return(
            <ScrollView>
                { <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                    {'\n'}{'\n'}
                        {this.state.movie.Title} ({this.state.movie.Year}) {'\n'}{'\n'}
                    </Text>
                </View> }
                {/* <Header
                    centerComponent={{ text: {this.state.movie.Title}, style: { color: '#fff' } }}
                /> */}
                <View style={styles.subTitleView}>
                    <Text style={styles.subTitleText}>
                        {this.state.movie.Genre} | {this.state.movie.Language} | {this.state.movie.Released} ({this.state.movie.Country})
                    </Text>
                </View>


                <Card 
                    key={this.state.movie.imdbID}
                    image = {{ uri: image_uri }}
                    imageStyle= {{width:300, height:444, marginLeft:40}}>

                    <Text>
                        {this.state.movie.Plot}{'\n'}{'\n'}

                        Director: {this.state.movie.Director} {'\n'}
                        Actors: {this.state.movie.Actors}

                    </Text>
                </Card>


                

                <Card 
                    title="Comentarios:">

                    <View>
                        {
                            list.map((l, i) => (
                            <ListItem
                                key={i}
                                leftAvatar={{ source: { uri: l.avatar_url } }}
                                title={l.name}
                                subtitle={l.subtitle}
                            />
                            ))
                        }
                    </View>

                    <View>
                        {/* <Input
                            placeholder='Agregar comentario...'
                        /> */}
                        <Textarea rowSpan={5} bordered placeholder="Agregar Comentario..." />
                        <Button
                            backgroundColor='#03A9F4'
                            buttonStyle={{borderRadius: 0, marginLeft: 10, marginRight: 10, marginBottom: 0}}
                            title='Agregar'/>
                    </View>

                </Card>
                

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    baseText: {
      fontFamily: 'Cochin',
    },
    titleView: {
        height: 80,
        backgroundColor: 'blue',
        paddingStart: 5,
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white'
    },
    subTitleView: {
        height: 30,
        backgroundColor: 'blue',
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
        width:200,
        height: 200
    }
  });

  export default Movie;
import React, { Component } from 'react';
import { Text, View, StyleSheet, Header, ScrollView, KeyboardAvoidingView, Alert, Picker, AsyncStorage} from 'react-native';
import { Card, ListItem, Button, Rating } from 'react-native-elements';
import {Textarea} from 'native-base';
import Comment from '../components/Comment';


// TODO: use global config
const url = 'http://www.omdbapi.com/?&apikey=';
const apikey = '5ad6e7ca';

const list = [
    {
      name: 'Joni Tekel',
      subtitle: 'Esta pelicula es una reverenda mierda. No la miren'
    },
    {
      name: 'Chris Jackson',
      subtitle: 'Vice Chairman'
    }
  ]


class Movie extends Component {

    constructor(props){
        super(props);
        this.state = {
            // imdbID: props.imdbID || 'tt3165576'
            movie: props.navigation.getParam('movie'),
            comments: null,
            commentText: "",
            commentToSave:"",
            navegador: props.navigation.getParam('navegador'),
            alertMsg:"",
            puntuacion: 5,
            userToken: ""

        }
        const endpoint = `${url}${apikey}&Type=movie&i=${this.state.movie.imdbID}`;
        fetch(endpoint).then(
            (response) => {
                return response.json();
            }
        ).then(responseData => {
            this.setState({movie: responseData})
        });


        
        this.saveComment = this.saveComment.bind(this);
        this.updateCommentText = this.updateCommentText.bind(this);


    }


    componentDidMount(){

        const endpoint_back_movies = `https://uade-app-distrib-node-back.herokuapp.com/movie-comments/${this.state.movie.imdbID}`;
        fetch(endpoint_back_movies,
            {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${this.state.userToken}`
                }
            }
        ).then(
            (response) => {
                return response.json();
            }
        ).then(responseDataBack => {
            const results = responseDataBack.comments;
            var movieComments = [];

            results.forEach( (movie) => {
                const movieComment =
                <Comment movie={movie}/>
                    
                movieComments.push(movieComment);

                

            })


            this.setState({comments: movieComments,commentText:""});
            this.getData();
        });
    }
      
    
      getData = async () => {
    
          const value = await AsyncStorage.getItem('@user');
          if(value !== null) {      
            this.setState({userToken: value})
          }
      }

    updateCommentText = commentText => {
        //alert(search);
        this.setState({ commentToSave: commentText });
        //alert(this.state.name);
    };

    updateRanking = ranking => {
        //alert(search);
        this.setState({ ranking: ranking });
        //alert(this.state.name);
    };

    saveComment(){
        //alert(this.state.commentToSave);

        let data = {
            imdb_id: this.state.movie.imdbID,
            imdb_title: this.state.movie.Title,
            comment: this.state.commentToSave,
            stars: this.state.ranking
        }

        const endpoint_back_movies_post = "https://uade-app-distrib-node-back.herokuapp.com/movie-comments/";
        fetch(endpoint_back_movies_post,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${this.state.userToken}`
                }
            }
        ).then(
            (response) => {
                return response.json();
            }
        ).then(responseDataBack => {
            const alertMsg = Alert.alert(
                'Thanks!',
                'Your comment has been saved succefuly.',
                [
                  {text: 'OK', onPress: () => this.componentDidMount()},
                ],
                {cancel: true},
              );
            //alert('El comentario se ha dado de alta correctamente.');
            this.setState({
                alertMsg: alertMsg,
                commentText: ""
            });
            
        });

    }

    render(){
        //let image_uri = this.state.movie.Poster != 'N/A' ? {uri: this.state.movie.Poster} : require('.././assets/images/no_image.jpg');
        let image_uri = this.state.movie.Poster;
        let rating = this.state.movie.imdbRating / 2;
        const { commentText } = this.state.commentText;
        return(
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled key={this.state.uniqueValue}>
            <ScrollView>
                { <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                    {'\n'}{'\n'}
                        {this.state.movie.Title} ({this.state.movie.Year})  
                         {'\n'}{'\n'}
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
                        Actors: {this.state.movie.Actors} {'\n'} {'\n'}
                    </Text>
                    
                    <Rating showRating fractions="{1}" startingValue={rating} readonly/>

                </Card>

                <Card 
                    title="Comments:">

                    <View>
                        {this.state.comments}
                    </View>

                    <View>
                        <Textarea rowSpan={5} bordered 
                            placeholder="Add Comments..." 
                            onChangeText={this.updateCommentText}
                            value={commentText}
                            style={{marginBottom:10}}    
                        />
                        <View style={{width:300}}>
                            <Text>
                                Ranking:
                            </Text>
                            <Picker
                                selectedValue={this.state.ranking}
                                style={{height: 50, width: 100}}
                                onValueChange={this.updateRanking}>
                                <Picker.Item label="5" value="5" />
                                <Picker.Item label="4" value="4" />
                                <Picker.Item label="3" value="3" />
                                <Picker.Item label="2" value="2" />
                                <Picker.Item label="1" value="1" />
                            </Picker>
                        </View>
                        <Button
                            backgroundColor='#03A9F4'
                            buttonStyle={{borderRadius: 0, marginLeft: 10, marginRight: 10, marginBottom: 0}}
                            onPress={this.saveComment}
                            title='Add'/>
                            
                    </View>

                    <Text>
                        {this.state.alertMsg}
                    </Text>
                </Card>
                

            </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
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